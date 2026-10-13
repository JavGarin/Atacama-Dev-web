# TASKS-001 — Atacama Dev Web (AsBuilt + gaps propuestos)

> Agente: marcar InProgress antes de tocar código, Done solo con evidencia comando+output.

## A. Verificado Done (auditoría 2026-10-13)
- [x] T-01 Levantar `pnpm dev -- --host --port 5173` → 200 OK PID 19276
- [x] T-02 Mapear entry `index.html→main.jsx→App.jsx→5 secciones`
- [x] T-03 Auditar tokens `globals.css` + CSS Modules
- [x] T-04 Auditar `useProgressivePortal` perf + cleanup + a11y motion
- [x] T-05 Auditar planner `mailto+clipboard` sin backend
- [x] T-06 Auditar portfolio data-driven + tabs
- [x] T-07 Crear base SSD en `.agents/` (este archivo + spec.md + plan.md + AGENTS.md)

## B. Gaps (SPEC-001 → SPEC-002)
- [x] T-GAP01 Corregir README GSAP fantasma → Done 2026-10-13. Evidencia: `pnpm list --depth 0` (lucide, morphicons, react, react-dom, three; sin gsap/lenis) + `search_codebase gsap|Lenis` solo hits en README + descripciones portfolio externo + skills-lock (skill agente, no dependencia). Fix: README reescrito a stack real Three.js+CSS. Verificado `pnpm build` + `localhost:5173 200`.
- [x] T-GAP02 `dist/` en git → Done 2026-10-13 (no-acción requerida). Evidencia: `.gitignore` ya ignoraba `dist/dist-ssr`, `git ls-files ^dist` vacío, `git status` solo `M README.md`. Fix aplicado: `.gitignore` selectivo `.agents/*` + `!AGENTS.md !specs/** !skills/**` + `.agents/private/` ignorado, `skills-lock.json` y `dist/` siguen ignorados. `add --dry-run` confirma que solo entran `README.md + AGENTS.md + specs/* + skills/*/SKILL.md`.
- [ ] T-GAP03 Backend leads: `POST /api/leads` + validación + Resend/Supabase, fallback mailto actual.
- [ ] T-GAP04 SEO técnico: `public/sitemap.xml`, `robots.txt`, JSON-LD Organization.
- [ ] T-GAP05 QA base: `vitest` modal utils + `playwright` smoke hero→planner→portfolio.
- [ ] T-GAP06 Perf fuentes: solo variable fonts + `<link preload>` Rubik/Roboto, purgar `static/`.
- [ ] T-GAP07 TS progresivo: renombrar `useProgressivePortal.js→.ts` + `jsconfig` strict.

## C. Definición de Done por tarea futura
1. `pnpm build` verde. 2. `localhost:5173` 200 sin errores consola. 3. `tasks.md` actualizado. 4. Commit `feat|fix(spec-xxx): ...`.

Siguiente orden sugerida al agente: `@AGENTS.md ejecuta T-GAP02 y luego propone SPEC-002 leads`.

