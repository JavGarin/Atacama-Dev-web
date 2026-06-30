import React from 'react';
import styles from './VizcachiCTA.module.css';

export default function VizcachiCTA() {
  return (
    <section className={styles.ctaSection} aria-labelledby="vizcachi-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <img 
            src="/gif_vizcachi/logo.png" 
            alt="Vizcachi Logo" 
            className={styles.logo} 
            loading="lazy" 
          />
          <div className={styles.textContent}>
            <h2 id="vizcachi-title" className={styles.title}>Apoya el Reciclaje en Atacama</h2>
            <p className={styles.description}>
              Únete a <strong>Vizcachi</strong> y contribuye al reciclaje de pilas y productos electrónicos. Protejamos juntos nuestra región. Además, te invitamos a completar nuestra encuesta para ayudarnos a preparar su posible llegada.
            </p>
          </div>
        </div>
        <div className={styles.actionArea}>
          <div className={styles.buttonGroup}>
            <a 
              href="https://vizcachi.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.button}
              aria-label="Saber más sobre el proyecto Vizcachi"
            >
              Saber más
            </a>
            <a 
              href="https://forms.gle/cymNBNcjnDSRh1WS6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.secondaryButton}
              aria-label="Completar encuesta sobre la llegada de Vizcachi"
            >
              Llenar Encuesta
            </a>
          </div>
          <img 
            src="/gif_vizcachi/vizcachi.gif" 
            alt="Mascota Vizcachi animada" 
            className={styles.mascot} 
            loading="lazy" 
          />
        </div>
      </div>
    </section>
  );
}
