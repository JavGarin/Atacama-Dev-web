import React, { useState } from 'react';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/atacamadev', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/atacamadev', external: true },
  { label: 'Instagram', href: 'https://instagram.com/atacamadev', external: true },
];

const NAV_LINKS = [
  { label: 'Servicios', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Inicio', href: '#hero' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer id="footer" className={styles.footer} role="contentinfo">
      {/* Línea decorativa superior roja */}
      <div className={styles.topBar} aria-hidden="true" />

      {/* Título gigante brutalista tipo carrusel vertical */}
      <div className={styles.hugeTitleContainer} aria-hidden="true">
        <div className={styles.marqueeVertical}>
          {/* Duplicamos para el efecto infinito */}
          <div className={styles.marqueeItem}>
            <span className={styles.hugeTitleMain}>ATACAMA</span>
            <span className={styles.hugeTitleAccent}>DEV</span>
          </div>
          <div className={styles.marqueeItem}>
            <span className={styles.hugeTitleMain}>ATACAMA</span>
            <span className={styles.hugeTitleAccent}>DEV</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.inner}>
          {/* Columna izquierda: logo + tagline */}
          <div className={styles.brand}>
            <div className={styles.logoOnly}>
              <span className={styles.logoImageWrapper}>
                <img
                  src="/atacama_log.png"
                  alt="Atacama Dev Logo"
                  className={styles.logoImage}
                />
              </span>
            </div>
            <p className={styles.tagline}>
              Potenciamos tu idea.<br />
              Desarrollo web & software a medida.
            </p>
            <address className={styles.location}>
              <span aria-label="Ubicación">📍 Chile — Disponible para proyectos remotos</span>
            </address>

            {/* Mercado Público / Compra Ágil */}
            <div className={styles.govBadge}>
              <span className={styles.govText}>Atacama Dev participa en</span>
              <img 
                src="/LogoChc.png" 
                alt="Mercado Público - Compra Ágil" 
                className={styles.govLogo} 
                loading="lazy"
              />
            </div>
          </div>

          {/* Columna centro: navegación */}
          <nav className={styles.nav} aria-label="Navegación del footer">
            <button 
              className={styles.dropdownToggle} 
              onClick={() => setNavOpen(!navOpen)}
              aria-expanded={navOpen}
            >
              Navegar <span className={styles.toggleIcon}>{navOpen ? '—' : '+'}</span>
            </button>
            <div className={`${styles.dropdownContent} ${navOpen ? styles.open : ''}`}>
              <ul role="list" className={styles.navListHorizontal}>
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href} className={styles.navLink}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Columna derecha: contacto */}
          <div className={styles.contact}>
            <button 
              className={styles.dropdownToggle} 
              onClick={() => setContactOpen(!contactOpen)}
              aria-expanded={contactOpen}
            >
              Contacto <span className={styles.toggleIcon}>{contactOpen ? '—' : '+'}</span>
            </button>
            <div className={`${styles.dropdownContent} ${contactOpen ? styles.open : ''}`}>
              <div className={styles.contactHorizontal}>
                <a
                  href="mailto:contacto@atacamadev.cl"
                  className={styles.email}
                  aria-label="Enviar correo a Atacama Dev"
                >
                  contacto.atacamadev@gmail.com
                </a>
                <ul className={styles.socialHorizontal} role="list" aria-label="Redes sociales">
                  {SOCIAL_LINKS.map(({ label, href, external }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className={styles.socialLink}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {year} Atacama Dev. Todos los derechos reservados.
          </p>
          <p className={styles.crafted} aria-hidden="true">
            Diseñado & construido por JavGarin ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
