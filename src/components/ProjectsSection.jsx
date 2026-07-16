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
    title: 'Energy Store',
    desc: 'Tienda online moderna de bebidas y sodas con un diseño visual vibrante, carrusel de productos animado con CSS puro y experiencia de navegación fluida sin frameworks.',
    stack: 'HTML5 · CSS3 · JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    year: '2025',
    image: '/projects/screenshot-energy-store.avif',
    url: 'https://web-carousel-ivory.vercel.app/',
  },
  {
    id: 'p4',
    num: '04',
    title: 'AI Powered Recycling',
    desc: 'De la intención a la acción. Utilizamos inteligencia artificial para conectar a las personas con soluciones reales de reciclaje de pilas y baterías, protegiendo nuestro medio ambiente de forma inteligente y simple.',
    stack: 'Tailwind · JavaScript · Vite · HTML5 · CSS3',
    tags: ['Tailwind', 'JavaScript', 'Vite', 'HTML5'],
    year: '2025',
    image: '/projects/screenshotVizcachi.avif',
    url: 'https://vizcachi.netlify.app/',
  },
  {
    id: 'p5',
    num: '05',
    title: 'Onigashima Store',
    desc: 'E-commerce de coleccionables de anime con estética "Manga Pastel Dreams", glassmorphism, animaciones GSAP con scroll-trigger, carrito persistente y autenticación segura con Supabase.',
    stack: 'React · Vite · Supabase · GSAP · Lenis · CSS3',
    tags: ['React', 'Vite', 'Supabase', 'GSAP'],
    year: '2025',
    image: '/projects/onigashima-store.avif',
    url: 'https://onigashima-store.vercel.app/',
  },
  {
    id: 'p6',
    num: '06',
    title: 'Curve Slider — Portfolio',
    desc: 'Portfolio web de fotografía nocturna con un innovador Slider 3D Parabólico y scroll infinito de alto rendimiento.',
    stack: 'JavaScript · Lenis · GSAP · CSS3',
    tags: ['JavaScript', 'Lenis', 'GSAP', 'CSS3'],
    year: '2025',
    image: '/projects/sebastian-mora.avif',
    url: 'https://curve-slider-web.vercel.app/',
  },
  {
    id: 'p7',
    num: '07',
    title: 'Raíces del Sur Lodge',
    desc: 'Aplicación web de arriendo de cabañas vacacionales con diseño mobile-first, modernas animaciones y optimización de rendimiento.',
    stack: 'HTML5 · CSS3 · JavaScript',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    year: '2026',
    image: '/projects/screenshot-hotel-sur.avif',
    url: 'https://raices-del-sur-lodge.vercel.app/',
  },
  {
    id: 'p8',
    num: '08',
    title: 'Javier Garin - Portfolio Software Developer',
    desc: 'Este es un sitio web de portafolio personal moderno e interactivo creado para mostrar habilidades, proyectos y experiencia como desarrollador de software. El sitio está diseñado para ser visualmente atractivo, totalmente responsivo y eficaz.',
    stack: 'React · Vite · Tailwind CSS · GSAP · i18next',
    tags: ['React', 'Vite', 'Tailwind', 'GSAP', 'i18next'],
    year: '2026',
    image: '/projects/screenshot-portfolio-jg.avif',
    url: 'https://javiergarin.dev/',
  },
  {
    id: 'p9',
    num: '09',
    title: 'Atacama Track app',
    desc: 'Atacama Track es una solución integral para la gestión deportiva, diseñada específicamente para el entorno del atletismo. Esta herramienta facilita la administración, el seguimiento y la optimización de actividades y eventos atléticos, consolidando toda la información en un entorno centralizado para el beneficio de usuarios y coordinadores.',
    stack: 'React · TypeScript · Vite · Supabase · Zustand',
    tags: ['React', 'TypeScript', 'Vite', 'Supabase', 'Zustand'],
    year: '2026',
    image: '/projects/screenshot-AtacamaTrack.avif',
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

  // Animaciones de entrada (ScrollTrigger) — siempre activas
  useEffect(() => {
    const heading  = headingRef.current;
    const carousel = carouselRef.current;
    if (!heading || !carousel) return;

    gsap.set(heading,  { opacity: 0, y: 40 });
    gsap.set(carousel, { opacity: 0, y: 50 });

    gsap.to(heading, {
      scrollTrigger: {
        trigger: heading,
        start: 'top 90%',
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
    });

    gsap.to(carousel, {
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
                    <div className={styles.cardContent}>
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
