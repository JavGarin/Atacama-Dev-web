import React from 'react';
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

  return (
    <footer id="footer" className={styles.footer} role="contentinfo">
      {/* Línea decorativa superior roja */}
      <div className={styles.topBar} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Columna izquierda: logo + tagline */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoDot} aria-hidden="true" />
            <span className={styles.logoText}>
              <span>Atacama</span>
              <strong>Dev</strong>
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
          <h2 className={styles.colTitle}>Navegar</h2>
          <ul role="list" className={styles.navList}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.navLink}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna derecha: contacto */}
        <div className={styles.contact}>
          <h2 className={styles.colTitle}>Contacto</h2>
          <a
            href="mailto:contacto@atacamadev.cl"
            className={styles.email}
            aria-label="Enviar correo a Atacama Dev"
          >
            contacto.atacamadev@gmail.com
          </a>

          <ul className={styles.social} role="list" aria-label="Redes sociales">
            {SOCIAL_LINKS.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  className={styles.socialLink}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  aria-label={`Visitar ${label} de Atacama Dev`}
                >
                  {label}
                  {external && (
                    <span aria-hidden="true"> ↗</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
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
    </footer>
  );
}
