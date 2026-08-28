import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Ambient background.
 *
 * Three fixed layers that move at different rates as the page
 * scrolls: a coarse engineering grid, a fine grid, and two soft
 * signal blooms. This is the site's parallax spine — because the
 * layers are fixed and only transform, it costs nothing per frame
 * beyond a compositor translate.
 */
export default function AmbientBackground() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      // Layers drift upward at different speeds relative to the page.
      gsap.to('[data-parallax="grid-coarse"]', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: true },
      });
      gsap.to('[data-parallax="grid-fine"]', {
        yPercent: -26,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: true },
      });
      gsap.to('[data-parallax="bloom-a"]', {
        yPercent: 42,
        xPercent: -8,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 1.2 },
      });
      gsap.to('[data-parallax="bloom-b"]', {
        yPercent: -34,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 1.6 },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void"
    >
      <div
        data-parallax="grid-coarse"
        className="bg-grid absolute -inset-y-[20%] inset-x-0 opacity-70"
      />
      <div
        data-parallax="grid-fine"
        className="bg-grid-fine absolute -inset-y-[25%] inset-x-0 opacity-40"
      />

      <div
        data-parallax="bloom-a"
        className="absolute -left-[15%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(10,122,79,0.07) 0%, rgba(10,122,79,0) 65%)',
        }}
      />
      <div
        data-parallax="bloom-b"
        className="absolute -right-[20%] top-[45%] h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(13,156,94,0.05) 0%, rgba(13,156,94,0) 60%)',
        }}
      />

      {/* Vignette keeps the eye in the centre column. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, rgba(250,250,248,0) 50%, rgba(235,242,238,0.5) 100%)',
        }}
      />
    </div>
  );
}
