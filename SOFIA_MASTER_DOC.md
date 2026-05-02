# S.O.F.I.A. — Master Document
**Strategic Decision Game — Jeu de Décision Stratégique**
**Version:** 4.0 | **Auteur:** Vladimir Casapciuc (Владимир Касапчук)
**Licence:** MIT Open Source | **Contact:** v2land@gmail.com | @Vlad8Mir

---

## 1. VISION & CONCEPT

### Qu'est-ce que S.O.F.I.A. ?
Un système universel d'entraînement à la prise de décision, basé sur la Game Theory et la psychologie comportementale. Applicable à tous les âges, toutes les cultures, tous les contextes professionnels.

### Le Framework S.O.F.I.A.
| Lettre | Concept | Question clé |
|--------|---------|-------------|
| S | Situation | Qu'est-ce qui se passe réellement ? |
| O | Options | Quels choix sont possibles ? |
| F | Forecast | Qu'est-ce qui va probablement arriver ? |
| I | Incentives | Pourquoi les autres agissent ainsi ? |
| A | Action | Quelle est la meilleure décision ? |

### Principe de Game Theory intégré
Chaque scénario modélise un jeu séquentiel à information imparfaite. Le joueur apprend à :
- Lire l'état du jeu (S)
- Simuler les stratégies adverses (O+F)
- Comprendre les structures d'incitation (I)
- Choisir la stratégie dominante ou robuste (A)

### Tagline
> "Tu ne contrôles pas les autres — mais tu contrôles les conditions que tu crées."

---

## 2. ÉTAT ACTUEL (v4.0)

### Ce qui existe
- ✅ Jeu HTML standalone complet (~105KB)
- ✅ 8 domaines : Sécurité, Cybersécurité, Politique, Relations, Finance, Leadership, Santé, Parentalité
- ✅ 8 scénarios complets avec 5 étapes S.O.F.I.A. chacun
- ✅ 5 langues : FR, EN, RO, RU, IT
- ✅ Système de badges (5), streak, défi du jour
- ✅ Page Contact avec zone sponsor
- ✅ Monétisation : Ko-fi, PayPal, zone sponsor, partage viral @Vlad8Mir
- ✅ Design terminal/hacker (noir + vert)
- ✅ Fonts Google : Share Tech Mono + Orbitron

### Limitations actuelles
- ❌ Scénarios hardcodés dans le HTML
- ❌ Pas de backend
- ❌ Pas de base de données
- ❌ Pas d'auth utilisateurs
- ❌ Stats stockées en localStorage uniquement
- ❌ Pas de génération IA dynamique
- ❌ Pas de mode multi-tenant (coaching, RH, éducation)

---

## 3. ROADMAP

### Phase 1 — Foundation (Prochain sprint)
**Objectif :** Même jeu, vraie architecture
- [ ] Repo GitHub public (sofia-game)
- [ ] Structure projet frontend/backend/db
- [ ] Supabase configuré (tables: scenarios, users, scores, sessions)
- [ ] API FastAPI ou Node.js basique
- [ ] Scénarios existants migrés en base de données
- [ ] Frontend React/Next.js connecté à l'API
- [ ] Déploiement : Vercel (frontend) + Railway/Render (backend)

### Phase 2 — IA Dynamique
**Objectif :** Scénarios illimités générés par Claude API
- [ ] Endpoint `/generate-scenario` avec prompt S.O.F.I.A.
- [ ] Génération dans les 5 langues simultanément
- [ ] Interface admin pour valider/publier les scénarios
- [ ] Système de rating qualité des scénarios
- [ ] Cache intelligent (ne pas régénérer ce qui existe)

### Phase 3 — Multi-tenant & Coaching
**Objectif :** Produit B2B utilisable
- [ ] Auth utilisateurs (Supabase Auth)
- [ ] Espaces coach/organisation
- [ ] Dashboard analytics (progression, scores, temps)
- [ ] Rapports PDF exportables
- [ ] Scénarios personnalisés par organisation
- [ ] Mode évaluation (SJT - Situational Judgment Test)

### Phase 4 — Monétisation & Scale
**Objectif :** Revenus récurrents
- [ ] Plans freemium / pro / enterprise
- [ ] Intégration Stripe
- [ ] Certificats S.O.F.I.A. vérifiables
- [ ] API publique pour intégrations LMS
- [ ] Module SCORM pour e-learning
- [ ] Marketplace de scénarios communautaires

---

## 4. CAS D'USAGE & MARCHÉS

### B2C (grand public)
- Joueurs individuels (mobile/web)
- Parents avec enfants (mode famille)
- Étudiants (développement personnel)

### B2B Coaching
- Coachs life/business avec leurs clients
- Scénarios personnalisés par problématique
- Suivi de progression longitudinal
- Tarif suggéré : 20-50$/mois/coach

### B2B RH & Recrutement
- Tests de jugement situationnel (SJT)
- Évaluation de candidats
- Onboarding et formation
- Marché : 15-50$/candidat (Criteria Corp, Revelian)

### B2B Éducation
- Modules intégrables en cours
- Philosophie, psychologie, économie comportementale
- Déploiement classe entière
- Tarif : licence institutionnelle annuelle

### B2B Santé & Bien-être
- Thérapeutes et psychologues
- Développement des compétences décisionnelles
- Intégration en thérapie cognitivo-comportementale

---

## 5. MODÈLE DE REVENUS PROJETÉ

| Source | Modèle | Prix estimé |
|--------|--------|-------------|
| Zone sponsor | Mensuel | 50-200$/mois |
| Ko-fi / PayPal | Don libre | Variable |
| Plan Pro individuel | Mensuel | 9$/mois |
| Plan Coach | Mensuel | 29$/mois |
| Plan Organisation | Annuel | 500-2000$/an |
| Évaluation RH | Par candidat | 15-25$/candidat |
| API publique | Usage | 0.01$/appel |

---

## 6. DÉCISIONS CLÉS PRISES

| Date | Décision | Raison |
|------|----------|--------|
| 2024 | Design terminal noir/vert | Identité forte, mémorable |
| 2024 | 5 langues dès le départ | Marché international (RO, RU) |
| 2024 | MIT Licence | Open source = confiance + distribution |
| 2024 | Framework S.O.F.I.A. | Différenciation vs quiz ordinaires |
| 2024 | Game Theory intégré | Rigueur intellectuelle + crédibilité B2B |

---

## 7. CONTACTS & LIENS

| Canal | Lien |
|-------|------|
| Email | v2land@gmail.com |
| X/Twitter | @Vlad8Mir — https://x.com/Vlad8Mir |
| Facebook | https://www.facebook.com/v2land/ |
| Ko-fi | https://ko-fi.com/v2land |
| PayPal | https://paypal.me/VladimirCasapciuc |
| GitHub (à créer) | https://github.com/vcasapciuc/sofia-game |

