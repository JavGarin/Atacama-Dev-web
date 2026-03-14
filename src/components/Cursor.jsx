import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Cursor.module.css';

/**
 * Cursor personalizado brutalista — cuadrado rojo.
 * Se monta en App.jsx para cubrir toda la web.
 */
export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* Ocultar cursor nativo solo en escritorio */
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    document.documentElement.classList.add('cursor-hidden');

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      /* Punto: muy rápido */
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.12,
        ease: 'power3.out',
      });

      /* Anillo: lag suave */
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.45,
        ease: 'power2.out',
      });
    };

    /* Ampliar anillo al pasar sobre links/botones */
    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0,   duration: 0.2 });
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    /* Ocultar cuando sale de la ventana */
    const onLeaveWindow = () =>
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    const onEnterWindow = () =>
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseenter', onEnterWindow);

    const interactives = document.querySelectorAll('a, button, [role="button"], label, input, textarea, select');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    /* MutationObserver para nuevos elementos interactivos */
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.documentElement.classList.remove('cursor-hidden');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseenter', onEnterWindow);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Punto rojo */}
      <div ref={dotRef}  className={styles.dot}  aria-hidden="true" />
      {/* Anillo cuadrado */}
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
