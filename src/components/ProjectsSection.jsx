import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ProjectsSection.module.css';

const PROJECTS = [
  {
    id: 'p1',
    num: '01',
    title: 'FitPro Gym',
    desc: 'Landing page moderna para gimnasio con catálogo de planes, servicios y embudo de conversión optimizado.',
    tags: ['React', 'JavaScript', 'CSS3'],
    year: '2025',
    image: '/projects/screenshot_opengraph.avif',
    url: 'https://fitpro-gym-xi.vercel.app/',
  },
  {
    id: 'p2',
    num: '02',
    title: 'Tech Store',
    desc: 'E-commerce responsivo de tecnología con catálogo filtrable, carrito de compras y animaciones fluidas.',
    tags: ['React', 'Vite', 'Tailwind', 'Framer'],
    year: '2025',
    image: '/projects/techstore.avif',
    url: 'https://tech-store-web-nine.vercel.app/',
  },
  {
    id: 'p3',
    num: '03',
    title: 'Energy Store',
    desc: 'Tienda interactiva de bebidas energéticas con diseño visual de alto impacto y micro-animaciones en CSS puro.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    year: '2025',
    image: '/projects/screenshot_energystore.avif',
    url: 'https://web-carousel-ivory.vercel.app/',
  },
  {
    id: 'p4',
    num: '04',
    title: 'AI Powered Recycling',
    desc: 'Plataforma inteligente que conecta a usuarios con puntos de reciclaje de baterías mediante asistencia de IA.',
    tags: ['Tailwind', 'JavaScript', 'Vite', 'HTML5'],
    year: '2025',
    image: '/projects/screenshotVizcachi.avif',
    url: 'https://vizcachi.netlify.app/',
  },
  {
    id: 'p5',
    num: '05',
    title: 'Onigashima Store',
    desc: 'E-commerce de coleccionables con estética Manga Pastel, animaciones GSAP, carrito persistente y backend Supabase.',
    tags: ['React', 'Vite', 'Supabase', 'GSAP'],
    year: '2025',
    image: '/projects/onigashima-store.avif',
    url: 'https://onigashima-store.vercel.app/',
  },
  {
    id: 'p6',
    num: '06',
    title: 'Curve Slider — Portfolio',
    desc: 'Showcase para fotografía nocturna con slider parabólico 3D interactivo y scroll infinito con Lenis.',
    tags: ['JavaScript', 'Lenis', 'GSAP', 'CSS3'],
    year: '2025',
    image: '/projects/sebastian-mora.avif',
    url: 'https://curve-slider-web.vercel.app/',
  },
  {
    id: 'p7',
    num: '07',
    title: 'Raíces del Sur Lodge',
    desc: 'Plataforma de reservas para complejo turístico en la Patagonia con arquitectura mobile-first y alto rendimiento.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    year: '2026',
    image: '/projects/screenshot-hotel-sur.avif',
    url: 'https://raices-del-sur-lodge.vercel.app/',
  },
  {
    id: 'p8',
    num: '08',
    title: 'Javier Garin — Portfolio',
    desc: 'Sitio de marca personal interactivo orientado a ingeniería de software, arquitectura web y diseño visual.',
    tags: ['React', 'Vite', 'Tailwind', 'GSAP'],
    year: '2026',
    image: '/projects/screenshot-portfolio-jg.avif',
    url: 'https://javiergarin.dev/',
  },
  {
    id: 'p9',
    num: '09',
    title: 'Atacama Track App',
    desc: 'Solución integral para gestión deportiva y seguimiento de competencias atléticas de alto rendimiento.',
    tags: ['React', 'TypeScript', 'Vite', 'Supabase', 'Zustand'],
    year: '2026',
    image: '/projects/screenshot-AtacamaTrack.avif',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const tabsListRef = useRef(null);
  const touchStartX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const total = PROJECTS.length;
  const currentProject = PROJECTS[activeIndex];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Observer de visibilidad para animación de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isFirstMount = useRef(true);

  // Mantener la pestaña activa visible en scroll horizontal (Mobile) sin afectar el scroll de la página
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (tabsListRef.current) {
      const activeTab = tabsListRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeTab) {
        const container = tabsListRef.current;
        const tabLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;
        const containerWidth = container.offsetWidth;
        container.scrollTo({
          left: tabLeft - (containerWidth / 2) + (tabWidth / 2),
          behavior: 'smooth',
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
      <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
        <span className={styles.sectionNum} aria-hidden="true">03</span>
        <div className={styles.headerContent}>
          <h2 className={styles.sectionTitle}>Proyectos</h2>
          <p className={styles.sectionSub}>
            Soluciones que construimos y que generan impacto real.
          </p>
        </div>
      </div>

      {/* Contenedor Principal: Fusión Mobile-First */}
      <div className={`${styles.deckContainer} ${isVisible ? styles.visible : ''}`}>
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
                  className={`${styles.tabItem} ${isActive ? styles.tabActive : ''}`}
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
            key={currentProject.id}
            id={`panel-${currentProject.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentProject.id}`}
            className={styles.activeCard}
          >
            {/* Contenedor de Imagen */}
            <div className={styles.imageWrap}>
              {currentProject.url ? (
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.imageLink}
                  aria-label={`Visitar sitio de ${currentProject.title}`}
                >
                  <img
                    src={currentProject.image}
                    alt={`Vista previa del proyecto ${currentProject.title}`}
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
                    src={currentProject.image}
                    alt={`Vista previa del proyecto ${currentProject.title}`}
                    className={styles.image}
                    loading="eager"
                    width="1880"
                    height="874"
                  />
                  <div className={styles.imageBadgeStatic}>
                    <span>En desarrollo</span>
                  </div>
                </div>
              )}
            </div>

            {/* Contenido de la Carta con Layout Mobile-First */}
            <div className={styles.cardContent}>
              <div className={styles.metaRow}>
                <span className={styles.badgeNum}>PROYECTO {currentProject.num}</span>
                <span className={styles.yearText}>{currentProject.year}</span>
              </div>

              <h3 className={styles.projectTitle}>{currentProject.title}</h3>

              <p className={styles.projectDesc}>{currentProject.desc}</p>

              <div className={styles.cardFooter}>
                <ul className={styles.tagList} aria-label="Tecnologías utilizadas">
                  {currentProject.tags.map((tag) => (
                    <li key={tag} className={styles.tagItem}>{tag}</li>
                  ))}
                </ul>

                {currentProject.url ? (
                  <a
                    href={currentProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visitButton}
                  >
                    <span>Ver proyecto en vivo</span>
                    <span className={styles.arrowIcon} aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className={styles.disabledBadge}>Próximamente</span>
                )}
              </div>
            </div>
          </article>
        </main>
      </div>
    </section>
  );
}
