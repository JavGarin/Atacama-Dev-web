import React, { useEffect, useRef, useState } from 'react';
import { MorphIcon } from 'morphicons/react';
import { Menu, X } from 'lucide';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Servicios', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contacto.atacamadev@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

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
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.open : ''}`}
      role="banner"
    >
      <nav className={styles.inner} aria-label="Navegación principal">
        {/* Logo */}
        <a href="#hero" className={styles.logo} aria-label="Atacama Dev — Inicio" onClick={() => setMenuOpen(false)}>
          <span className={styles.logoImageWrapper}>
            <img
              src="/icono-atacama-dev.png"
              alt="Atacama Dev"
              className={styles.logoImage}
            />
          </span>
        </a>

        {/* Botón hamburguesa móvil */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú de navegación"
        >
          <MorphIcon icon={menuOpen ? X : Menu} size={22} color="var(--black)" strokeWidth={2} />
        </button>

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

        {/* CTA — Copiar correo al portapapeles */}
        <button
          className={styles.cta}
          onClick={handleCopyEmail}
          aria-label="Copiar correo de contacto de Atacama Dev"
          title="contacto.atacamadev@gmail.com"
        >
          {copied ? '¡Copiado! ✓' : 'Contacto'}
        </button>
      </nav>

      {/* Menú Desplegable Móvil */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks} role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              className={styles.mobileCta}
              onClick={() => {
                handleCopyEmail();
                setMenuOpen(false);
              }}
              aria-label="Copiar correo de contacto de Atacama Dev"
            >
              {copied ? '¡Copiado! ✓' : 'Contacto'}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
