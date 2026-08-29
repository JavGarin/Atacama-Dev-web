import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useProgressivePortal } from '../hooks/useProgressivePortal.js';
import ProjectPlannerModal from './ProjectPlannerModal.jsx';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const brandRef     = useRef(null);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  // 1. Integración 3D: El Portal Progresivo (Glassmorphism & Partículas)
  useProgressivePortal(containerRef);

  // 2. Animación cinemática de entrada del lienzo 3D y elementos de marca
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Garantizar estado inicial sutil
      gsap.set(containerRef.current, {
        opacity: 0,
        scale: 0.94
      });

      gsap.set(brandRef.current, {
        opacity: 0,
        x: -24
      });

      const tl = gsap.timeline({
        delay: 0.15
      });

      // Entrada suave y fluida del portal 3D
      tl.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out'
      }, 0);

      // Entrada altamente fluida y gradual del logo + título y CTAs
      tl.to(brandRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.6,
        ease: 'power2.out'
      }, 0.25);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className={styles.hero}
        aria-label="Atacama Dev — Portal Progresivo"
      >
        {/* ── Lienzo 3D WebGL: El Portal Progresivo ── */}
        <div
          ref={containerRef}
          className={styles.canvasBackground}
          aria-hidden="true"
        />

        {/* ── Máscara de transición y desenfoque inferior de profundidad ── */}
        <div className={styles.transitionMask} aria-hidden="true" />

        {/* ── Marca e Identidad: Logo + Título Atacama Dev + Tagline + CTAs ── */}
        <div ref={brandRef} className={styles.brandWrapper}>
          {/* Micro-badge de estado / disponibilidad */}
          <div className={styles.statusBadge}>
            <span className={styles.pulseDot} aria-hidden="true" />
            <span className={styles.statusText}>
              Disponible para proyectos & Mercado Público
            </span>
          </div>

          <div className={styles.brandHeader}>
            <img
              src="/logo_1_transparente_ad.png"
              alt="Atacama Dev Logo"
              className={styles.logo}
            />
            <h1 className={styles.title}>Atacama Dev</h1>
          </div>

          <p className={styles.tagline}>
            Potenciamos tu negocio con <span className={styles.taglineAccent}>software a medida</span> y experiencias web de alto rendimiento.
          </p>

          {/* Grupo de Botones de Acción (Mobile-First CTA) */}
          <div className={styles.ctaGroup}>
            <button
              type="button"
              className={styles.primaryCta}
              onClick={() => setIsPlannerOpen(true)}
              aria-haspopup="dialog"
              aria-label="Abrir planificador para cotizar tu proyecto"
            >
              <span>Iniciar Propuesta</span>
              <span className={styles.ctaSparkle}>✦</span>
            </button>

            <a
              href="#proyectos"
              className={styles.secondaryCta}
              aria-label="Ver proyectos realizados"
            >
              <span>Ver Casos de Éxito</span>
              <span className={styles.arrowIcon}>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Modal Interactivo de Captación de Propuesta (Project Planner) ── */}
      <ProjectPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
      />
    </>
  );
}
