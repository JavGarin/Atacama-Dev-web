# Atacama Dev Web

Atacama Dev es una agencia orientada al desarrollo web y creación de software a medida. Nuestro objetivo es llevar las ideas al siguiente nivel utilizando tecnología moderna, optimización SEO y una experiencia de usuario (UX/UI) cuidada al detalle.

## Stack Tecnológico (real, verificado 2026-10-13)

El proyecto está construido bajo los siguientes cimientos modernos:

- **Librería UI:** React 19.2 + React DOM 19.2
- **Empaquetador y Entorno de Desarrollo:** Vite 5 + @vitejs/plugin-react 5
- **3D / Hero interactivo:** Three.js 0.185 (`src/hooks/useProgressivePortal.js` — malla ondulante GLSL propia, pixelRatio ≤ 1.5, pausa offscreen)
- **Iconos:** Lucide 1.31 + Morphicons 1.7
- **Lenguaje Principal:** JavaScript / JSX (ES Modules, sin TypeScript)
- **Estilos:** CSS Modules por componente + tokens globales en `src/styles/globals.css` (variables, flexbox, grid, animaciones/keyframes nativas, marquees CSS)
- **Gestor de paquetes:** pnpm 11.3

> Nota: versiones anteriores del README mencionaban GSAP/Lenis. No son dependencias de este repo (`pnpm list --depth 0` no los incluye y no hay `import` en `src/`). Solo aparecen como texto descriptivo del stack de proyectos externos en `ProjectsSection.jsx`, y como skill de agente en `skills-lock.json` (no es dependencia runtime).

## Estructura de Carpetas

La arquitectura del proyecto está pensada para ser escalable y de fácil mantenimiento:

```text
Atacama Dev web/
├── .agents/                # Cerebro SSD: AGENTS.md + specs/<id>/spec+plan+tasks + skills/
│   └── specs/atacama-dev-web-001-landing-actual/
├── public/                 # Archivos estáticos servidos directamente al usuario
│   ├── favicon_io/         # Iconos de la pestaña del navegador y manifest
│   ├── projects/           # Recursos visuales del portafolio (*.avif)
│   ├── gif_vizcachi/       # Assets causa Vizcachi
│   ├── Rubik/ + Roboto/    # Fuentes variables self-hosted
│   └── screenshot_web_atacamadev.avif # Previsualización principal (Open Graph/SEO)
├── src/                    # Código fuente principal de la aplicación React
│   ├── components/         # Hero, StackCarousel, ProjectsSection, VizcachiCTA, Footer, ProjectPlannerModal (+ *.module.css)
│   ├── hooks/              # useProgressivePortal.js (Three.js hero)
│   ├── styles/             # globals.css (tokens Brutalista-Minimalista 60-30-10)
│   ├── App.jsx             # Composición: <main> 4 secciones + <Footer>
│   └── main.jsx            # Mount React.StrictMode
├── index.html              # Plantilla base y metadatos SEO/Open Graph (es_CL)
├── package.json            # Dependencias, scripts y configuración del proyecto
└── vite.config.js          # split vendor-three/vendor, chunkWarning 600
```

## Comandos

```powershell
pnpm dev -- --host --port 5173   # dev -> http://localhost:5173/
pnpm build                       # genera dist/
pnpm preview                     # sirve dist/
```

## Características Destacadas

1. **SEO Optimizado:** Integración de metadatos profundos (Open Graph y Twitter Cards) para previsualizaciones impecables al compartir el enlace.
2. **Hero 3D + Animaciones CSS:** Fondo WebGL propio con Three.js + marquees/transiciones CSS nativas (sin GSAP en este repo). Respeta `prefers-reduced-motion`.
3. **Responsive Design:** Mobile-first, de 360px a pantallas extra grandes, container 1200px.
4. **Captación sin backend:** `ProjectPlannerModal` wizard Tipo → Etapa → Datos → mailto + copiar propuesta.
5. **SSD:** spec vigente en `.agents/specs/atacama-dev-web-001-landing-actual/spec.md`. Leer `.agents/AGENTS.md` antes de codificar.

---

**Autor:** JavGarin

