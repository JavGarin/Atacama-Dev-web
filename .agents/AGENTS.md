# Atacama Dev Web — Agent Brain (SSD)

> Este archivo es el punto de entrada que los `.agents` DEBEN leer antes de cualquier orden.
> Repo: `Atacama Dev web` — SPA marketing/portfolio React 19 + Vite 5 + Three.js.

## 1. Dónde vive la verdad (SSD)

### SPEC-001 — Landing actual (AsBuilt, Done)
- Spec: `.agents/specs/atacama-dev-web-001-landing-actual/spec.md`
- Plan: `.agents/specs/atacama-dev-web-001-landing-actual/plan.md`
- Tareas: `.agents/specs/atacama-dev-web-001-landing-actual/tasks.md`

### SPEC-002 — Backend Leads (Done en producción)
- Spec: `.agents/specs/atacama-dev-web-002-backend-leads/spec.md`
- Plan: `.agents/specs/atacama-dev-web-002-backend-leads/plan.md`
- Tareas: `.agents/specs/atacama-dev-web-002-backend-leads/tasks.md`
- Archivos clave: `api/leads.js` (serverless) + `src/lib/leadClient.js` (cliente) + `vercel.json`
- Decisión: Supabase postergado (volumen 1–3/semana); Resend / FormSubmit fallbacks activos en prod.

### Skills locales
`.agents/skills/*/SKILL.md` (threejs-fundamentals, find-skills)

Regla SSD: **nunca codificar sin spec+plan aprobados**. Si la orden contradice la spec, actualizar primero `spec.md` → `plan.md` → `tasks.md`, luego implementar.

## 2. Comandos canónicos (Windows + pnpm)
```powershell
pnpm dev -- --host --port 5173      # dev server predeterminado -> http://localhost:5173/
pnpm build                          # genera dist/
pnpm preview                        # sirve dist/ en :4173
Get-NetTCPConnection -LocalPort 5173
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:5173/ -TimeoutSec 10
```

## 3. Convenciones obligatorias del repo
1. React 19 JSX sin TS, `src/App.jsx` compone `Hero/StackCarousel/ProjectsSection/VizcachiCTA/Footer`.
2. Estilos: tokens en `src/styles/globals.css` + CSS Modules por componente. No Tailwind.
3. Tokens: `--white #FFFFFF / --white-soft #F5F0EB / --black #0A0A0A / --gold #C89F57`, fuentes self-hosted `Rubik` (brand) + `Roboto` (body) en `public/`.
4. Assets: solo `.avif/.png/.gif`, `loading="lazy"` + `width/height` fuera del Hero.
5. Hero 3D: respetar `useProgressivePortal.js` — pixelRatio ≤1.5, grid 48/32, `IntersectionObserver` pausa, cleanup `dispose()` + `cancelAnimationFrame`, respetar `prefers-reduced-motion`.
6. Navegación por anclas `#hero/#stack/#proyectos`, `scroll-behavior:smooth`.
7. Captación con backend (SPEC-002): `ProjectPlannerModal` → `submitLead()` en `leadClient.js` → cadena `POST /api/leads → FormSubmit → mailto+clipboard`. La función `api/leads.js` es serverless Vercel (Node 20, región GRU). No inventar `fetch` sin spec.
8. A11y mínima: `main/contentinfo/address`, `aria-*`, foco visible dorado, teclado ESC cierra modal.
9. SEO en `index.html` (OG/Twitter `es_CL`). No romper metas.
10. Build: `vite.config.js manualChunks vendor-three/vendor`. No commitear `dist/` a futuro.

## 4. Workflow SSD para agentes
1. Leer `spec.md` + `plan.md` + `tasks.md` + skill relevante.
2. Marcar tarea en `tasks.md` como `InProgress` antes de tocar código.
3. Edits pequeños, verificar con `pnpm build` y `localhost:5173` 200 OK.
4. Actualizar `tasks.md` a `Done` con evidencia (comando + output).
5. Si aparece gap (ej. README dice GSAP pero no instalado), abrir `T-GAP` en tasks, no parche silencioso.

## 5. Opinión Senior (por qué specs dentro de .agents)
Sí: co-ubicar SSD en `.agents/specs/` es correcto porque (a) es descubrible al dar la orden sin path absoluto, (b) versiona spec+código en el mismo commit evitando drift, (c) permite referenciar `@.agents/specs/...` desde skills, (d) evita que `docs/` quede huérfano. Mantener además `README.md` solo como pitch público, no como spec.
