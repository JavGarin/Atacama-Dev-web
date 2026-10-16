# TASKS-001 — Atacama Dev Web (AsBuilt + Gaps)

> Agente: marcar InProgress ANTES de tocar codigo. Done solo con evidencia comando+output.

## A. Done — Auditoria y construccion inicial (2026-10-13)

- [x] T-01 Levantar `pnpm dev -- --host --port 5173` - 200 OK
- [x] T-02 Mapear entry `index.html->main.jsx->App.jsx->5 secciones`
- [x] T-03 Auditar tokens `globals.css` + CSS Modules
- [x] T-04 Auditar `useProgressivePortal` perf + cleanup + a11y motion
- [x] T-05 Auditar planner `mailto+clipboard` sin backend
- [x] T-06 Auditar portfolio data-driven + tabs
- [x] T-07 Crear base SSD en `.agents/` (AGENTS.md + spec.md + plan.md + tasks.md)

## B. Done — Gaps resueltos

- [x] T-GAP01 Corregir README GSAP fantasma. Done 2026-10-13.
       Evidencia: `pnpm list --depth 0` sin gsap/lenis. README reescrito a stack real.
       `pnpm build` + `localhost:5173 200 OK`.

- [x] T-GAP02 `dist/` en git corregido. Done 2026-10-13.
       Evidencia: `.gitignore` excluye `dist/`. `git ls-files | findstr dist` vacio.

- [x] T-GAP04 SEO tecnico completo. Done 2026-10-16.
       Archivos: `public/sitemap.xml`, `public/robots.txt`, JSON-LD ProfessionalService
       en `index.html`, canonical URL `https://atacama-dev.app/`, geo-targeting CL,
       Open Graph + Twitter Card completo.

- [x] T-GAP08 Reordenamiento portfolio: Raices del Sur integrado como sub-muestra
       en 04 E-commerce. Done 2026-10-14.

- [x] T-GAP09 Curve Slider integrado como sub-muestra 03 en 05 Portfolios.
       Renumeracion categorias a 01-06. Done 2026-10-16.

- [x] T-GAP10 OG image migrada de AVIF a PNG. Done 2026-10-16.
       Evidencia: `public/screenshot_web_atacamadev.png` agregado.
       `og:image:type` -> `image/png`. Commit `3291c55`.

- [x] T-GAP11 Dominio canonico corregido de `atacamadev.app` a `atacama-dev.app`.
       Done 2026-10-16. Archivos afectados: `index.html` (canonical, og:url, og:image,
       twitter:image, JSON-LD url/logo/image), `public/sitemap.xml`, `public/robots.txt`.
       Commit `3291c55`.

- [x] T-GAP12 Limpieza codigo muerto. Done 2026-10-16.
       Eliminado: bloque comentado "Tech Store" en `ProjectsSection.jsx` (10 lineas).
       Eliminado: `brandRef` sin uso en `Hero.jsx`. Commit `3291c55`.

- [x] T-GAP13 AGENTS.md refactorizado como harness profesional SSD. Done 2026-10-16.
       Incluye: tabla TL;DR permisos, arquitectura AsBuilt, harness 8 areas,
       gaps con prioridad, ADR documentados.

## C. Pendiente (proximas specs)

- [ ] T-GAP05 QA base: vitest modal utils + playwright smoke hero->planner->portfolio.
       Prioridad: Media. Proponer SPEC-003.

- [ ] T-GAP06 Perf fuentes: servir solo variable fonts + `<link preload>` Rubik/Roboto.
       Purgar `public/Rubik/static` y `public/Roboto/static`. Prioridad: Baja.

- [ ] T-GAP07 TS progresivo: renombrar `useProgressivePortal.js -> .ts` + jsconfig strict.
       Prioridad: Baja. Proponer SPEC-004.

## D. Definicion de Done para toda tarea futura

1. `pnpm build` verde sin warnings bloqueantes.
2. `localhost:5173` 200 OK sin errores de consola roja.
3. `tasks.md` actualizado con evidencia.
4. Commit `feat|fix|chore|docs(spec-XXX): mensaje breve`.
