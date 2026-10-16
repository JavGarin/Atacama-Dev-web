# Atacama Dev Web — Agent Brain (SSD + Harness)

> **Punto de entrada obligatorio.** Todo agente AI que abra este repo DEBE leer
> este archivo completo antes de ejecutar cualquier orden.
> Repo: `Atacama Dev web` — SPA marketing/portfolio React 19 + Vite 5 + Three.js.
> Dominio canonico: **https://atacama-dev.app/** · Rama principal: `main`

---

## 0. TL;DR — Permisos del agente (leer primero)

| Quiero...                              | Puedo? | Como                                                                      |
|----------------------------------------|--------|---------------------------------------------------------------------------|
| Editar texto/copy UI                   | SI     | Editar directamente el `.jsx` del componente                              |
| Agregar proyecto al portfolio          | SI     | Solo `PROJECTS[]` en `ProjectsSection.jsx`                               |
| Cambiar colores / tipografia           | SI     | Solo `src/styles/globals.css` (tokens)                                   |
| Crear un nuevo componente              | SI     | `.jsx` + `.module.css` en `src/components/`, registrar en `App.jsx`      |
| Editar el canvas WebGL 3D              | AVISO  | Leer skill `threejs-fundamentals` antes. Respetar NFR-01                 |
| Agregar dependencia npm                | AVISO  | Solo con spec+plan aprobados. NO Tailwind, NO GSAP sin spec              |
| Cambiar el dominio en index.html       | AVISO  | Dominio es `atacama-dev.app` (con guion). Actualizar TAMBIEN sitemap.xml y robots.txt |
| Crear backend / serverless             | AVISO  | Ver SPEC-002 primero. Patron: `api/*.js` (Vercel Node 20, region GRU)   |
| Agregar router / paginas               | NO     | SPA sin router — fuera de alcance actual                                  |
| Agregar auth / DB directa              | NO     | Sin spec aprobada. Ver SPEC-002 para patron Supabase                     |
| Instalar TypeScript                    | NO     | T-GAP07 pendiente, requiere plan de migracion                            |
| Instalar Tailwind                      | NO     | Stack usa CSS Modules + tokens. Prohibido sin spec                       |
| Commitear `dist/`                      | NO     | `.gitignore` lo excluye. Nunca stagear `dist/`                           |
| Commitear `.env`                       | NO     | Solo `.env.example`. Variables reales solo en Vercel Dashboard           |

---

## 1. Specs activas (SSD — Single Source of Truth)

### SPEC-001 — Landing Actual (AsBuilt / Done)
- Spec: `.agents/specs/atacama-dev-web-001-landing-actual/spec.md`
- Plan: `.agents/specs/atacama-dev-web-001-landing-actual/plan.md`
- Tareas: `.agents/specs/atacama-dev-web-001-landing-actual/tasks.md`
- **Estado**: Produccion estable. Commit `3291c55` (2026-10-16).

### SPEC-002 — Backend Leads (Done en produccion)
- Spec: `.agents/specs/atacama-dev-web-002-backend-leads/spec.md`
- Tareas: `.agents/specs/atacama-dev-web-002-backend-leads/tasks.md`
- Archivos clave: `api/leads.js` (serverless Vercel) + `src/lib/leadClient.js`
- **Estado**: Desplegado. Supabase postergado (YAGNI — volumen 1-3 leads/semana).
- **Decision activa**: Cadena `POST /api/leads -> FormSubmit AJAX -> mailto+clipboard`. No romper.

### Skills locales
- `.agents/skills/threejs-fundamentals/SKILL.md` — SIEMPRE antes de tocar `useProgressivePortal.js`
- `.agents/skills/find-skills/SKILL.md` — Para descubrir skills del ecosistema

**Regla SSD**: Nunca codificar sin spec+plan aprobados. Si la orden contradice la spec,
actualizar `spec.md -> plan.md -> tasks.md` primero, luego implementar.

---

## 2. Arquitectura del repo (AsBuilt 2026-10-16)

```
Atacama Dev web/
|- .agents/              # SSD: specs, tasks, skills. Fuente de verdad de agentes.
|- api/
|  `- leads.js           # Serverless Vercel Node 20 (SPEC-002). Rate-limit + honeypot.
|- public/
|  |- favicon_io/        # Favicons PWA. No modificar sin diseno aprobado.
|  |- projects/          # Screenshots portfolio *.avif - solo AVIF, lazy, width+height.
|  |- gif_vizcachi/      # Assets Vizcachi (logo + mascota gif).
|  |- Rubik/             # Fuente brand self-hosted variable.
|  |- Roboto/            # Fuente body self-hosted variable.
|  |- logo_1_transparente_ad.png         # Logo principal.
|  |- LogoChc.avif                       # Logo Mercado Publico / Compra Agil.
|  |- screenshot_web_atacamadev.png      # OG image social sharing (PNG, 1200x630).
|  |- screenshot_web_atacamadev.avif     # Vista previa README (AVIF).
|  |- sitemap.xml        # Sitemap canonico -> atacama-dev.app
|  `- robots.txt         # Permite todo + apunta Sitemap a atacama-dev.app
|- src/
|  |- App.jsx            # Composicion semantica: <main> + <footer>. NO logica aqui.
|  |- main.jsx           # Bootstrap React 19 StrictMode.
|  |- components/
|  |  |- Hero.jsx + .module.css            # WebGL portal + CTA Planner.
|  |  |- StackCarousel.jsx + .module.css   # Doble marquee servicios.
|  |  |- ProjectsSection.jsx + .module.css # Portfolio data-driven (PROJECTS[]).
|  |  |- VizcachiCTA.jsx + .module.css     # Banner ONG reciclaje.
|  |  |- Footer.jsx + .module.css          # Nav + Contacto + Compliance dropdown.
|  |  |- ProjectPlannerModal.jsx + .module.css  # Wizard 3 pasos + envio leads.
|  |  `- LegalModal.jsx + .module.css      # Modal legal 4 tabs.
|  |- hooks/
|  |  `- useProgressivePortal.js  # Motor Three.js. CRITICO. Leer skill antes de tocar.
|  |- lib/
|  |  `- leadClient.js   # validateLead + submitLead. Sin dependencias externas.
|  `- styles/
|     `- globals.css     # Design tokens, reset, tipografia. UNICA fuente de tokens CSS.
|- index.html            # SEO completo: metas, OG, Twitter Card, JSON-LD, canonical.
|- vercel.json           # Routing serverless + headers seguridad.
|- vite.config.js        # manualChunks vendor-three / vendor.
`- .env.example          # Variables entorno documentadas. Nunca commitear .env real.
```

---

## 3. Harness de Constraints (reglas no negociables)

### 3.1 Identidad visual — NO ROMPER
```
--white:      #FFFFFF
--white-soft: #F5F0EB
--black:      #0A0A0A
--gold:       #C89F57
```
- Fuentes: `Rubik` (brand) + `Roboto` (body) — self-hosted en `public/`. Sin Google Fonts CDN.
- Tokens viven SOLO en `src/styles/globals.css`. Los modulos CSS solo consumen tokens.
- Estetica: Brutalista-Minimalista 60-30-10 (Blanco/Negro/Dorado).

### 3.2 Imagenes / Assets
- Portfolio: `.avif` unicamente. Siempre `loading="lazy" width="N" height="N"` (excepto Hero logo).
- OG/Twitter: `.png` (1200x630). El AVIF existe solo para README.
- Sin `<img>` sin `alt`. Sin imagenes inline (SVG inline solo si < 1 KB y reutilizable).

### 3.3 SEO — Dominio canonico
- **Dominio oficial**: `https://atacama-dev.app/` (con guion medio).
- Si cambias cualquier URL en `index.html` -> actualizar tambien `public/sitemap.xml` y `public/robots.txt`.
- `og:image` -> `screenshot_web_atacamadev.png` (PNG). `og:image:type` -> `image/png`.
- JSON-LD tipo `ProfessionalService`. No cambiar `@type` sin spec.

### 3.4 Three.js / WebGL (CRITICO)
- `pixelRatio` -> max 1.5 siempre.
- Grilla: 48x48 desktop / 32x32 mobile (< 900px).
- `IntersectionObserver` pausa render cuando Hero no esta visible.
- Cleanup obligatorio: `dispose()` geometria + materiales + renderer. `cancelAnimationFrame`. Remover listeners.
- Respetar `prefers-reduced-motion`: si activo, detener rotacion/tilt. Olas continuan.
- `depth: false`, `stencil: false` en el renderer (optimizacion wireframe translucido).
- LEER skill `threejs-fundamentals` ANTES de cualquier edicion.

### 3.5 Leads / Backend (SPEC-002)
- Cadena: `POST /api/leads (8s timeout)` -> `FormSubmit AJAX` -> `modo manual`.
- `validateLead()` siempre antes de `submitLead()`. Nunca saltar validacion.
- Honeypot: campos `company` y `website` deben llegar vacios. Si llenos -> 400.
- Rate-limit: 10 req/min por IP. No modificar sin spec.
- Env vars solo en Vercel Dashboard. Nunca hardcodear keys.
- WhatsApp placeholder `56900000000` es ficticio — no activar hasta tener numero real.

### 3.6 Accesibilidad (A11y) — minima obligatoria
- Landmarks: `<main>`, `<footer role="contentinfo">`, `<address>`.
- Foco visible: `outline: 3px solid var(--gold)` en `:focus-visible`.
- ESC cierra cualquier modal (`LegalModal` + `ProjectPlannerModal`).
- Todo modal: `role="dialog" aria-modal="true" aria-labelledby="..."`.
- Imagenes decorativas: `aria-hidden="true"`. Interactivas: `aria-label`.
- Carrusel marquee: `aria-hidden="true"` (contenido decorativo).

### 3.7 CSS Architecture
- Solo CSS Modules por componente. Cero estilos inline ad-hoc.
- Variables globales: solo en `globals.css`. Nunca duplicar tokens en modulos.
- Mobile-first: `min-width` breakpoints. Container: `max-width: 1200px; margin: auto`.
- `overflow-x: hidden` en `body`. `scroll-behavior: smooth` en `:root`.
- Sin Tailwind. Sin styled-components. Sin emotion.

### 3.8 Git / Deploy
- Build comando: `pnpm build` (NO `npm run build`).
- Dev server: `pnpm dev -- --host --port 5173`.
- Plataforma: Vercel (region `gru1`). `vercel.json` es el contrato de routing.
- Commit convention: `feat|fix|chore|docs|refactor(spec-xxx): mensaje breve`.
- Nunca commitear: `dist/`, `.env`, `.env.local`, archivos con keys/secrets.
- PowerShell policy en dev Windows: no ejecutar `npm run lint` ni `npm run build` via npm.

---

## 4. Comandos canonicos (Windows + pnpm)

```powershell
pnpm dev -- --host --port 5173      # dev server -> http://localhost:5173/
pnpm build                          # genera dist/ (verificar antes de deploy)
pnpm preview                        # sirve dist/ en :4173
Get-NetTCPConnection -LocalPort 5173
Invoke-WebRequest -UseBasicParsing -Uri http://localhost:5173/ -TimeoutSec 10
```

IMPORTANTE: El usuario ejecuta el dev server manualmente. El agente NO debe correr
`pnpm dev` ni `npm run dev`. Tampoco `npm run lint` ni `npm run build` via npm.

---

## 5. Workflow SSD para agentes (obligatorio, 8 pasos)

```
1. Leer AGENTS.md (este archivo)
2. Leer spec.md + plan.md + tasks.md de la SPEC relevante.
3. Marcar tarea como InProgress en tasks.md ANTES de tocar codigo.
4. Edits pequenos y focalizados. Un concern por commit.
5. Verificar: pnpm build sin errores + localhost:5173 200 OK sin errores de consola.
6. Marcar tarea como Done en tasks.md con evidencia (comando + output).
7. Commit: feat|fix|chore(spec-XXX): descripcion breve.
8. Gap no especificado -> abrir T-GAP en tasks.md. Nunca parche silencioso.
```

---

## 6. Gaps pendientes (proximas specs)

| ID      | Descripcion                                                              | Prioridad | SPEC     |
|---------|--------------------------------------------------------------------------|-----------|----------|
| T-GAP05 | QA base: vitest utils modal + playwright smoke hero->planner->portfolio  | Media     | SPEC-003 |
| T-GAP06 | Perf fuentes: solo variable fonts + `<link preload>` Rubik/Roboto        | Baja      | SPEC-003 |
| T-GAP07 | TS progresivo: `useProgressivePortal.js -> .ts` + jsconfig strict        | Baja      | SPEC-004 |

---

## 7. Decisiones de arquitectura registradas (ADR)

| ADR    | Decision                                          | Por que                                                                   |
|--------|---------------------------------------------------|---------------------------------------------------------------------------|
| ADR-01 | CSS Modules + tokens en lugar de Tailwind         | Control total del diseno brutalista; Tailwind rompe la estetica            |
| ADR-02 | No router (SPA scroll-based)                      | Una pagina de marketing. Router agrega complejidad innecesaria            |
| ADR-03 | Supabase postergado (YAGNI)                       | 1-3 leads/semana no justifica DB. Revisar si supera 20/semana             |
| ADR-04 | AVIF para portfolio, PNG para OG image            | WhatsApp/LinkedIn/Slack no soportan AVIF. PNG garantiza preview social    |
| ADR-05 | Self-hosted fonts (Rubik/Roboto)                  | Sin Google CDN; mejor privacidad, perf offline, sin bloqueo de render     |
| ADR-06 | Three.js manual (sin React Three Fiber)           | Control total del loop, cleanup estricto, optimizaciones pixelRatio/grid  |
| ADR-07 | FormSubmit como fallback lead (no solo mailto)    | Captura email aunque el usuario no tenga cliente de correo configurado    |
