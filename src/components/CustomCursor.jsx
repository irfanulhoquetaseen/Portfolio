import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import usePointerFine from '../hooks/usePointerFine';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Custom cursor: a fast dot and a ring that trails it.
 *
 * Interactive elements opt in with data-cursor="hover" (or "view" to
 * also show a label from data-cursor-label). The ring dilates over
 * them, which gives the whole page a consistent hover language.
 *
 * Only mounts on devices with a real hovering pointer, and never when
 * reduced motion is requested — the native cursor is left alone.
 */
export default function CustomCursor() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    document.documentElement.classList.add('has-custom-cursor');

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

    let hovering = false;
    let shown = false;

    const onMove = (e) => {
      // Local flag, not the `visible` state: reading state here would
      // capture a stale value and fire a setState on every single move.
      if (!shown) {
        shown = true;
        setVisible(true);
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target instanceof Element ? e.target.closest('[data-cursor]') : null;
      const mode = target ? target.getAttribute('data-cursor') : null;
      const next = Boolean(mode);

      if (next !== hovering) {
        hovering = next;
        gsap.to(ring, {
          scale: next ? 2.5 : 1,
          borderColor: next ? 'rgba(10,122,79,0.85)' : 'rgba(10,122,79,0.35)',
          backgroundColor: next ? 'rgba(10,122,79,0.08)' : 'rgba(10,122,79,0)',
          duration: 0.45,
          ease: 'power3.out',
        });
        gsap.to(dot, { scale: next ? 0 : 1, duration: 0.35, ease: 'power3.out' });
      }

      const nextLabel = mode === 'view' && target ? target.getAttribute('data-cursor-label') || '' : '';
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => {
      shown = true;
      setVisible(true);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('has-custom-cursor');
      gsap.killTweensOf([dot, ring]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[300] hidden lg:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 250ms ease' }}
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border will-change-transform"
        style={{
          marginLeft: '-18px',
          marginTop: '-18px',
          borderColor: 'rgba(10,122,79,0.35)',
          backgroundColor: 'rgba(10,122,79,0)',
        }}
      >
        {label ? (
          <span className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.14em] text-signal">
            {label}
          </span>
        ) : null}
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-signal will-change-transform"
        style={{ marginLeft: '-3px', marginTop: '-3px' }}
      />
    </div>
  );
}
