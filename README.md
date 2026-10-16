# Atacama Dev Web

> Official web application for **Atacama Dev** — a Chilean software engineering and bespoke web development agency delivering high-performance, secure, and conversion-focused digital platforms.

![Atacama Dev Web Preview](./public/screenshot_web_atacamadev.png)

---

## 🌟 Overview

**Atacama Dev** transforms complex ideas into scalable, production-ready digital solutions. Based in Chile and operating worldwide, our focus is anchored in **active cybersecurity**, **universal web accessibility**, and **uncompromising performance**.

- 🌐 **Official Instagram:** [@atacamadev.app](https://www.instagram.com/atacamadev.app/)
- ✉️ **Inquiries & Proposals:** [contacto.atacamadev@gmail.com](mailto:contacto.atacamadev@gmail.com)
- 🏛️ **Chilean Public Procurement:** Active vendor in *Mercado Público / Compra Ágil*.

---

## 🛠️ Real Tech Stack

Built upon modern web standards without heavy frameworks or bloated abstractions:

- **UI Framework:** [React 19](https://react.dev/) + React DOM 19
- **Build Tool & Dev Server:** [Vite 5](https://vitejs.dev/)
- **Interactive 3D / WebGL:** [Three.js](https://threejs.org/) (custom procedural undulating wave with custom GLSL shaders, `pixelRatio ≤ 1.5`, automatic offscreen pausing, and `prefers-reduced-motion` compliance)
- **Styling Architecture:** Pure CSS Modules + Global Design System tokens (`src/styles/globals.css`) adhering to a Brutalist-Minimalist 60-30-10 palette
- **Icons & Micro-interactions:** [Lucide](https://lucide.dev/) + [Morphicons](https://github.com/)
- **Package Manager:** [pnpm](https://pnpm.io/) 11

---

## 📁 Project Structure

```text
Atacama Dev web/
├── .agents/                # Spec-Driven Development (SSD) memory, specs & tasks
├── public/                 # Static assets served at root
│   ├── favicon_io/         # PWA manifest and responsive favicons
│   ├── projects/           # High-efficiency portfolio screenshots (*.avif)
│   ├── gif_vizcachi/       # Community recycling initiative assets
│   ├── Rubik/ + Roboto/    # Self-hosted variable typography
│   └── screenshot_web_atacamadev.png  # Main web preview & Open Graph visual (PNG, 1200x630)
├── src/                    # Application source code
│   ├── components/         # Modular React components + CSS Modules
│   │   ├── Hero.jsx                # WebGL 3D portal + conversion CTA
│   │   ├── StackCarousel.jsx       # Infinite seamless marquee with engineering values
│   │   ├── ProjectsSection.jsx     # Data-driven portfolio deck with sub-project tabs
│   │   ├── VizcachiCTA.jsx         # Non-profit community impact banner
│   │   ├── Footer.jsx              # Responsive navigation, contact & compliance drawer
│   │   ├── ProjectPlannerModal.jsx # Multi-step proposal wizard
│   │   └── LegalModal.jsx          # Accessible compliance & legal policy dialog
│   ├── hooks/              # useProgressivePortal.js (optimized Three.js engine)
│   ├── styles/             # globals.css (design tokens, reset, typography)
│   ├── App.jsx             # Semantic layout composition (<main> + <footer>)
│   └── main.jsx            # React 19 root bootstrap
├── index.html              # Core HTML5 entry point, SEO metas, Open Graph & schema
├── package.json            # Dependencies and scripts
└── vite.config.js          # Vendor chunk splitting and bundle optimizations
```

---

## 🚀 Key Features

1. **Cybersecurity by Design (OWASP Standards):** Defensive coding against XSS, CSRF, and injection attacks, hardened HTTP headers, and end-to-end TLS 1.3 encryption.
2. **Universal Accessibility (WCAG 2.1 AA & Chilean Law 20.422):** Strict semantic landmarks, full keyboard navigation, color contrast validation, and screen-reader friendliness.
3. **Interactive 3D Hero Portal:** Progressive GPU-accelerated WebGL background powered by Three.js that dynamically throttles during idle or off-screen states to preserve client battery and device thermals.
4. **Data-Driven Portfolio Showcase:** Interactive deck featuring real case studies across E-commerce, B2B SaaS platforms, and UI/UX engineering with instant tab switching and live production links.
5. **Interactive Proposal Planner:** A frictionless 4-step wizard (`ProjectPlannerModal`) allowing potential clients to configure their project scope and send structured requirements directly.
6. **Built-in Compliance & Transparency:** Dedicated collapsable compliance drawer and modal outlining Legal Notices, Privacy Policy (Law 19.628 & GDPR ready), Terms of Service, and a zero-ad-tracking Cookie Policy.

---

## 📄 License & Credits

- **Author:** Javier Garín ([Atacama Dev](https://www.instagram.com/atacamadev.app/))
- **Proprietary Commercial Software** © 2026 Atacama Dev. All rights reserved.
