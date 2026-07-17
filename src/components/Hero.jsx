import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Divide texto en spans individuales por letra
───────────────────────────────────────────── */
function LetterSplit({ text, className }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={styles.ltr}
          aria-hidden="true"
          data-char={char}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const lineRef    = useRef(null);
  const badgeRef   = useRef(null);
  const taglineRef = useRef(null);
  const titleRef   = useRef(null);
  const dividerRef = useRef(null);
  const metaRef    = useRef(null);
  const decorRef   = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const letters = titleRef.current
      ? titleRef.current.querySelectorAll(`.${styles.ltr}`)
      : [];

    /* ── Estado inicial ── */
    gsap.set([badgeRef.current, taglineRef.current,
               dividerRef.current, metaRef.current], {
      opacity: 0, y: 18,
    });
    gsap.set(lineRef.current,    { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(decorRef.current,   { opacity: 0 });
    gsap.set(letters,            { y: '105%', opacity: 0 });

    if (prefersReducedMotion) {
      gsap.set(
        [badgeRef.current, taglineRef.current, dividerRef.current,
         metaRef.current, decorRef.current, lineRef.current],
        { opacity: 1, y: 0, scale: 1, scaleX: 1 }
      );
      gsap.set(letters, { y: 0, opacity: 1 });
      return;
    }

    /* ── Timeline de entrada ── */
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.05 });

    // Línea roja crece
    tl.to(lineRef.current,  { scaleX: 1, duration: 0.65 });

    // Badge
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.42 }, '-=0.3');

    // Título unificado en una línea
    tl.to(letters, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: { each: 0.02, from: 'start' },
      ease: 'expo.out',
    }, '-=0.3');

    // Tagline (aparece y luego se llena de izquierda a derecha)
    tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.38 }, '-=0.4')
      .to(taglineRef.current, {
        '--fill-width': '100%',
        color: '#F5F5F0',
        duration: 0.8, // Velocidad más lenta para simular carga
        ease: 'power1.inOut'
      }, '+=0.1');

    // Divisor horizontal
    tl.to(dividerRef.current, { opacity: 1, y: 0, duration: 0.35 }, '-=0.2');

    // Fila meta (desc + cta + tags)
    tl.to(metaRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15');

    // Número decorativo
    tl.to(decorRef.current, { opacity: 1, duration: 0.6 }, '-=0.2');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Atacama Dev — Presentación"
    >
      {/* Fondo: cuadrícula sutil */}
      <div className={styles.grid} aria-hidden="true" />

      {/* Barra roja superior */}
      <div ref={lineRef} className={styles.accentLine} aria-hidden="true" />

      <div className={styles.content}>

        {/* ── Fila superior: badge ── */}
        <div className={styles.topRow}>
          <div
            ref={badgeRef}
            className={styles.badge}
            aria-label="Software development, Chile, establecido en 2026"
          >
            <span className={styles.badgeDot} aria-hidden="true" />
            SWD · CHILE · EST. 2026
          </div>
        </div>

        {/* ── Título principal (Una sola línea) ── */}
        <h1
          ref={titleRef}
          className={styles.title}
          aria-label="Atacama Dev"
        >
          <span className={styles.titleLine}>
            <LetterSplit text="Atacama" />
            <span className={styles.titleSpace}>&nbsp;</span>
            <span className={styles.titleAccent}>
              <LetterSplit text="Dev" />
            </span>
          </span>
        </h1>

        {/* ── Tagline alineada ── */}
        <p ref={taglineRef} className={styles.tagline}>
          Lleva tus ideas al siguiente nivel.
        </p>

        {/* ── Divisor ── */}
        <div ref={dividerRef} className={styles.divider} aria-hidden="true" />

        {/* ── Fila meta: descripción + CTA + tags ── */}
        <div ref={metaRef} className={styles.meta}>
          <div className={styles.metaLeft}>
            <p className={styles.desc}>
              Transformamos ideas complejas en plataformas digitales de alto rendimiento. Desarrollamos aplicaciones web y software a medida con arquitectura robusta, diseño de vanguardia y seguridad avanzada desde Chile al mundo.
            </p>

            <div className={styles.tags} aria-hidden="true">
              {['WEB APPS', 'SOFTWARE', 'UX/UI', 'APIs'].map((t, i, arr) => (
                <React.Fragment key={t}>
                  <span className={styles.tag}>{t}</span>
                  {i < arr.length - 1 && <span className={styles.tagSep} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className={styles.metaRight}>
            <a
              href="mailto:contacto@atacamadev.cl"
              className={styles.ctaPrimary}
              aria-label="Enviar correo a Atacama Dev"
            >
              <span>Iniciar proyecto</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18" height="18"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#proyectos" className={styles.ctaSecondary}>
              Ver proyectos
            </a>
          </div>
        </div>
      </div>

      {/* Número decorativo */}
      <span ref={decorRef} className={styles.decorNum} aria-hidden="true">01</span>
    </section>
  );
}
