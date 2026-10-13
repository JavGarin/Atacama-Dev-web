# SPEC-001 — Atacama Dev Web Landing Actual (reverse-engineered)

- ID: `atacama-dev-web-001-landing-actual`
- Fecha: 2026-10-13 | Autor: Senior SSD (auditoría código)
- Estado: `AsBuilt v1.0.0` | Fuente verdad: `src/`, `index.html`, `package.json`, `vite.config.js`
- Servidor canónico: `pnpm dev -- --host --port 5173` → `http://localhost:5173/` (verificado 200 OK)

## 1. Visión
One-page en español (Chile) que convierte visitas en propuestas: Hero 3D + manifiesto stack + portfolio data-driven + CTA social Vizcachi + footer contacto. Sin router, sin backend, sin auth.

## 2. User stories (US)
- US-01 Visitante entiende en <5s qué hace Atacama Dev (Hero: logo + título + tagline software a medida + badge Disponible + Mercado Público).
- US-02 Visitante inicia propuesta en 3 pasos (Tipo → Etapa → Datos) y la envía por correo/clipboard.
- US-03 Visitante recorre stack/servicios en doble marquee infinito.
- US-04 Visitante explora 7 categorías portfolio con sub-muestras y abre demo Vercel en pestaña nueva.
- US-05 Visitante apoya causa Vizcachi (Saber más / Encuesta Google Forms).
- US-06 Visitante copia email `contacto.atacamadev@gmail.com` y navega redes (GitHub JavGarin, Instagram atacamadev).

## 3. Requerimientos funcionales
- FR-01 SPA con secciones `#hero/#stack/#proyectos` + `VizcachiCTA` + `Footer`. Scroll suave.
- FR-02 Hero: canvas WebGL `useProgressivePortal`, badge estado, CTA `Iniciar Propuesta ✦` abre modal `aria-haspopup=dialog`, scroll-pill desktop+mobile a `#stack`.
- FR-03 Modal planner: pasos 1 Tipo[web/software/ecommerce/mercadopublico] 2 Etapa[idea/specs/upgrade] 3 Form[name/email/phone/description] 4 Éxito. Bloquea scroll body, ESC cierra, reset al abrir, Next deshabilitado si `!canProceedStep3`, éxito ofrece `mailto:` + `clipboard` + `getStructuredProposal()`.
- FR-04 StackCarousel: header `02 Lo que nos define`, párrafo arquitectura/seguridad, 2 bandas opuestas con `[...WORDS,...WORDS]` 26 términos.
- FR-05 ProjectsSection: `const PROJECTS[{id,num,title,desc,tags,year,image,url,items?}]`, card con imagen AVIF, badge `PROYECTO NN`, year, tabs `role=tablist` si `items`, flechas ←/→, tags, botón `Ver proyecto en vivo ↗` o badge `Próximamente`.
- FR-06 VizcachiCTA: logo, título, descripción, botones externos, mascota gif lazy.
- FR-07 Footer: topBar, hugeTitle marquee vertical clickeable scrollTop, columnas brand/nav/contact con dropdowns, copy-email con feedback `¡Copiado! ✓`, bottom `© year ATACAMA DEV + Diseñado por JavGarin ✦`.
- FR-08 SEO/A11y: `lang=es`, metas description/OG/Twitter `es_CL`, favicons, `theme-color #0A0A0A`, landmarks, labels, `loading=lazy` (no-Hero).

## 4. Requerimientos no funcionales
- NFR-01 Perf: 60fps Hero (grid 48 desktop/32 mobile, pixelRatio≤1.5, shaders mediump, pausa offscreen 0.05, zero-alloc rAF).
- NFR-02 Responsive mobile-first, `overflow-x:hidden`, container 1200px, `--section-pad clamp(5rem,10vw,8rem)`.
- NFR-03 Diseño Brutalista-Minimalista 60-30-10 Blanco/Negro/Dorado, bordes 2-3px, easings brutal/snap.
- NFR-04 Build separa `vendor-three/vendor`, warning 600KB. Runtime node 24 + pnpm 11.
- NFR-05 Respeta `prefers-reduced-motion`.

## 5. Fuera de alcance (actual)
Sin router, backend, DB, auth, pagos, i18n, tests, TS, analytics, sitemap/robots/json-ld, GSAP real (solo mención).

## 6. Criterios aceptación
- AC-01 `pnpm dev` → 200 OK en `/`, sin error consola bloqueante.
- AC-02 `pnpm build` OK, chunks `vendor-three` separados.
- AC-03 Planner completa 3 pasos y genera mailto + copia válidos.
- AC-04 Portfolio cambia tabs sin reload y abre demos externas.
- AC-05 Lighthouse móvil sin regresión vs baseline (a medir en SPEC-002).
