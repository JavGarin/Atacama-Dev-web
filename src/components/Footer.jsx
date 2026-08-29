import React, { useState } from 'react';
import { MorphIcon } from 'morphicons/react';
import { Plus, Minus, Folder, ArrowUpRight } from 'lucide';
import styles from './Footer.module.css';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/JavGarin', external: true },
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
  const [copied, setCopied] = useState(false);
  const [githubHover, setGithubHover] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contacto.atacamadev@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
            <div className={styles.brandHeader}>
              <span className={styles.logoImageWrapper}>
                <img
                  src="/logo_1_transparente_ad.png"
                  alt="Atacama Dev Logo"
                  className={styles.logoImage}
                />
              </span>
              <span className={styles.brandTitleText}>
                Atacama Dev
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
              <span className={styles.govText}>ATACAMA DEV participa en</span>
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
              Navegar <MorphIcon icon={navOpen ? Minus : Plus} size={16} color="var(--gold)" strokeWidth={2.5} />
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
              Contacto <MorphIcon icon={contactOpen ? Minus : Plus} size={16} color="var(--gold)" strokeWidth={2.5} />
            </button>
            <div className={`${styles.dropdownContent} ${contactOpen ? styles.open : ''}`}>
              <div className={styles.contactHorizontal}>
                <button
                  onClick={handleCopyEmail}
                  className={styles.email}
                  aria-label="Copiar correo de contacto de Atacama Dev"
                  title="contacto.atacamadev@gmail.com"
                >
                  {copied ? '¡Copiado! ✓' : 'contacto.atacamadev@gmail.com'}
                </button>
                <ul className={styles.socialHorizontal} role="list" aria-label="Redes sociales">
                  {SOCIAL_LINKS.map(({ label, href, external }) => (
                    <li key={label}>
                      {label === 'GitHub' ? (
                        <a
                          href={href}
                          className={styles.socialLinkGithub}
                          onMouseEnter={() => setGithubHover(true)}
                          onMouseLeave={() => setGithubHover(false)}
                          aria-label="Visitar GitHub de Atacama Dev"
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          <span>GitHub</span>
                          <MorphIcon
                            icon={githubHover ? Folder : ArrowUpRight}
                            size={14}
                            color={githubHover ? 'var(--gold)' : 'rgba(10, 10, 10, 0.6)'}
                            strokeWidth={2}
                          />
                        </a>
                      ) : (
                        <a
                          href={href}
                          className={styles.socialLink}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {label}
                        </a>
                      )}
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
            © {year} ATACAMA DEV. Todos los derechos reservados.
          </p>
          <p className={styles.crafted} aria-hidden="true">
            Diseñado & construido por JavGarin ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
