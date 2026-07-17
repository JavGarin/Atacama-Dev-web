import React, { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Servicios', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#footer' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <nav className={styles.inner} aria-label="Navegación principal">
        {/* Logo */}
        <a href="#hero" className={styles.logo} aria-label="Atacama Dev — Inicio">
          <span className={styles.logoImageWrapper}>
            <img
              src="/atacama_log.png"
              alt="Atacama Dev"
              className={styles.logoImage}
            />
          </span>
          <span className={styles.logoText}>
            <span>Atacama</span>
            <strong>Dev</strong>
          </span>
        </a>

        {/* Links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA -->*/}
        <a
          href="mailto:contacto@atacamadev.cl"
          className={styles.cta}
          aria-label="Iniciar un proyecto con Atacama Dev"
        >
          Hablemos
        </a>
      </nav>
    </header>
  );
}
