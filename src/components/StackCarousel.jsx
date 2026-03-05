import React from 'react';
import styles from './StackCarousel.module.css';

// Palabras del carrusel (ajustadas según indicaciones)
const WORDS = [
  'Escalabilidad',
  'Seguridad',
  'Modernidad',
  'Diseño',
  'APIs',
  'Frontend',
  'Performance',
  'UX/UI',
  'Backend',
  'Integración',
  'Cloud',
  'Automatización',
];

export default function StackCarousel() {
  // Duplicamos para el efecto infinite seamless
  const track = [...WORDS, ...WORDS];

  return (
    <section
      id="stack"
      className={styles.section}
      aria-label="Stack y valores de desarrollo"
    >
      {/* Título de sección */}
      <div className={styles.header}>
        <span className={styles.sectionNum} aria-hidden="true">02</span>
        <p className={styles.sectionLabel}>Lo que nos define</p>
      </div>

      {/* Banda carrusel superior (izquierda → derecha) */}
      <div
        className={styles.track}
        aria-hidden="true"
        role="marquee"
      >
        <ul className={`${styles.list} ${styles.listForward}`} aria-hidden="true">
          {track.map((word, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.word}>{word}</span>
              <span className={styles.sep} aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Banda carrusel inferior (derecha → izquierda) */}
      <div
        className={styles.track}
        aria-hidden="true"
        role="marquee"
      >
        <ul className={`${styles.list} ${styles.listReverse}`} aria-hidden="true">
          {track.map((word, i) => (
            <li key={i} className={styles.itemAlt}>
              <span className={styles.word}>{word}</span>
              <span className={styles.sep} aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
