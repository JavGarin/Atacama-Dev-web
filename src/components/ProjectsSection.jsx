import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 'p1',
    num: '01',
    title: 'FitPro Gym',
    desc: 'Landing page moderna para gimnasio con secciones de planes, servicios y llamado a la acción optimizado.',
    stack: 'React · JavaScript · CSS3',
    tags: ['React', 'JavaScript', 'CSS3'],
    year: '2025',
    image: '/projects/screenshot.png',
    url: 'https://fitpro-gym-xi.vercel.app/',
  },
  {
    id: 'p2',
    num: '02',
    title: 'Tech Store',
    desc: 'E-commerce moderno y responsivo de productos tecnológicos con carrito de compras, navegación por categorías y slider en homepage.',
    stack: 'React · Vite · Tailwind CSS · React Router · Framer Motion',
    tags: ['React', 'Vite', 'Tailwind', 'Framer'],
    year: '2025',
    image: '/projects/techstore.avif',
    url: 'https://tech-store-web-nine.vercel.app/',
  },
  {
    id: 'p3',
    num: '03',
    title: 'Dashboard Analytics',
    desc: 'Visualización de datos en tiempo real con gráficos interactivos y reportes automatizados para PYME.',
    stack: 'Next.js · TypeScript · Chart.js',
    tags: ['Next.js', 'API REST', 'Chart.js'],
    year: '2025',
    image: null,
    url: null,
  },
  {
    id: 'p4',
    num: '04',
    title: 'App de Gestión Interna',
    desc: 'Sistema centralizado de gestión de proyectos, equipos y tareas con notificaciones en tiempo real.',
    stack: 'React · WebSockets · MongoDB',
    tags: ['React', 'WebSockets', 'MongoDB'],
    year: '2026',
    image: null,
    url: null,
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Resize listener para responsividad
  useEffect(() => {
    const handleResize = () => {
      let views = 1;
      if (window.innerWidth >= 1024) views = 3;
      else if (window.innerWidth >= 768) views = 2;
      setItemsPerView(views);
      
      // Ajustar index si al redimensionar quedamos fuera de rango
      setCurrentIndex((prev) => {
        const maxIdx = Math.max(0, PROJECTS.length - views);
        return prev > maxIdx ? maxIdx : prev;
      });
    };
    
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, PROJECTS.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Intersection Observer para pausar si no está visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Auto-avance cada 5 segundos
  useEffect(() => {
    if (isPaused || !isVisible) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, isVisible]);

  // Animaciones de entrada (ScrollTrigger)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([headingRef.current, carouselRef.current], { opacity: 1, y: 0, clearProps: 'transform' });
      return;
    }

    gsap.set(headingRef.current, { opacity: 0, y: 40 });
    gsap.set(carouselRef.current, { opacity: 0, y: 50 });

    gsap.to(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 90%',
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
    });

    gsap.to(carouselRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
      delay: 0.1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className={styles.section}
      aria-label="Proyectos destacados de Atacama Dev"
    >
      {/* Header */}
      <div ref={headingRef} className={styles.header}>
        <span className={styles.sectionNum} aria-hidden="true">03</span>
        <div>
          <h2 className={styles.sectionTitle}>Proyectos</h2>
          <p className={styles.sectionSub}>
            Soluciones que construimos y que generan impacto real.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={carouselRef} 
        className={styles.carouselWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="group"
        aria-roledescription="carousel"
        aria-label="Proyectos en formato carrusel"
      >
        <div className={styles.carouselViewport}>
          <ul 
            className={styles.carouselTrack}
            style={{ 
              transform: `translateX(-${(100 / itemsPerView) * currentIndex}%)` 
            }}
          >
            {PROJECTS.map((proj, idx) => {
              const isActive = idx >= currentIndex && idx < currentIndex + itemsPerView;
              return (
                <li
                  key={proj.id}
                  className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
                  aria-hidden={!isActive}
                >
                  <div className={styles.card}>
                    {/* Preview de imagen */}
                    {proj.image && (
                      <div className={styles.imageWrap}>
                        {proj.url ? (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.imageLink}
                            aria-label={`Ver proyecto ${proj.title} en vivo`}
                            tabIndex={isActive ? 0 : -1}
                          >
                            <img
                              src={proj.image}
                              alt={`Captura de pantalla del proyecto ${proj.title}`}
                              className={styles.image}
                              loading="lazy"
                            />
                            <span className={styles.imageBadge} aria-hidden="true">
                              Ver en vivo ↗
                            </span>
                          </a>
                        ) : (
                          <img
                            src={proj.image}
                            alt={`Captura de pantalla del proyecto ${proj.title}`}
                            className={styles.image}
                            loading="lazy"
                          />
                        )}
                        <p className={styles.stackLabel}>{proj.stack}</p>
                      </div>
                    )}

                    {/* Card body */}
                    <div className={styles.cardTop}>
                      <span className={styles.cardNum} aria-hidden="true">{proj.num}</span>
                      <span className={styles.cardYear}>{proj.year}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{proj.title}</h3>
                    <p className={styles.cardDesc}>{proj.desc}</p>
                    <footer className={styles.cardFooter}>
                      <ul className={styles.cardTags} role="list" aria-label="Tecnologías usadas">
                        {proj.tags.map((t) => (
                          <li key={t} className={styles.cardTag}>{t}</li>
                        ))}
                      </ul>
                      {proj.url ? (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardArrow}
                          aria-label={`Ir al proyecto ${proj.title}`}
                          tabIndex={isActive ? 0 : -1}
                        >
                          ↗
                        </a>
                      ) : (
                        <span className={styles.cardArrow} aria-hidden="true">↗</span>
                      )}
                    </footer>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Controles: Dots y Flechas */}
        <div className={styles.controls}>
          <button 
            className={styles.controlBtn} 
            onClick={prevSlide}
            aria-label="Proyecto anterior"
          >
            ←
          </button>
          
          <div className={styles.dots} role="tablist">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                role="tab"
                className={`${styles.dot} ${currentIndex === i ? styles.dotActive : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Ir al slide ${i + 1}`}
                aria-selected={currentIndex === i ? 'true' : 'false'}
              />
            ))}
          </div>

          <button 
            className={styles.controlBtn} 
            onClick={nextSlide}
            aria-label="Proyecto siguiente"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
