# S.O.F.I.A. — Tech Stack & Architecture

---

## STACK CHOISI

### Frontend
| Tech | Version | Raison |
|------|---------|--------|
| Next.js | 14+ | SSR + routing + déploiement Vercel trivial |
| TypeScript | 5+ | Typage fort = moins de bugs |
| Tailwind CSS | 3+ | Style rapide + cohérence design |
| Zustand | 4+ | State management léger (pas Redux) |
| Google Fonts | — | Share Tech Mono + Orbitron (déjà validés) |

### Backend
| Tech | Version | Raison |
|------|---------|--------|
| FastAPI | 0.100+ | Python, rapide, auto-docs Swagger |
| Python | 3.11+ | Ecosystème IA (Anthropic SDK natif) |
| Pydantic | 2+ | Validation des données |
| anthropic SDK | latest | Génération de scénarios |

### Base de données
| Tech | Raison |
|------|--------|
| Supabase | PostgreSQL managé, auth inclus, dashboard, gratuit tier généreux |
| Supabase Auth | JWT auth, OAuth Google/GitHub inclus |
| Supabase Storage | Pour futurs assets (images scénarios, logos sponsors) |

### Hébergement (gratuit)
| Service | Usage | Limite gratuite |
|---------|-------|----------------|
| Vercel | Frontend Next.js | 100GB bandwidth/mois |
| Railway | Backend FastAPI | 500h compute/mois |
| Supabase | Base de données | 500MB, 50k rows |
| GitHub | Code source | Illimité public |

### CI/CD
- GitHub Actions : tests automatiques sur PR
- Vercel : déploiement automatique sur push main
- Railway : déploiement automatique sur push main

---

## STRUCTURE DU PROJET

```
sofia-game/
├── frontend/                    # Next.js app
│   ├── app/
│   │   ├── page.tsx            # Home / Game
│   │   ├── stats/page.tsx      # Statistics
│   │   ├── contact/page.tsx    # Contact & Sponsor
│   │   ├── admin/page.tsx      # Admin (scénarios)
│   │   └── layout.tsx
│   ├── components/
│   │   ├── game/
│   │   │   ├── ScenarioCard.tsx
│   │   │   ├── StepQuestion.tsx
│   │   │   ├── ResultScreen.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── ui/
│   │   │   ├── TerminalButton.tsx
│   │   │   ├── BadgeDisplay.tsx
│   │   │   └── DomainSelector.tsx
│   │   └── layout/
│   │       ├── NavTabs.tsx
│   │       └── LangBar.tsx
│   ├── lib/
│   │   ├── api.ts              # API calls
│   │   ├── store.ts            # Zustand state
│   │   └── i18n.ts             # Traductions
│   └── public/
│
├── backend/                     # FastAPI app
│   ├── main.py                 # Entry point
│   ├── routers/
│   │   ├── scenarios.py        # CRUD scénarios
│   │   ├── generate.py         # IA génération
│   │   ├── scores.py           # Scores & stats
│   │   └── users.py            # Auth & profils
│   ├── models/
│   │   ├── scenario.py         # Pydantic models
│   │   ├── score.py
│   │   └── user.py
│   ├── services/
│   │   ├── claude_service.py   # Anthropic API
│   │   └── supabase_service.py # DB operations
│   └── prompts/
│       └── sofia_prompt.py     # Prompts IA
│
├── database/                    # Supabase
│   ├── migrations/
│   │   └── 001_initial.sql     # Schema initial
│   └── seed/
│       └── scenarios.json      # 8 scénarios existants
│
└── docs/
    ├── SOFIA_MASTER_DOC.md
    ├── SOFIA_TECH_STACK.md
    ├── SOFIA_SCENARIOS_SCHEMA.json
    └── SOFIA_PROMPTS.md
```

---

## SCHEMA BASE DE DONNÉES (Supabase/PostgreSQL)

```sql
-- Langues supportées
CREATE TYPE language AS ENUM ('fr', 'en', 'ro', 'ru', 'it');

-- Domaines de jeu
CREATE TYPE domain_type AS ENUM (
  'security', 'cybersecurity', 'politics', 'relationships',
  'finance', 'leadership', 'health', 'parenting',
  'custom' -- pour domaines B2B personnalisés
);

-- Scénarios
CREATE TABLE scenarios (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain      domain_type NOT NULL,
  difficulty  INT CHECK (difficulty BETWEEN 1 AND 5) DEFAULT 3,
  is_premium  BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  org_id      UUID REFERENCES organizations(id), -- NULL = public
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Contenu traduit des scénarios
CREATE TABLE scenario_translations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  lang        language NOT NULL,
  domain_label TEXT NOT NULL,          -- "SÉCURITÉ"
  text        TEXT NOT NULL,           -- Le texte du scénario
  insight     TEXT NOT NULL,           -- La leçon finale
  UNIQUE(scenario_id, lang)
);

-- Étapes S.O.F.I.A. (toujours 5 : S,O,F,I,A)
CREATE TABLE steps (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  step_key    CHAR(1) CHECK (step_key IN ('S','O','F','I','A')),
  correct_index INT CHECK (correct_index BETWEEN 0 AND 2),
  UNIQUE(scenario_id, step_key)
);

-- Contenu traduit des étapes
CREATE TABLE step_translations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_id     UUID REFERENCES steps(id) ON DELETE CASCADE,
  lang        language NOT NULL,
  question    TEXT NOT NULL,
  options     TEXT[] NOT NULL,         -- Array de 3 options
  analyses    TEXT[] NOT NULL,         -- Array de 3 analyses
  UNIQUE(step_id, lang)
);

-- Utilisateurs (géré par Supabase Auth + extended)
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  lang        language DEFAULT 'fr',
  org_id      UUID REFERENCES organizations(id),
  role        TEXT DEFAULT 'player',   -- player, coach, admin
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Organisations (coaching, RH, éducation)
CREATE TABLE organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  plan        TEXT DEFAULT 'free',     -- free, pro, enterprise
  owner_id    UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Sessions de jeu
CREATE TABLE game_sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id),
  scenario_id UUID REFERENCES scenarios(id),
  score       INT CHECK (score BETWEEN 0 AND 100),
  answers     JSONB,                   -- {S:1, O:2, F:1, I:1, A:2}
  lang        language NOT NULL,
  is_challenge BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Badges utilisateurs
CREATE TABLE user_badges (
  user_id     UUID REFERENCES profiles(id),
  badge_id    TEXT NOT NULL,
  earned_at   TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, badge_id)
);
```

---

## VARIABLES D'ENVIRONNEMENT

```env
# Backend (.env)
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJ...
ENVIRONMENT=development

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## CONVENTIONS DE CODE

- **Commits** : `feat:`, `fix:`, `docs:`, `refactor:`
- **Branches** : `main` (prod), `dev` (staging), `feature/xxx`
- **API** : REST avec préfixe `/api/v1/`
- **Nommage** : camelCase JS/TS, snake_case Python
- **Langues** : toujours passer `lang` en query param ou header

