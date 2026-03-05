import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef  = useRef(null);
  const badgeRef    = useRef(null);
  const taglineRef  = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const descRef     = useRef(null);
  const ctaRef      = useRef(null);
  const tagsRef     = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const elements = [
      badgeRef.current,
      taglineRef.current,
      line1Ref.current,
      line2Ref.current,
      descRef.current,
      ctaRef.current,
      tagsRef.current,
    ];

    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 1, y: 0, clearProps: 'transform' });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      delay: 0.1,
    });

    // Badge pill
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
    });

    // Tagline
    tl.to(taglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
    }, '-=0.2');

    // Título línea 1
    tl.to(line1Ref.current, {
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
    }, '-=0.25');

    // Título línea 2 (acento rojo)
    tl.to(line2Ref.current, {
      y: 0,
      duration: 0.7,
      ease: 'expo.out',
    }, '-=0.5');

    // Descripción
    tl.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.45,
    }, '-=0.2');

    // CTA
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.4)',
    }, '-=0.15');

    // Tags
    tl.to(tagsRef.current, {
      opacity: 1,
      duration: 0.35,
    }, '-=0.1');

    return () => tl.kill();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Atacama Dev — Presentación"
    >
      {/* Fondo brutalista: líneas de cuadrícula */}
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.content}>

        {/* Badge */}
        <div
          ref={badgeRef}
          className={styles.badge}
          aria-label="Software development, Chile, establecido en 2026"
        >
          <span className={styles.badgeDot} aria-hidden="true" />
          SWD · CHILE · EST. 2026
        </div>

        {/* Tagline */}
        <p ref={taglineRef} className={styles.tagline}>
          Lleva tu negocio al siguiente nivel.
        </p>

        {/* Título principal */}
        <h1 className={styles.title} aria-label="Atacama Dev">
          <span className={styles.titleOverflow}>
            <span ref={line1Ref} className={styles.titleLine}>
              Atacama
            </span>
          </span>
          <span className={styles.titleOverflow}>
            <span
              ref={line2Ref}
              className={`${styles.titleLine} ${styles.titleAccent}`}
            >
              Dev
            </span>
          </span>
        </h1>

        {/* Descripción */}
        <p ref={descRef} className={styles.desc}>
          Construimos ideas digitales que escalan. Desarrollo web y software
          a medida para potenciar tu proyecto o empresa desde Chile al mundo.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className={styles.actions}>
          <a
            href="mailto:contacto@atacamadev.cl"
            className={styles.ctaPrimary}
            aria-label="Enviar correo a Atacama Dev para iniciar un proyecto"
          >
            <span>Iniciar proyecto</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#proyectos" className={styles.ctaSecondary}>
            Ver proyectos
          </a>
        </div>

        {/* Tags inferiores */}
        <div ref={tagsRef} className={styles.tags} aria-hidden="true">
          <span className={styles.tag}>WEB APPS</span>
          <span className={styles.tagSep} />
          <span className={styles.tag}>SOFTWARE</span>
          <span className={styles.tagSep} />
          <span className={styles.tag}>UX/UI</span>
          <span className={styles.tagSep} />
          <span className={styles.tag}>APIS</span>
        </div>
      </div>

      {/* Número decorativo */}
      <span className={styles.decorNum} aria-hidden="true">01</span>
    </section>
  );
}
