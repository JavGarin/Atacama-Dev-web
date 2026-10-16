import React, { useEffect, useState, useRef } from 'react';
import styles from './LegalModal.module.css';

const TABS = [
  { id: 'compliance', label: 'Aviso Legal & Compliance' },
  { id: 'privacy', label: 'Política de Privacidad' },
  { id: 'terms', label: 'Términos y Condiciones' },
  { id: 'cookies', label: 'Política de Cookies' },
];

export default function LegalModal({ isOpen, initialTab = 'compliance', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const modalRef = useRef(null);
  const bodyContentRef = useRef(null);

  // Sincronizar tab al abrir
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Al cambiar de tab, llevar scroll del contenido arriba
  useEffect(() => {
    if (bodyContentRef.current) {
      bodyContentRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  // Manejo de teclado (ESC para cerrar) y bloqueo de scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className={styles.modalSheet} ref={modalRef}>
        {/* Encabezado */}
        <div className={styles.header}>
          <div className={styles.headerTitleWrap}>
            <span className={styles.headerBadge}>Transparencia & Cumplimiento</span>
            <h2 id="legal-modal-title" className={styles.title}>
              Marco Legal y Normativo
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar ventana legal"
            title="Cerrar (ESC)"
          >
            ✕
          </button>
        </div>

        {/* Barra de pestañas */}
        <div className={styles.tabsBar} role="tablist" aria-label="Secciones legales">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cuerpo del Modal */}
        <div className={styles.bodyContent} ref={bodyContentRef}>
          {activeTab === 'compliance' && (
            <div className={styles.legalSection}>
              <h3 className={styles.sectionHeading}>Aviso Legal & Cumplimiento Normativo (Compliance)</h3>
              <p className={styles.paragraph}>
                <strong>ATACAMA DEV</strong> es una empresa chilena de consultoría y desarrollo de software orientada a la creación de aplicaciones web, plataformas digitales y sistemas a medida. Nuestra operación se fundamenta en principios estrictos de transparencia, seguridad de la información y cumplimiento legal riguroso tanto en Chile como en mercados internacionales.
              </p>

              <div className={styles.infoBadgeBox}>
                <strong>🏛️ Contratación Pública y Comercio Legal en Chile:</strong>
                <span>
                  ATACAMA DEV participa y se encuentra habilitada como proveedor en el sistema de compras públicas de Chile a través de <strong>Mercado Público / Compra Ágil</strong>, rigiéndose por la Ley N° 19.886 y normativas de probidad comercial vigentes.
                </span>
              </div>

              <h4 className={styles.sectionHeading}>Estándares de Ciberseguridad Activa</h4>
              <p className={styles.paragraph}>
                Implementamos arquitectura segura por diseño (<em>Security by Design</em>) siguiendo las recomendaciones internacionales del consorcio <strong>OWASP</strong> (Open Web Application Security Project):
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Protección contra ataques comunes:</strong> Sanitización estricta de entradas y prevención activa de vulnerabilidades XSS (Cross-Site Scripting), SQL Injection y ataques de inyección de código.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Cifrado y Comunicaciones Seguras:</strong> Todos nuestros despliegues operan exclusivamente bajo protocolos HTTPS con cifrado TLS 1.3 y certificados SSL de alta seguridad.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Protección en Capa de Servidor:</strong> Configuración de encabezados HTTP seguros (Content Security Policy, X-Frame-Options, X-Content-Type-Options) y control estricto de rate-limiting para mitigar abusos automatizados.
                </li>
              </ul>

              <h4 className={styles.sectionHeading}>Accesibilidad Web Universal (Inclusión Digital)</h4>
              <p className={styles.paragraph}>
                Garantizamos que nuestras soluciones digitales sean utilizables por todas las personas, respetando las normativas de accesibilidad:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Norma Local (Chile):</strong> Cumplimiento de los principios de la <strong>Ley N° 20.422</strong> sobre Igualdad de Oportunidades e Inclusión Social de Personas con Discapacidad.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Estándar Internacional:</strong> Pautas de Accesibilidad para el Contenido Web <strong>WCAG 2.1 Nivel AA</strong> (Web Content Accessibility Guidelines del W3C), asegurando contrastes adecuados, navegación total por teclado, semántica HTML5 pura y soporte para tecnologías de asistencia (lectores de pantalla).
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className={styles.legalSection}>
              <h3 className={styles.sectionHeading}>Política de Privacidad y Tratamiento de Datos</h3>
              <p className={styles.paragraph}>
                En <strong>ATACAMA DEV</strong> nos tomamos muy en serio la confidencialidad y protección de los datos de nuestros usuarios, clientes y visitantes. Esta política explica cómo recopilamos, protegemos y gestionamos la información personal.
              </p>

              <div className={styles.infoBadgeBox}>
                <strong>⚖️ Marco Regulatorio Aplicable:</strong>
                <span>
                  Tratamiento regulado bajo la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> (Chile) y armonizado con los principios del <strong>Reglamento General de Protección de Datos (GDPR)</strong> de la Unión Europea para clientes y proyectos globales.
                </span>
              </div>

              <h4 className={styles.sectionHeading}>Datos Recopilados y su Finalidad</h4>
              <p className={styles.paragraph}>
                Únicamente recopilamos los datos que el usuario nos facilita de manera voluntaria y consentida a través de nuestros canales de contacto o planificador de proyectos:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Información de Contacto:</strong> Nombre, dirección de correo electrónico y descripción del requerimiento de desarrollo o cotización.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Uso Exclusivo:</strong> Los datos se utilizan única y exclusivamente para responder consultas comerciales, elaborar presupuestos técnicos y mantener la relación profesional contratada.
                </li>
                <li className={styles.bulletItem}>
                  <strong>No Comercialización:</strong> ATACAMA DEV <u>nunca</u> vende, arrienda, cede ni transfiere datos personales a empresas de publicidad ni a terceros con fines de lucro.
                </li>
              </ul>

              <h4 className={styles.sectionHeading}>Derechos del Titular de los Datos (Derechos ARCO)</h4>
              <p className={styles.paragraph}>
                Conforme a la legislación vigente, todo usuario tiene derecho a solicitar el <strong>Acceso, Rectificación, Cancelación u Oposición</strong> respecto al tratamiento de sus datos personales. Para ejercer cualquiera de estos derechos, basta con enviar una solicitud a nuestro correo oficial: <strong>contacto.atacamadev@gmail.com</strong>.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className={styles.legalSection}>
              <h3 className={styles.sectionHeading}>Términos y Condiciones Generales de Servicio</h3>
              <p className={styles.paragraph}>
                Los presentes Términos regulan el acceso, uso de este sitio web y las directrices generales bajo las cuales <strong>ATACAMA DEV</strong> presta servicios profesionales de ingeniería de software, desarrollo frontend/backend y consultoría tecnológica.
              </p>

              <h4 className={styles.sectionHeading}>1. Prestación de Servicios de Desarrollo</h4>
              <p className={styles.paragraph}>
                Cada proyecto contratado se formaliza mediante una propuesta técnica detallada que especifica los requerimientos, hitos de entrega, plazos y costos acordados. ATACAMA DEV garantiza la entrega de código limpio, funcional y documentado conforme a las mejores prácticas de la industria.
              </p>

              <h4 className={styles.sectionHeading}>2. Propiedad Intelectual y Entregables</h4>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Transferencia de Derechos al Cliente:</strong> Una vez completado el pago de los servicios contratados, el cliente adquiere la titularidad y derechos patrimoniales sobre el código fuente a medida y los activos desarrollados específicamente para su proyecto.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Tecnologías Abiertas:</strong> Las dependencias, bibliotecas y herramientas de código abierto (Open Source) empleadas en los desarrollos se rigen por sus respectivas licencias públicas (MIT, Apache 2.0, BSD, etc.).
                </li>
                <li className={styles.bulletItem}>
                  <strong>Muestras de Portafolio:</strong> Salvo suscripción de acuerdo de confidencialidad (NDA) expreso, ATACAMA DEV se reserva el derecho de exhibir las soluciones creadas en su portafolio comercial como muestra técnica de capacidades profesionales.
                </li>
              </ul>

              <h4 className={styles.sectionHeading}>3. Garantía y Responsabilidad Técnica</h4>
              <p className={styles.paragraph}>
                Los proyectos cuentan con un periodo de garantía post-lanzamiento para corrección de bugs o inconsistencias atribuibles al código desarrollado. No nos hacemos responsables por fallas derivadas de manipulaciones no autorizadas de terceros, ataques de denegación de servicio a proveedores externos o caídas ajenas a nuestra infraestructura.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className={styles.legalSection}>
              <h3 className={styles.sectionHeading}>Política de Cookies y Almacenamiento Local</h3>
              <p className={styles.paragraph}>
                En <strong>ATACAMA DEV</strong> creemos firmemente en una web limpia, rápida y sin vigilancia invasiva. Por ello, aplicamos una estricta filosofía de <em>Zero-Tracking</em> publicitario.
              </p>

              <div className={styles.infoBadgeBox}>
                <strong>🛡️ Navegación Libre de Rastreos:</strong>
                <span>
                  Este sitio web <strong>no utiliza cookies de seguimiento publicitario</strong>, ni píxeles de remarketing (como Meta Pixel o Google Ads Remarketing), ni realiza perfilamiento de usuarios con fines de monetización publicitaria.
                </span>
              </div>

              <h4 className={styles.sectionHeading}>Almacenamiento Técnico Necesario (LocalStorage / SessionStorage)</h4>
              <p className={styles.paragraph}>
                El sitio puede emplear almacenamiento técnico en el navegador exclusivamente para optimizar su experiencia de usuario:
              </p>
              <ul className={styles.bulletList}>
                <li className={styles.bulletItem}>
                  <strong>Preferencias de Interfaz:</strong> Almacenar temporalmente estados visuales o preferencias de navegación sin identificar al usuario individual.
                </li>
                <li className={styles.bulletItem}>
                  <strong>Rendimiento de Carga:</strong> Caché de recursos locales (fuentes tipográficas locales self-hosted y assets optimizados) para asegurar una carga instantánea y reducir el consumo de datos móviles.
                </li>
              </ul>

              <h4 className={styles.sectionHeading}>Gestión y Control del Usuario</h4>
              <p className={styles.paragraph}>
                Cualquier usuario puede borrar el almacenamiento local o deshabilitar cookies directamente desde las herramientas de privacidad de su navegador (Chrome, Firefox, Safari, Edge). La navegación en este sitio seguirá funcionando con total normalidad.
              </p>
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div className={styles.modalFooter}>
          <span className={styles.modalFooterNote}>
            ATACAMA DEV · Chile — Estándares OWASP · Ley 19.628 · WCAG 2.1 AA
          </span>
          <button
            type="button"
            className={styles.acceptBtn}
            onClick={onClose}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
