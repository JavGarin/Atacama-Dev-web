import React, { useRef, useState } from 'react';
import { useProgressivePortal } from '../hooks/useProgressivePortal.js';
import ProjectPlannerModal from './ProjectPlannerModal.jsx';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const brandRef     = useRef(null);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const handleScrollDown = (e) => {
    if (e) e.preventDefault();
    const target = document.getElementById('stack') || document.getElementById('proyectos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 1. Integración 3D: El Portal Progresivo (Glassmorphism & Partículas)
  useProgressivePortal(containerRef);

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

            {/* Indicador de scroll minimalista tipo cápsula interactiva (Desktop) */}
            <a
              href="#stack"
              onClick={handleScrollDown}
              className={styles.scrollDesktop}
              aria-label="Desplazarse hacia tecnologías y servicios"
              title="Desplazarse hacia abajo"
            >
              <span className={styles.mousePill}>
                <span className={styles.mouseWheel} />
              </span>
            </a>
          </div>
        </div>

        {/* Indicador de scroll minimalista tipo cápsula fijado en el bottom (Mobile) */}
        <a
          href="#stack"
          onClick={handleScrollDown}
          className={styles.scrollMobile}
          aria-label="Desplazarse hacia abajo"
          title="Desplazarse hacia abajo"
        >
          <span className={styles.mousePill}>
            <span className={styles.mouseWheel} />
          </span>
        </a>
      </section>

      {/* ── Modal Interactivo de Captación de Propuesta (Project Planner) ── */}
      <ProjectPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
      />
    </>
  );
}
