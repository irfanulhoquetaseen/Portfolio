import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/**
 * Magnetic hover: the element leans toward the cursor while the
 * pointer is inside it, and springs back on exit. Uses gsap.quickTo
 * so each frame is a cached setter rather than a fresh tween.
 *
 * Returns a ref to attach to the element you want magnetised.
 */
export default function useMagnetic({ strength = 0.3, textStrength = 0, disabled = false } = {}) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return undefined;

    // Coarse pointers have no hover state to respond to.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const config = { duration: 0.5, ease: 'power3.out' };
    const toX = gsap.quickTo(el, 'x', config);
    const toY = gsap.quickTo(el, 'y', config);

    const inner = innerRef.current;
    const innerX = inner ? gsap.quickTo(inner, 'x', config) : null;
    const innerY = inner ? gsap.quickTo(inner, 'y', config) : null;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      toX(dx * strength);
      toY(dy * strength);
      if (innerX && textStrength) {
        innerX(dx * textStrength);
        innerY(dy * textStrength);
      }
    };

    const onLeave = () => {
      toX(0);
      toY(0);
      if (innerX) {
        innerX(0);
        innerY(0);
      }
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(el);
      if (inner) gsap.killTweensOf(inner);
    };
  }, [strength, textStrength, disabled]);

  return { ref, innerRef };
}
