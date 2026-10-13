# PLAN-001 — Arquitectura y decisiones (AsBuilt)

## 1. Mapa flujo
`index.html(#root+/src/main.jsx)` → `main.jsx(StrictMode+globals.css)` → `App.jsx(<main>+Footer)` → `Hero→StackCarousel→ProjectsSection→VizcachiCTA`.

## 2. Stack efectivo
React 19.2.4 + Vite 5.2.0 + plugin-react 5.1.4, `three 0.185.1`, `lucide 1.31.0`, `morphicons 1.7.0`, pnpm 11.3.0, ESM `type:module`. Divergencia: README cita GSAP/Lenis no instalados — no usar hasta SPEC-002.

## 3. Estructura
`public/`: favicon_io, projects/*.avif(10), gif_vizcachi, Rubik/Roboto self-hosted, screenshot OG.
`src/`: App.jsx(20L comp), main.jsx(10L mount), components/*.jsx+*.module.css, hooks/useProgressivePortal.js(320L), styles/globals.css(143L tokens+reset).

## 4. Diseño
Tokens `globals.css`: white/soft, black/mid, gold/dark/light, gray, Rubik/Roboto, borders, easings, container. CSS Modules aíslan. Imágenes `max-width:100%`, scrollbar 6px, selection gold, focus 3px gold.

## 5. 3D Hero (ver skill threejs-fundamentals)
Scene+PerspectiveCamera45(z7.8)+WebGLRenderer(alpha,high-perf,no depth/stencil). Group offset x2.2 desktop. Plane 7.2x7.2. Vertex: 3 senos + radial cursor uMouse*2.8. Fragment: wireframe translúcido + points. Loop THREE.Timer, lerp cursor 5*delta, tilt scroll, breath scale, resize observer + IO pause, dispose estricto.

## 6. Datos portfolio
`PROJECTS` hardcode en `ProjectsSection.jsx`, imágenes `/projects/*.avif`, urls Vercel externas. `p2` comentado, `p7` anidado. Patrón data-driven listo para migrar a CMS/JSON.

## 7. Riesgos
R-01 Form sin backend → pérdida leads si mailto falla. Mitigar SPEC-002 API.
R-02 `dist/` commiteado + GSAP fantasma → confusión. Limpiar gitignore/README.
R-03 Sin tests/TS/lint → regresión visual. Añadir vitest+playwright mínimo.
R-04 Fuentes pesadas `public/Roboto+Rubik/static` → servir solo variable + `preload`.

## 8. Validación
`pnpm build` + `Invoke-WebRequest :5173 200` + navegación tabs/modal sin consola roja + resize 360/900/1440 sin overlap canvas-texto.
