import React, { useState } from 'react';
import { MorphIcon } from 'morphicons/react';
import { Plus, Minus } from 'lucide';
import styles from './Footer.module.css';
import LegalModal from './LegalModal.jsx';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/atacamadev.app/', external: true },
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
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState('compliance');

  const openLegalModal = (tab = 'compliance') => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  };

  const scrollToTop = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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

      {/* Título gigante brutalista tipo carrusel vertical clickeable para ir al Top */}
      <div
        className={styles.hugeTitleContainer}
        onClick={scrollToTop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToTop(e)}
        aria-label="Volver al inicio - Atacama Dev"
        title="Volver al inicio"
      >
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
            <a
              href="#hero"
              onClick={scrollToTop}
              className={styles.brandHeader}
              aria-label="Volver al inicio - Atacama Dev"
              title="Volver al inicio"
            >
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
            </a>
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
                src="/LogoChc.avif"
                alt="Mercado Público - Compra Ágil" 
                className={styles.govLogo} 
                loading="lazy"
                width="204"
                height="76"
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
                      <a
                        href={href}
                        className={styles.socialLink}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Franja de Cumplimiento Legal y Normativo (Dropdown Colapsable) ── */}
      <section className={styles.complianceBar} aria-label="Cumplimiento legal, seguridad y normativas">
        <div className={styles.complianceInner}>
          <button
            type="button"
            className={styles.complianceToggle}
            onClick={() => setComplianceOpen(!complianceOpen)}
            aria-expanded={complianceOpen}
            aria-controls="compliance-collapse-panel"
          >
            <div className={styles.complianceToggleMain}>
              <span className={styles.complianceBadge}>Transparencia & Seguridad</span>
              <div className={styles.complianceTitleRow}>
                <h3 className={styles.complianceTitle}>Cumplimiento Normativo (Compliance)</h3>
                <span className={styles.complianceSummaryText}>
                  Ciberseguridad OWASP · Privacidad Ley 19.628 & GDPR · WCAG 2.1 AA · Mercado Público
                </span>
              </div>
            </div>
            <div className={styles.complianceToggleAction}>
              <span className={styles.complianceToggleActionText}>
                {complianceOpen ? 'Ocultar' : 'Ver detalle y políticas'}
              </span>
              <MorphIcon
                icon={complianceOpen ? Minus : Plus}
                size={18}
                color="var(--gold)"
                strokeWidth={2.5}
              />
            </div>
          </button>

          <div
            id="compliance-collapse-panel"
            className={`${styles.complianceDropdownContent} ${complianceOpen ? styles.complianceOpen : ''}`}
          >
            <div className={styles.complianceExpandedGrid}>
              <div className={styles.complianceInfo}>
                <p className={styles.complianceDesc}>
                  <strong>ATACAMA DEV</strong> opera bajo rigurosos estándares de ciberseguridad activa, privacidad de datos y accesibilidad web universal, garantizando el cumplimiento estricto de la legislación comercial tanto en Chile como en el ámbito internacional.
                </p>
                <div className={styles.complianceTags} aria-label="Estándares de seguridad y cumplimiento">
                  <span className={styles.complianceTag}>🛡️ Ciberseguridad OWASP</span>
                  <span className={styles.complianceTag}>🔒 Privacidad Ley 19.628 & GDPR</span>
                  <span className={styles.complianceTag}>♿ Accesibilidad WCAG 2.1 AA & Ley 20.422</span>
                  <span className={styles.complianceTag}>🏛️ Mercado Público / Compra Ágil</span>
                </div>
              </div>

              <nav className={styles.complianceLinksWrap} aria-label="Enlaces legales y políticas">
                <span className={styles.complianceLinksLabel}>Documentación Legal:</span>
                <ul className={styles.complianceLinksList} role="list">
                  <li>
                    <button
                      type="button"
                      className={styles.legalLinkBtn}
                      onClick={() => openLegalModal('compliance')}
                      aria-haspopup="dialog"
                    >
                      <span>Aviso Legal & Compliance</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.legalLinkBtn}
                      onClick={() => openLegalModal('privacy')}
                      aria-haspopup="dialog"
                    >
                      <span>Política de Privacidad</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.legalLinkBtn}
                      onClick={() => openLegalModal('terms')}
                      aria-haspopup="dialog"
                    >
                      <span>Términos y Condiciones</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.legalLinkBtn}
                      onClick={() => openLegalModal('cookies')}
                      aria-haspopup="dialog"
                    >
                      <span>Política de Cookies</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {year}{' '}
          <button
            type="button"
            onClick={scrollToTop}
            className={styles.copyBrandLink}
            title="Volver arriba"
            aria-label="Volver arriba"
          >
            ATACAMA DEV
          </button>
          . Todos los derechos reservados.
        </p>
        <p className={styles.crafted} aria-hidden="true">
          Diseñado & construido por JavGarin ✦
        </p>
      </div>

      {/* Modal de Políticas Legales y Normativas */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={activeLegalTab}
        onClose={() => setLegalModalOpen(false)}
      />
    </footer>
  );
}
