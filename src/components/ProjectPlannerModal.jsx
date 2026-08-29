import React, { useState, useEffect, useRef } from 'react';
import styles from './ProjectPlannerModal.module.css';

const PROJECT_TYPES = [
  {
    id: 'web',
    title: 'Plataforma / Sitio Web',
    desc: 'Experiencias web modernas, landings de alto impacto y sitios corporativos.',
    icon: '🌐'
  },
  {
    id: 'software',
    title: 'Software a Medida / SaaS',
    desc: 'Sistemas web personalizados, paneles de control, automatización y APIs.',
    icon: '⚡'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Pagos',
    desc: 'Tiendas online con integración de pasarelas de pago (Webpay, Stripe).',
    icon: '🛒'
  },
  {
    id: 'mercadopublico',
    title: 'Mercado Público / Compra Ágil',
    desc: 'Desarrollo y consultoría técnica para licitaciones y sector público.',
    icon: '🏛️'
  }
];

const PROJECT_STAGES = [
  {
    id: 'idea',
    title: 'Idea desde cero',
    desc: 'Tengo un concepto y busco asesoría técnica, arquitectura y desarrollo completo.',
    icon: '💡'
  },
  {
    id: 'specs',
    title: 'Requerimientos o Diseño listos',
    desc: 'Cuento con wireframes o especificaciones y necesito el equipo de desarrollo.',
    icon: '📐'
  },
  {
    id: 'upgrade',
    title: 'Sistema existente a mejorar',
    desc: 'Tengo un software o web actual que requiere rediseño, optimización o nuevas funciones.',
    icon: '🔄'
  }
];

export default function ProjectPlannerModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id);
  const [selectedStage, setSelectedStage] = useState(PROJECT_STAGES[0].id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const modalRef = useRef(null);

  // Bloquear scroll de fondo y capturar tecla ESC
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

  // Reset al abrir
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSubmitted(false);
      setIsSending(false);
      setSendSuccess(false);
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTypeObj = PROJECT_TYPES.find((t) => t.id === selectedType);
  const currentStageObj = PROJECT_STAGES.find((s) => s.id === selectedStage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmitProposal();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // Construir mensaje estructurado
  const getStructuredProposal = () => {
    return `✦ PROPUESTA DE PROYECTO — ATACAMA DEV
------------------------------------------
• Tipo de Solución: ${currentTypeObj?.title || 'No especificado'}
• Estado de la Idea: ${currentStageObj?.title || 'No especificado'}
• Contacto: ${formData.name || 'Cliente'} (${formData.email || 'Sin email'})
• Teléfono/WhatsApp: ${formData.phone || 'No especificado'}

• Descripción de la Idea:
${formData.description || 'Sin detalles adicionales.'}`;
  };

  // Enviar propuesta automáticamente por HTTP a contacto.atacamadev@gmail.com
  const handleSubmitProposal = async () => {
    setIsSending(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/contacto.atacamadev@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `✦ Nueva Propuesta: ${currentTypeObj?.title || 'Proyecto'} — ${formData.name}`,
          Cliente: formData.name,
          Email: formData.email,
          Telefono_WhatsApp: formData.phone || 'No especificado',
          Tipo_de_Solucion: currentTypeObj?.title,
          Etapa_del_Proyecto: currentStageObj?.title,
          Descripcion: formData.description || 'Sin descripción adicional',
          _template: 'table'
        })
      });

      if (response.ok) {
        setSendSuccess(true);
      } else {
        setSendSuccess(false);
      }
    } catch (err) {
      console.warn('Envío HTTP fallido, habilitando modo directo:', err);
      setSendSuccess(false);
    } finally {
      setIsSending(false);
      setIsSubmitted(true);
    }
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Propuesta de Proyecto: ${currentTypeObj?.title || 'Nuevo Proyecto'} — ${formData.name || 'Cliente'}`);
    const body = encodeURIComponent(getStructuredProposal());
    window.location.href = `mailto:contacto.atacamadev@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(getStructuredProposal());
    // Enlace a WhatsApp Web / App
    window.open(`https://wa.me/56900000000?text=${text}`, '_blank');
  };

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(getStructuredProposal()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const canProceedStep3 = formData.name.trim() !== '' && formData.email.trim() !== '';

  return (
    <div 
      className={styles.overlay} 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalSheet} ref={modalRef}>
        {/* Encabezado del Modal */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.badgeStep}>
              {!isSubmitted ? `Paso ${step} de 3` : '✓ Listo'}
            </span>
            <h2 id="modal-title" className={styles.title}>
              {!isSubmitted ? 'Iniciar Propuesta de Proyecto' : '¡Propuesta Lista para Enviar!'}
            </h2>
          </div>
          <button 
            type="button" 
            className={styles.closeButton} 
            onClick={onClose}
            aria-label="Cerrar ventana"
          >
            ✕
          </button>
        </div>

        {/* Barra de progreso visual */}
        {!isSubmitted && (
          <div className={styles.progressBarTrack} aria-hidden="true">
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Contenido según el paso */}
        <div className={styles.body}>
          {!isSubmitted ? (
            <>
              {/* PASO 1: Tipo de Solución */}
              {step === 1 && (
                <div className={styles.stepContent}>
                  <p className={styles.stepSubtitle}>
                    ¿Qué tipo de solución o software necesita tu idea?
                  </p>
                  <div className={styles.gridOptions}>
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                          onClick={() => setSelectedType(type.id)}
                        >
                          <span className={styles.optionIcon}>{type.icon}</span>
                          <div className={styles.optionText}>
                            <h3 className={styles.optionTitle}>{type.title}</h3>
                            <p className={styles.optionDesc}>{type.desc}</p>
                          </div>
                          <span className={styles.checkbox}>
                            {isSelected && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 2: Estado del Proyecto */}
              {step === 2 && (
                <div className={styles.stepContent}>
                  <p className={styles.stepSubtitle}>
                    ¿En qué etapa se encuentra actualmente tu proyecto?
                  </p>
                  <div className={styles.gridOptions}>
                    {PROJECT_STAGES.map((stage) => {
                      const isSelected = selectedStage === stage.id;
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ''}`}
                          onClick={() => setSelectedStage(stage.id)}
                        >
                          <span className={styles.optionIcon}>{stage.icon}</span>
                          <div className={styles.optionText}>
                            <h3 className={styles.optionTitle}>{stage.title}</h3>
                            <p className={styles.optionDesc}>{stage.desc}</p>
                          </div>
                          <span className={styles.checkbox}>
                            {isSelected && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PASO 3: Descripción de la idea y datos de contacto */}
              {step === 3 && (
                <div className={styles.stepContent}>
                  <p className={styles.stepSubtitle}>
                    Cuéntanos brevemente sobre tu idea y cómo podemos contactarte.
                  </p>
                  <div className={styles.formGroup}>
                    <label htmlFor="planner-desc" className={styles.label}>
                      Descripción de la idea o requerimientos
                    </label>
                    <textarea
                      id="planner-desc"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Ej: Necesito una plataforma para conectar usuarios con proveedores locales..."
                      className={styles.textarea}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="planner-name" className={styles.label}>
                        Tu nombre o Empresa <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="text"
                        id="planner-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="planner-email" className={styles.label}>
                        Correo electrónico <span className={styles.required}>*</span>
                      </label>
                      <input
                        type="email"
                        id="planner-email"
                        name="email"
                        required
                        inputMode="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="planner-phone" className={styles.label}>
                      Teléfono / WhatsApp <span className={styles.optional}>(Opcional)</span>
                    </label>
                    <input
                      type="tel"
                      id="planner-phone"
                      name="phone"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+56 9 1234 5678"
                      className={styles.input}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            /* PASO 4: Éxito & Confirmación de envío */
            <div className={styles.successContainer}>
              <div className={styles.successIconBadge}>
                {sendSuccess ? '✓' : '✦'}
              </div>
              <h3 className={styles.successTitle}>
                {sendSuccess ? '¡Propuesta enviada exitosamente!' : '¡Propuesta lista para enviar!'}
              </h3>
              <p className={styles.successDesc}>
                {sendSuccess ? (
                  <>
                    Hemos recibido automáticamente tu propuesta para <strong>{currentTypeObj?.title}</strong> enviada a <strong>contacto.atacamadev@gmail.com</strong>. Te responderemos a <strong>{formData.email}</strong> a la brevedad.
                  </>
                ) : (
                  <>
                    Hemos estructurado tu idea para <strong>{currentTypeObj?.title}</strong>. Puedes enviárnosla directamente por correo o copiar la propuesta:
                  </>
                )}
              </p>

              <div className={styles.actionButtonsSuccess}>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className={styles.btnPrimarySuccess}
                >
                  ✉ Abrir cliente de Correo (contacto.atacamadev@gmail.com)
                </button>
                <button
                  type="button"
                  onClick={handleCopyProposal}
                  className={styles.btnSecondarySuccess}
                >
                  {copied ? '✓ ¡Copiado al portapapeles!' : '📋 Copiar Resumen de la Propuesta'}
                </button>
              </div>

              <div className={styles.summaryBox}>
                <span className={styles.summaryLabel}>Resumen de tu solicitud:</span>
                <pre className={styles.summaryText}>{getStructuredProposal()}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer con botones de navegación */}
        {!isSubmitted && (
          <div className={styles.footer}>
            {step > 1 ? (
              <button 
                type="button" 
                onClick={handlePrev} 
                disabled={isSending}
                className={styles.btnBack}
              >
                ← Atrás
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={(step === 3 && !canProceedStep3) || isSending}
              className={styles.btnNext}
            >
              {isSending ? 'Enviando Propuesta...' : step === 3 ? 'Enviar Propuesta ✦' : 'Continuar →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
