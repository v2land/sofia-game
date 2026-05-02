import { useState } from "react";

const COLORS = {
  bg: "#050f09", bg2: "#091a0f", bg3: "#0d2414",
  g: "#00ff88", g2: "#00cc66", g3: "#003d1f",
  txt: "#c8ffd8", txt2: "#6bcc99", txt3: "#2d6644",
  border: "#1a3d25", border2: "#2a6644",
  gold: "#ffd700", blue: "#00aaff", purple: "#aa44ff",
  orange: "#ff8844", red: "#ff4455"
};

const mono = "'Share Tech Mono', 'Courier New', monospace";
const head = "'Orbitron', monospace";

const layers = [
  {
    id: "users",
    label: "UTILISATEURS",
    color: COLORS.txt2,
    borderColor: COLORS.border2,
    nodes: [
      { id: "player", icon: "🎮", label: "JOUEUR", sub: "Web / Mobile" },
      { id: "coach", icon: "🧠", label: "COACH", sub: "Dashboard" },
      { id: "hr", icon: "🏢", label: "RH / ÉCOLE", sub: "Multi-tenant" },
    ]
  },
  {
    id: "frontend",
    label: "FRONTEND — Next.js + TypeScript",
    color: COLORS.blue,
    borderColor: COLORS.blue,
    nodes: [
      { id: "game_ui", icon: "⬡", label: "GAME UI", sub: "Vercel (gratuit)" },
      { id: "admin_ui", icon: "⚙️", label: "ADMIN UI", sub: "Gestion scénarios" },
      { id: "dashboard", icon: "📊", label: "DASHBOARD", sub: "Analytics coaching" },
    ]
  },
  {
    id: "api",
    label: "BACKEND API — FastAPI + Python",
    color: COLORS.g,
    borderColor: COLORS.g,
    nodes: [
      { id: "scenarios_api", icon: "📋", label: "/scenarios", sub: "CRUD scénarios" },
      { id: "generate_api", icon: "✨", label: "/generate", sub: "IA dynamique" },
      { id: "scores_api", icon: "🏆", label: "/scores", sub: "Stats & badges" },
      { id: "users_api", icon: "👤", label: "/users", sub: "Auth & profils" },
    ]
  },
  {
    id: "services",
    label: "SERVICES EXTERNES",
    color: COLORS.purple,
    borderColor: COLORS.purple,
    nodes: [
      { id: "claude_api", icon: "🤖", label: "CLAUDE API", sub: "Génération scénarios", highlight: true },
      { id: "supabase", icon: "🗄️", label: "SUPABASE", sub: "PostgreSQL + Auth" },
      { id: "vercel", icon: "▲", label: "VERCEL", sub: "Frontend hosting" },
      { id: "railway", icon: "🚂", label: "RAILWAY", sub: "Backend hosting" },
    ]
  },
];

const phases = [
  {
    num: 1, label: "FOUNDATION", color: COLORS.g2,
    items: ["Repo GitHub public", "Supabase configuré", "API FastAPI basique", "8 scénarios migrés en DB", "Frontend Next.js connecté", "Déploiement Vercel + Railway"],
    duration: "~2-3 sessions Claude"
  },
  {
    num: 2, label: "IA DYNAMIQUE", color: COLORS.blue,
    items: ["Endpoint /generate avec Claude API", "Prompt S.O.F.I.A. validé", "Interface admin scénarios", "5 langues auto-générées", "Cache intelligent"],
    duration: "~2-3 sessions Claude"
  },
  {
    num: 3, label: "MULTI-TENANT", color: COLORS.purple,
    items: ["Auth utilisateurs (Supabase Auth)", "Espaces coach / organisation", "Dashboard analytics", "Rapports PDF", "Scénarios personnalisés B2B"],
    duration: "~4-5 sessions Claude"
  },
  {
    num: 4, label: "MONÉTISATION", color: COLORS.gold,
    items: ["Plans freemium / pro / enterprise", "Stripe intégré", "Certificats S.O.F.I.A.", "API publique LMS/SCORM", "Marketplace scénarios"],
    duration: "~3-4 sessions Claude"
  },
];

const useCases = [
  { icon: "🎮", label: "Grand public", desc: "Jeu web/mobile gratuit, donations, sponsors", revenue: "Ko-fi · PayPal · Ads" },
  { icon: "🧠", label: "Coaching", desc: "Espace coach avec clients, suivi progression", revenue: "29$/mois/coach" },
  { icon: "🏢", label: "RH / Recrutement", desc: "SJT — test de jugement situationnel", revenue: "15-25$/candidat" },
  { icon: "🎓", label: "Éducation", desc: "Module classe, suivi élèves", revenue: "Licence annuelle" },
  { icon: "💊", label: "Santé / Thérapie", desc: "Compétences décisionnelles cliniques", revenue: "Par praticien" },
];

export default function SofiaArchitecture() {
  const [activePhase, setActivePhase] = useState(1);
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeUseCase, setActiveUseCase] = useState(null);
  const [tab, setTab] = useState("arch");

  const s = (obj) => Object.entries(obj).map(([k,v]) => `${k.replace(/([A-Z])/g,'-$1').toLowerCase()}:${v}`).join(';');

  return (
    <div style={{background: COLORS.bg, color: COLORS.txt, fontFamily: mono, minHeight: "100vh", padding: "1.5rem 1rem"}}>

      {/* Header */}
      <div style={{textAlign:"center", marginBottom:"1.5rem"}}>
        <div style={{fontFamily: head, fontSize:"clamp(18px,5vw,28px)", fontWeight:900, color: COLORS.g, letterSpacing:"6px", textShadow:`0 0 20px ${COLORS.g}55`}}>
          S.O.F.I.A.
        </div>
        <div style={{fontSize:"10px", color: COLORS.txt3, letterSpacing:"3px", marginTop:"4px"}}>
          ARCHITECTURE PROFESSIONNELLE & SCALABLE — v4→∞
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{display:"flex", borderBottom:`1px solid ${COLORS.border}`, marginBottom:"1.5rem"}}>
        {[["arch","⬡ ARCHITECTURE"],["phases","◈ ROADMAP"],["usecases","✦ CAS D'USAGE"],["costs","$ COÛTS"]].map(([id,label]) => (
          <button key={id} onClick={()=>setTab(id)} style={{
            flex:1, padding:".5rem .25rem", fontFamily:mono, fontSize:"10px", letterSpacing:"1px",
            border:"none", borderBottom:`2px solid ${tab===id?COLORS.g:'transparent'}`,
            background:"transparent", color: tab===id?COLORS.g:COLORS.txt3, cursor:"pointer", transition:"all .15s"
          }}>{label}</button>
        ))}
      </div>

      {/* ARCHITECTURE TAB */}
      {tab === "arch" && (
        <div>
          <div style={{fontSize:"10px", color: COLORS.txt3, letterSpacing:"3px", marginBottom:"1rem"}}>
            // FLUX PRINCIPAL — cliquez sur une couche pour les détails
          </div>

          {layers.map((layer, li) => (
            <div key={layer.id} style={{marginBottom:"8px"}}>
              {/* Arrow between layers */}
              {li > 0 && (
                <div style={{textAlign:"center", color: COLORS.txt3, fontSize:"12px", margin:"4px 0", letterSpacing:"2px"}}>
                  ↕ API CALLS
                </div>
              )}
              {/* Layer */}
              <div
                onClick={()=>setActiveLayer(activeLayer===layer.id?null:layer.id)}
                style={{
                  border:`1px solid ${activeLayer===layer.id?layer.borderColor:COLORS.border}`,
                  borderRadius:"3px", padding:".75rem", cursor:"pointer",
                  background: activeLayer===layer.id?`${layer.color}11`:COLORS.bg2,
                  transition:"all .2s"
                }}
              >
                <div style={{fontSize:"10px", color: layer.color, letterSpacing:"2px", marginBottom:".6rem", fontWeight:700}}>
                  // {layer.label}
                </div>
                <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
                  {layer.nodes.map(node => (
                    <div key={node.id} style={{
                      flex:"1", minWidth:"120px", padding:".55rem .75rem",
                      border:`1px solid ${activeLayer===layer.id?layer.borderColor:COLORS.border}`,
                      borderRadius:"2px", background: node.highlight?`${COLORS.g}15`:COLORS.bg,
                      borderColor: node.highlight?COLORS.g:undefined
                    }}>
                      <div style={{fontSize:"16px", marginBottom:"2px"}}>{node.icon}</div>
                      <div style={{fontSize:"11px", color: node.highlight?COLORS.g:COLORS.txt, fontWeight:700, letterSpacing:"1px"}}>{node.label}</div>
                      <div style={{fontSize:"10px", color: COLORS.txt3, marginTop:"2px"}}>{node.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Key insight */}
          <div style={{marginTop:"1.25rem", borderLeft:`2px solid ${COLORS.g3}`, padding:".75rem 1rem", background:COLORS.bg2, borderRadius:"0 3px 3px 0"}}>
            <div style={{fontSize:"10px", color: COLORS.gold, letterSpacing:"3px", marginBottom:".4rem"}}>// PRINCIPE CLÉ</div>
            <div style={{fontSize:"12px", color: COLORS.txt2, lineHeight:"1.7"}}>
              Les <span style={{color:COLORS.g}}>scénarios existants</span> sont servis depuis Supabase (coût = 0).<br/>
              Claude API n'est appelé que pour <span style={{color:COLORS.g}}>générer de nouveaux contenus</span>.<br/>
              Le frontend <span style={{color:COLORS.blue}}>Vercel</span> + backend <span style={{color:COLORS.orange}}>Railway</span> = <span style={{color:COLORS.g}}>hébergement 100% gratuit</span> au démarrage.
            </div>
          </div>

          {/* Stack résumé */}
          <div style={{marginTop:"1rem", display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"6px"}}>
            {[
              {label:"FRONTEND", tech:"Next.js + TypeScript", host:"Vercel (gratuit)", color:COLORS.blue},
              {label:"BACKEND", tech:"FastAPI + Python", host:"Railway (gratuit)", color:COLORS.g},
              {label:"DATABASE", tech:"Supabase PostgreSQL", host:"Auth inclus (gratuit)", color:COLORS.purple},
              {label:"IA", tech:"Claude Sonnet API", host:"~$0.015/scénario généré", color:COLORS.gold},
            ].map(item => (
              <div key={item.label} style={{padding:".6rem .75rem", border:`1px solid ${COLORS.border}`, borderRadius:"2px", background:COLORS.bg2}}>
                <div style={{fontSize:"9px", color:item.color, letterSpacing:"2px"}}>{item.label}</div>
                <div style={{fontSize:"11px", color:COLORS.txt, marginTop:"3px", fontWeight:700}}>{item.tech}</div>
                <div style={{fontSize:"10px", color:COLORS.txt3, marginTop:"2px"}}>{item.host}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ROADMAP TAB */}
      {tab === "phases" && (
        <div>
          <div style={{fontSize:"10px", color: COLORS.txt3, letterSpacing:"3px", marginBottom:"1rem"}}>
            // ROADMAP — 4 PHASES — cliquez pour voir le détail
          </div>

          {/* Phase selector */}
          <div style={{display:"flex", gap:"6px", marginBottom:"1rem"}}>
            {phases.map(p => (
              <button key={p.num} onClick={()=>setActivePhase(p.num)} style={{
                flex:1, padding:".5rem .25rem", fontFamily:mono, fontSize:"10px",
                border:`1px solid ${activePhase===p.num?p.color:COLORS.border}`,
                background: activePhase===p.num?`${p.color}22`:COLORS.bg2,
                color: activePhase===p.num?p.color:COLORS.txt3, cursor:"pointer",
                borderRadius:"2px", letterSpacing:"1px", transition:"all .2s"
              }}>
                <div style={{fontSize:"14px", fontFamily:head, fontWeight:700}}>{p.num}</div>
                <div style={{fontSize:"9px", marginTop:"2px"}}>{p.label}</div>
              </button>
            ))}
          </div>

          {/* Active phase detail */}
          {phases.filter(p=>p.num===activePhase).map(p => (
            <div key={p.num} style={{border:`1px solid ${p.color}`, borderRadius:"3px", padding:"1rem", background:`${p.color}08`}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:".75rem"}}>
                <div style={{fontFamily:head, fontSize:"14px", color:p.color, letterSpacing:"2px"}}>
                  PHASE {p.num} — {p.label}
                </div>
                <div style={{fontSize:"10px", color:COLORS.txt3, letterSpacing:"1px"}}>{p.duration}</div>
              </div>
              {p.items.map((item, i) => (
                <div key={i} style={{display:"flex", alignItems:"center", gap:"8px", padding:".35rem 0", borderBottom:`1px solid ${COLORS.border}`}}>
                  <div style={{fontSize:"10px", color:p.color, minWidth:"16px"}}>[ ]</div>
                  <div style={{fontSize:"12px", color:COLORS.txt}}>{item}</div>
                </div>
              ))}
            </div>
          ))}

          {/* Timeline */}
          <div style={{marginTop:"1rem", padding:".75rem", border:`1px solid ${COLORS.border}`, borderRadius:"3px", background:COLORS.bg2}}>
            <div style={{fontSize:"10px", color:COLORS.txt3, letterSpacing:"3px", marginBottom:".6rem"}}>// TIMELINE ESTIMÉE</div>
            <div style={{display:"flex", alignItems:"center", gap:"4px"}}>
              {phases.map((p,i) => (
                <div key={p.num} style={{flex:p.num===3?2:1, display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <div style={{width:"100%", height:"4px", background:p.color, borderRadius:"1px"}}/>
                  <div style={{fontSize:"9px", color:p.color, marginTop:"4px", textAlign:"center", letterSpacing:"1px"}}>P{p.num}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key principles */}
          <div style={{marginTop:"1rem", fontSize:"12px", color:COLORS.txt2, lineHeight:"1.8", padding:".75rem", background:COLORS.bg2, borderRadius:"3px", border:`1px solid ${COLORS.border}`}}>
            <div style={{color:COLORS.g, fontSize:"10px", letterSpacing:"3px", marginBottom:".5rem"}}>// PRINCIPES DE DÉVELOPPEMENT</div>
            🔵 Chaque phase = version utilisable et déployée<br/>
            🟢 Les scénarios hardcodés → DB dès Phase 1<br/>
            🟡 IA dynamique = différenciation concurrentielle forte<br/>
            🔴 Multi-tenant = passage de B2C à B2B = revenus récurrents
          </div>
        </div>
      )}

      {/* USE CASES TAB */}
      {tab === "usecases" && (
        <div>
          <div style={{fontSize:"10px", color: COLORS.txt3, letterSpacing:"3px", marginBottom:"1rem"}}>
            // CAS D'USAGE & MARCHÉS ADRESSABLES
          </div>

          {useCases.map((uc, i) => (
            <div
              key={i}
              onClick={()=>setActiveUseCase(activeUseCase===i?null:i)}
              style={{
                marginBottom:"8px", padding:".75rem 1rem",
                border:`1px solid ${activeUseCase===i?COLORS.g2:COLORS.border}`,
                borderRadius:"3px", cursor:"pointer",
                background: activeUseCase===i?COLORS.g3:COLORS.bg2,
                transition:"all .2s"
              }}
            >
              <div style={{display:"flex", alignItems:"center", gap:"12px"}}>
                <div style={{fontSize:"22px"}}>{uc.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:"12px", color: activeUseCase===i?COLORS.g:COLORS.txt, fontWeight:700, letterSpacing:"1px"}}>{uc.label}</div>
                  <div style={{fontSize:"11px", color:COLORS.txt2, marginTop:"2px"}}>{uc.desc}</div>
                </div>
                <div style={{fontSize:"10px", color:COLORS.gold, letterSpacing:"1px", textAlign:"right"}}>{uc.revenue}</div>
              </div>
            </div>
          ))}

          {/* Market size */}
          <div style={{marginTop:"1rem", display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"6px"}}>
            {[
              {label:"SJT MARKET", value:"$2.5B", sub:"Tests RH monde"},
              {label:"E-LEARNING", value:"$400B", sub:"Marché 2026"},
              {label:"COACHING", value:"$20B", sub:"Marché coaching"},
              {label:"DECISION AI", value:"Emergent", sub:"Nouveau segment"},
            ].map(m => (
              <div key={m.label} style={{padding:".75rem", border:`1px solid ${COLORS.border}`, borderRadius:"2px", background:COLORS.bg2, textAlign:"center"}}>
                <div style={{fontFamily:head, fontSize:"16px", fontWeight:700, color:COLORS.g}}>{m.value}</div>
                <div style={{fontSize:"9px", color:COLORS.txt3, letterSpacing:"2px", marginTop:"3px"}}>{m.label}</div>
                <div style={{fontSize:"10px", color:COLORS.txt2, marginTop:"2px"}}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COSTS TAB */}
      {tab === "costs" && (
        <div>
          <div style={{fontSize:"10px", color: COLORS.txt3, letterSpacing:"3px", marginBottom:"1rem"}}>
            // COÛTS & REVENUS ESTIMÉS
          </div>

          <div style={{fontSize:"10px", color:COLORS.g, letterSpacing:"3px", marginBottom:".65rem"}}>// COÛTS INFRASTRUCTURE (Phase 1)</div>
          {[
            {service:"Vercel (frontend)", cost:"$0/mois", note:"100GB bandwidth gratuit"},
            {service:"Railway (backend)", cost:"$0-5/mois", note:"500h gratuit puis ~$5"},
            {service:"Supabase (DB)", cost:"$0/mois", note:"500MB, 50k rows gratuit"},
            {service:"GitHub (code)", cost:"$0/mois", note:"Illimité public"},
            {service:"Claude API (génération)", cost:"~$0.015/scénario", note:"Cache = quasi-zéro usage"},
            {service:"Google Fonts", cost:"$0/mois", note:"CDN gratuit"},
          ].map((row,i) => (
            <div key={i} style={{display:"flex", gap:"10px", padding:".4rem .75rem", background:i%2===0?COLORS.bg2:"transparent", borderRadius:"2px", marginBottom:"3px"}}>
              <div style={{flex:2, fontSize:"12px", color:COLORS.txt}}>{row.service}</div>
              <div style={{flex:1, fontSize:"12px", color:COLORS.g, textAlign:"right", fontWeight:700}}>{row.cost}</div>
              <div style={{flex:2, fontSize:"10px", color:COLORS.txt3, textAlign:"right"}}>{row.note}</div>
            </div>
          ))}

          <div style={{fontSize:"10px", color:COLORS.gold, letterSpacing:"3px", margin:"1rem 0 .65rem"}}>// REVENUS POTENTIELS</div>
          {[
            {source:"Zone sponsor logo", model:"Mensuel", price:"50-200$/mois", phase:"Dès maintenant"},
            {source:"Ko-fi / PayPal", model:"Don libre", price:"Variable", phase:"Dès maintenant"},
            {source:"Plan Pro individuel", model:"Mensuel", price:"9$/mois", phase:"Phase 3"},
            {source:"Plan Coach", model:"Mensuel", price:"29$/mois", phase:"Phase 3"},
            {source:"Plan Organisation", model:"Annuel", price:"500-2000$/an", phase:"Phase 3"},
            {source:"Évaluation RH", model:"Par candidat", price:"15-25$/candidat", phase:"Phase 3"},
            {source:"API publique", model:"Usage", price:"0.01$/appel", phase:"Phase 4"},
          ].map((row,i) => (
            <div key={i} style={{display:"flex", gap:"8px", padding:".4rem .75rem", background:i%2===0?COLORS.bg2:"transparent", borderRadius:"2px", marginBottom:"3px", flexWrap:"wrap"}}>
              <div style={{flex:3, fontSize:"12px", color:COLORS.txt, minWidth:"120px"}}>{row.source}</div>
              <div style={{flex:1, fontSize:"11px", color:COLORS.txt2}}>{row.model}</div>
              <div style={{flex:1, fontSize:"12px", color:COLORS.gold, fontWeight:700, textAlign:"right"}}>{row.price}</div>
              <div style={{flex:1, fontSize:"10px", color:COLORS.txt3, textAlign:"right"}}>{row.phase}</div>
            </div>
          ))}

          <div style={{marginTop:"1rem", padding:".75rem", border:`1px solid ${COLORS.g3}`, borderRadius:"3px", background:COLORS.bg2}}>
            <div style={{fontSize:"10px", color:COLORS.g, letterSpacing:"3px", marginBottom:".5rem"}}>// PROJECTION CONSERVATIVE — 12 MOIS</div>
            <div style={{fontSize:"12px", color:COLORS.txt2, lineHeight:"1.9"}}>
              10 coaches × 29$/mois = <span style={{color:COLORS.g}}>290$/mois</span><br/>
              2 sponsors × 100$/mois = <span style={{color:COLORS.g}}>200$/mois</span><br/>
              Donations = <span style={{color:COLORS.g}}>50$/mois</span><br/>
              <span style={{color:COLORS.txt3}}>─────────────────</span><br/>
              Total Year 1 : <span style={{color:COLORS.g, fontFamily:head, fontSize:"14px", fontWeight:700}}>~$6,480/an</span><br/>
              <span style={{fontSize:"10px", color:COLORS.txt3}}>Infra : ~$60/an → Marge nette : 99%</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{marginTop:"1.5rem", paddingTop:"1rem", borderTop:`1px solid ${COLORS.border}`, fontSize:"10px", color:COLORS.txt3, textAlign:"center", lineHeight:"1.8"}}>
        © 2024 Vladimir Casapciuc (Владимир Касапчук) · MIT Open Source<br/>
        📧 v2land@gmail.com · 𝕏 @Vlad8Mir · ko-fi.com/v2land
      </div>
    </div>
  );
}
