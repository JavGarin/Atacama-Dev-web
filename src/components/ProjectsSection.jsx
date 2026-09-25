import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./ProjectsSection.module.css";

const PROJECTS = [
  {
    id: "p1",
    num: "01",
    title: "Landing Pages Comerciales",
    desc: "Desarrollo de sitios web corporativos y landing pages de alta conversión. Diseños optimizados para destacar servicios, captar leads y escalar la presencia digital de negocios.",
    tags: ["React", "JavaScript", "CSS3"],
    year: "2025",
    image: "/projects/screenshot_web_energystork.avif",
    url: "https://fitpro-gym-xi.vercel.app/",
  },
  // {
  //   id: "p2",
  //   num: "02",
  //   title: "Tech Store",
  //   desc: "E-commerce responsivo de tecnología con catálogo filtrable, carrito de compras y animaciones fluidas.",
  //   tags: ["React", "Vite", "Tailwind", "Framer"],
  //   year: "2025",
  //   image: "/projects/techstore.avif",
  //   url: "https://tech-store-web-nine.vercel.app/",
  // },
  {
    id: "p2",
    num: "02",
    title: "Diseños UI/UX",
    desc: "Energy Stork: Muestra de diseño interactivo de alto impacto visual orientado a e-commerce y publicidad. Enfoque en estética moderna, micro-animaciones inmersivas y experiencias de usuario memorables.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    year: "2025",
    image: "/projects/screenshot_energystore.avif",
    url: "https://web-carousel-ivory.vercel.app/",
  },
  {
    id: "p3",
    num: "03",
    title: "Webs para Campañas y ONGs",
    desc: "Vizcachi: Muestra de sitio web persuasivo para iniciativas de marketing o impacto social. Diseñado para recaudar interés y fondos, motivando a los usuarios a pasar de la intención a la acción en el reciclaje de pilas.",
    tags: ["Tailwind", "JavaScript", "Vite", "HTML5"],
    year: "2025",
    image: "/projects/screenshotVizcachi.avif",
    url: "https://vizcachi.vercel.app/",
  },
  {
    id: "p4",
    num: "04",
    title: "Onigashima Store",
    desc: "E-commerce de coleccionables con estética Manga Pastel, animaciones GSAP, carrito persistente y backend Supabase.",
    tags: ["React", "Vite", "Supabase", "GSAP"],
    year: "2025",
    image: "/projects/onigashima-store.avif",
    url: "https://onigashima-store.vercel.app/",
  },
  {
    id: "p5",
    num: "05",
    title: "Curve Slider — Portfolio",
    desc: "Showcase para fotografía nocturna con slider parabólico 3D interactivo y scroll infinito con Lenis.",
    tags: ["JavaScript", "Lenis", "GSAP", "CSS3"],
    year: "2025",
    image: "/projects/sebastian-mora.avif",
    url: "https://curve-slider-web.vercel.app/",
  },
  {
    id: "p6",
    num: "06",
    title: "Raíces del Sur Lodge",
    desc: "Plataforma de reservas para complejo turístico en la Patagonia con arquitectura mobile-first y alto rendimiento.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    year: "2026",
    image: "/projects/screenshot-hotel-cabanas.avif",
    url: "https://raices-del-sur-lodge.vercel.app/",
  },
  {
    id: "p7",
    num: "07",
    title: "Portfolios para clientes",
    desc: "Desarrollo landing pages profesionales y portfolios interactivos para negocios y profesionales que quieren actualizar su presencia digital y potenciar sus resultados.",
    tags: ["React", "Vite", "Tailwind", "GSAP"],
    year: "2025",
    image: "/projects/screenshot-portfolio-jg.avif",
    url: "https://javiergarin.dev/",
    items: [
      {
        id: "p7-1",
        tabName: "01 Web Profesional",
        title: "Portfolio Profesional — Javier Garín",
        desc: "Landing page y portfolio profesional para especialistas y negocios que buscan destacar en su industria. Diseñado para potenciar la marca personal, captar clientes calificados y exhibir proyectos con estética limpia, micro-animaciones fluidas y alta conversión.",
        tags: ["React", "Vite", "Tailwind", "GSAP"],
        year: "2025",
        image: "/projects/screenshot-portfolio-jg.avif",
        url: "https://javiergarin.dev/",
      },
      {
        id: "p7-2",
        tabName: "02 3D Interactivo",
        title: "3D Interactive Portfolio — Javier Garín",
        desc: "Single Page Application (SPA) interactiva con fondo procedural WebGL y shaders GLSL en Three.js con efectos glitch y ruido fractal (fBm). Diseñada con arquitectura Mobile-First, UI ultraligera y reactiva con Alpine.js, 60 FPS estables y soporte bilingüe (ES/EN).",
        tags: ["Three.js", "WebGL", "Alpine.js", "Vite"],
        year: "2025",
        image: "/projects/screenshot-web-javier.avif",
        url: "https://javier-garin-dev.vercel.app",
      },
    ],
  },
  {
    id: "p8",
    num: "08",
    title: "Plataformas de Gestión a Medida",
    desc: "Caso de Estudio (Plataforma Privada): PWA B2B desarrollada a medida para gestión deportiva (normativas WA/JDE). Cuenta con arquitectura limpia, routing avanzado, manejo seguro de datos sensibles (RUT) y cumplimiento de normativas de accesibilidad nacional de Chile.",
    tags: ["React", "TypeScript", "Vite", "Supabase", "Zustand"],
    year: "2026",
    image: "/projects/screenshot-AtacamaTrack.avif",
    badgeText: "Plataforma Privada",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const tabsListRef = useRef(null);
  const touchStartX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [subProjectIndex, setSubProjectIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const total = PROJECTS.length;
  const currentProject = PROJECTS[activeIndex];

  // Reiniciar sub-índice al cambiar de pestaña principal
  useEffect(() => {
    setSubProjectIndex(0);
  }, [activeIndex]);

  const hasItems = Array.isArray(currentProject.items) && currentProject.items.length > 0;
  const activeItem = hasItems
    ? currentProject.items[subProjectIndex] || currentProject.items[0]
    : currentProject;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Observer de visibilidad para animación de entrada
  useEffect(() => {
    // Fallback: si el navegador no soporta IntersectionObserver, mostrar de inmediato
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 50px 0px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Red de seguridad: si el observer no dispara en 2.5s (bugs en browsers móviles),
    // mostrar la sección igualmente para evitar que quede invisible
    const failsafe = setTimeout(() => setIsVisible(true), 2500);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  const isFirstMount = useRef(true);

  // Mantener la pestaña activa visible en scroll horizontal (Mobile) sin afectar el scroll de la página
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (tabsListRef.current) {
      const activeTab = tabsListRef.current.querySelector(
        `[data-index="${activeIndex}"]`,
      );
      if (activeTab) {
        const container = tabsListRef.current;
        const tabLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;
        const containerWidth = container.offsetWidth;
        container.scrollTo({
          left: tabLeft - containerWidth / 2 + tabWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  // Soporte de gestos táctiles (Swipe)
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (deltaX > 45) handleNext();
    else if (deltaX < -45) handlePrev();
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className={styles.section}
      aria-label="Proyectos de Atacama Dev"
    >
      {/* Header */}
      <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
        <span className={styles.sectionNum} aria-hidden="true">
          03
        </span>
        <div className={styles.headerContent}>
          <h2 className={styles.sectionTitle}>Proyectos</h2>
          <p className={styles.sectionSub}>
            Soluciones que construimos y que generan impacto real.
          </p>
        </div>
      </div>

      {/* Contenedor Principal: Fusión Mobile-First */}
      <div
        className={`${styles.deckContainer} ${isVisible ? styles.visible : ""}`}
      >
        {/* Selector de Pestañas (Horizontal en mobile / Sidebar en desktop) */}
        <aside className={styles.sidebar} aria-label="Navegación de proyectos">
          <div className={styles.controlsBar}>
            <div className={styles.counterWrap}>
              <span className={styles.counterNum}>{currentProject.num}</span>
              <span className={styles.counterSep}>/</span>
              <span className={styles.counterTotal}>0{total}</span>
            </div>
            <div className={styles.navButtons}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handlePrev}
                aria-label="Proyecto anterior"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handleNext}
                aria-label="Proyecto siguiente"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={tabsListRef}
            className={styles.tabsList}
            role="tablist"
            aria-orientation="horizontal"
          >
            {PROJECTS.map((proj, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  data-index={idx}
                  id={`tab-${proj.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${proj.id}`}
                  className={`${styles.tabItem} ${isActive ? styles.tabActive : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className={styles.tabNum}>{proj.num}</span>
                  <span className={styles.tabTitle}>{proj.title}</span>
                  <span className={styles.tabYear}>{proj.year}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Escenario de la Baraja (Deck Stage) */}
        <main
          className={styles.deckStage}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Presentación de proyecto activo"
        >
          {/* Capas decorativas de cartas (Baraja) */}
          <div className={styles.cardLayerBack} aria-hidden="true" />
          <div className={styles.cardLayerMid} aria-hidden="true" />

          {/* Carta Activa Frontal */}
          <article
            key={`${currentProject.id}-${hasItems ? subProjectIndex : "main"}`}
            id={`panel-${currentProject.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentProject.id}`}
            className={styles.activeCard}
          >
            {/* Contenedor de Imagen */}
            <div className={styles.imageWrap}>
              {activeItem.url ? (
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.imageLink}
                  aria-label={`Visitar sitio de ${activeItem.title}`}
                >
                  <img
                    src={activeItem.image}
                    alt={`Vista previa del proyecto ${activeItem.title}`}
                    className={styles.image}
                    loading="eager"
                    width="1880"
                    height="874"
                  />
                  <div className={styles.imageBadge}>
                    <span>Visitar sitio ↗</span>
                  </div>
                </a>
              ) : (
                <div className={styles.imageLink}>
                  <img
                    src={activeItem.image}
                    alt={`Vista previa del proyecto ${activeItem.title}`}
                    className={styles.image}
                    loading="eager"
                    width="1880"
                    height="874"
                  />
                  <div className={styles.imageBadgeStatic}>
                    <span>{activeItem.badgeText || "En desarrollo"}</span>
                  </div>
                </div>
              )}

              {/* Controles de cambio rápido en imagen si hay múltiples proyectos */}
              {hasItems && currentProject.items.length > 1 && (
                <div className={styles.imageSubNav}>
                  <button
                    type="button"
                    className={styles.imageSubNavBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSubProjectIndex((prev) => (prev - 1 + currentProject.items.length) % currentProject.items.length);
                    }}
                    aria-label="Proyecto anterior dentro de esta categoría"
                    title="Anterior"
                  >
                    ←
                  </button>
                  <span className={styles.imageSubNavCounter}>
                    0{subProjectIndex + 1} / 0{currentProject.items.length}
                  </span>
                  <button
                    type="button"
                    className={styles.imageSubNavBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSubProjectIndex((prev) => (prev + 1) % currentProject.items.length);
                    }}
                    aria-label="Proyecto siguiente dentro de esta categoría"
                    title="Siguiente"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {/* Contenido de la Carta con Layout Mobile-First */}
            <div className={styles.cardContent}>
              <div className={styles.metaRow}>
                <span className={styles.badgeNum}>
                  PROYECTO {currentProject.num}
                </span>
                <span className={styles.yearText}>{activeItem.year}</span>
              </div>

              {/* Selector de sub-proyectos si existen varios en la categoría */}
              {hasItems && (
                <div className={styles.subTabsContainer} role="tablist" aria-label="Portfolios disponibles">
                  <span className={styles.subTabsLabel}>Muestras:</span>
                  <div className={styles.subTabList}>
                    {currentProject.items.map((item, idx) => {
                      const isSubActive = subProjectIndex === idx;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={isSubActive}
                          className={`${styles.subTabBtn} ${isSubActive ? styles.subTabActive : ""}`}
                          onClick={() => setSubProjectIndex(idx)}
                        >
                          <span className={styles.subTabDot} aria-hidden="true" />
                          <span>{item.tabName || item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <h3 className={styles.projectTitle}>{activeItem.title}</h3>

              <p className={styles.projectDesc}>{activeItem.desc}</p>

              <div className={styles.cardFooter}>
                <span className={styles.stackLabel}>Stack Tecnológico:</span>
                <ul
                  className={styles.tagList}
                  aria-label="Tecnologías utilizadas"
                >
                  {activeItem.tags.map((tag) => (
                    <li key={tag} className={styles.tagItem}>
                      {tag}
                    </li>
                  ))}
                </ul>

                {activeItem.url ? (
                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visitButton}
                  >
                    <span>Ver proyecto en vivo</span>
                    <span className={styles.arrowIcon} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ) : (
                  <span className={styles.disabledBadge}>{activeItem.badgeText || "Próximamente"}</span>
                )}
              </div>
            </div>
          </article>
        </main>
      </div>
    </section>
  );
}
