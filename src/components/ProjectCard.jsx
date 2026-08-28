import { useCallback, useRef } from 'react';
import { gsap } from '../lib/gsap';
import useReducedMotion from '../hooks/useReducedMotion';
import usePointerFine from '../hooks/usePointerFine';
import Reveal from './ui/Reveal';
import ProjectMotif from './ProjectMotif';
import { ArrowUpRight } from './ui/Icons';

/**
 * PROJECT CARD
 *
 * Four hover layers, each doing one job:
 *   1. tilt      — the card leans toward the cursor (rotateX/Y + depth)
 *   2. spotlight — a glow follows the pointer across the surface
 *   3. scanline   — a single sweep confirms the card "woke up"
 *   4. motif      — the diagram comes alive (links flow, nodes pulse)
 *
 * Tilt is written with gsap.quickTo so pointer moves never queue up a
 * new tween per frame, and the whole thing is disabled on touch
 * devices and under prefers-reduced-motion.
 */
export default function ProjectCard({ project, index }) {
  const card = useRef(null);
  const inner = useRef(null);
  const glow = useRef(null);
  const setters = useRef(null);

  const reduced = useReducedMotion();
  const fine = usePointerFine();
  const interactive = fine && !reduced;

  const getSetters = useCallback(() => {
    if (!setters.current && inner.current) {
      setters.current = {
        rx: gsap.quickTo(inner.current, 'rotationX', { duration: 0.6, ease: 'power3.out' }),
        ry: gsap.quickTo(inner.current, 'rotationY', { duration: 0.6, ease: 'power3.out' }),
        z: gsap.quickTo(inner.current, 'z', { duration: 0.6, ease: 'power3.out' }),
      };
    }
    return setters.current;
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (!interactive || !card.current) return;

      const r = card.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      const s = getSetters();
      if (s) {
        // Max 6deg — enough to read as physical, not enough to distort text.
        s.ry((px - 0.5) * 12);
        s.rx((0.5 - py) * 8);
        s.z(28);
      }

      // Gradient position is a paint-only change, so it is written
      // straight to style; opacity is left to a CSS transition.
      if (glow.current) {
        glow.current.style.background = `radial-gradient(440px circle at ${px * 100}% ${
          py * 100
        }%, rgba(10,122,79,0.08), transparent 70%)`;
        glow.current.style.opacity = '1';
      }
    },
    [interactive, getSetters],
  );

  const handleLeave = useCallback(() => {
    if (!interactive) return;
    const s = getSetters();
    if (s) {
      s.rx(0);
      s.ry(0);
      s.z(0);
    }
    if (glow.current) glow.current.style.opacity = '0';
  }, [interactive, getSetters]);

  return (
    <Reveal
      className="group relative"
      y={44}
      delay={index * 0.07}
      amount={0.15}
      style={{ perspective: 1400 }}
    >
      <div
        ref={card}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={inner}
          className="glass relative overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-700 ease-expo group-hover:border-[rgba(10,122,79,0.35)] group-hover:shadow-[0_0_0_1px_rgba(10,122,79,0.1),0_30px_70px_-30px_rgba(10,122,79,0.22)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Pointer spotlight */}
          <div
            ref={glow}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 ease-expo"
          />

          {/* Single scan sweep on hover */}
          <div
            aria-hidden="true"
            className="scanline pointer-events-none absolute inset-x-0 top-0 z-20 h-24"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,122,79,0) 0%, rgba(10,122,79,0.07) 55%, rgba(10,122,79,0) 100%)',
            }}
          />

          <div className="relative grid lg:grid-cols-12">
            {/* ---------- Diagram panel ---------- */}
            <div className="relative order-1 border-b border-[rgba(10,122,79,0.1)] bg-[rgba(247,250,248,0.6)] lg:order-none lg:col-span-5 lg:border-b-0 lg:border-r">
              <div className="bg-grid-fine pointer-events-none absolute inset-0 opacity-50" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(120% 90% at 50% 110%, rgba(10,122,79,0.08), transparent 62%)',
                }}
              />

              <div className="relative flex h-full min-h-[220px] items-center justify-center p-6 sm:min-h-[260px] sm:p-8">
                <div className="w-full max-w-[420px] opacity-70 transition-opacity duration-700 ease-expo group-hover:opacity-100">
                  <ProjectMotif motif={project.motif} />
                </div>
              </div>

              {/* Corner registration marks — engineering-drawing detail. */}
              <span
                aria-hidden="true"
                className="absolute left-4 top-4 h-3 w-3 border-l border-t border-[rgba(10,122,79,0.3)]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-[rgba(10,122,79,0.3)]"
              />
            </div>

            {/* ---------- Text panel ---------- */}
            <div className="order-2 flex flex-col p-7 sm:p-9 lg:order-none lg:col-span-7 lg:p-10">
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <span className="readout text-signal">
                    {project.index}
                    <span className="text-haze"> — {project.subtitle}</span>
                  </span>
                  <h3 className="fluid-h3 mt-3 font-display text-bone">{project.name}</h3>
                </div>
                <span className="chip shrink-0">{project.year}</span>
              </div>

              <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-haze sm:text-base">
                {project.summary}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between gap-6 border-t border-[rgba(10,122,79,0.12)] pt-6 lg:mt-auto">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="view"
                  data-cursor-label="Repo"
                  className="group/link inline-flex items-center gap-2.5 font-mono text-2xs uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:text-signal"
                >
                  <span className="relative">
                    View on GitHub
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-expo group-hover/link:scale-x-100" />
                  </span>
                  <ArrowUpRight className="text-base text-signal transition-transform duration-500 ease-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>

                <span className="readout hidden shrink-0 sm:block">Source available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
