import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { learning } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';
import SectionHeader from './ui/SectionHeader';
import Reveal, { Stagger, StaggerItem } from './ui/Reveal';
import { ArrowUpRight, SparkIcon } from './ui/Icons';

/**
 * CURRENTLY LEVELLING UP
 *
 * Held apart from the Stack section on purpose. Mixing "learning" into
 * a skills grid is the single most common way a portfolio loses
 * credibility — it reads as padding. Isolated and labelled honestly, the
 * same information reads as self-awareness.
 *
 * The bars are progress *within a deliberate practice*, not a claim of
 * mastery, and they are labelled that way. Each fills on scroll.
 */
export default function Growth() {
  const section = useRef(null);
  const bars = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      bars.current.forEach((bar) => {
        if (bar) bar.style.transform = `scaleX(${bar.dataset.level})`;
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      bars.current.forEach((bar) => {
        if (!bar) return;
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: Number(bar.dataset.level),
            duration: 1.6,
            ease: 'expo.out',
            scrollTrigger: { trigger: bar, start: 'top 88%', once: true },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="growth" ref={section} className="section-pad relative z-10">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Growth"
          title="What I'm levelling up right now."
          lead="Kept separate from the stack above deliberately. These are active, in-progress disciplines — the honest edge of what I can do."
        />

        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-7">
          {learning.map((item, i) => (
            <Reveal
              key={item.id}
              className="group relative overflow-hidden rounded-2xl"
              y={38}
              delay={i * 0.1}
            >
              {/* Live badge treatment: the glow is the point of difference
                  between this section and the static Stack cards. */}
              <div className="glass glass-hover relative h-full p-7 sm:p-9">
                <div className="bg-grid-fine pointer-events-none absolute inset-0 opacity-30" />
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-60 transition-opacity duration-700 ease-expo group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(10,122,79,0.08), transparent 68%)',
                  }}
                />

                <div className="relative flex items-start justify-between gap-5">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(10,122,79,0.25)] bg-[rgba(10,122,79,0.06)] px-3 py-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-70 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                      </span>
                      <span className="font-mono text-2xs uppercase tracking-[0.18em] text-signal">
                        In progress
                      </span>
                    </span>

                    <h3 className="fluid-h3 mt-5 font-display text-bone">{item.title}</h3>

                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="hover"
                        className="group/link mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs text-haze transition-colors duration-300 hover:text-signal"
                      >
                        {item.handle}
                        <ArrowUpRight className="text-sm transition-transform duration-500 ease-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    ) : (
                      <p className="mt-2.5 font-mono text-xs text-dim">{item.handle}</p>
                    )}
                  </div>

                  <SparkIcon className="shrink-0 text-2xl text-signal opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <p className="relative mt-6 text-[0.9375rem] leading-relaxed text-haze">
                  {item.blurb}
                </p>

                {/* Progress readout */}
                <div className="relative mt-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="readout">Deliberate practice</span>
                    <span className="font-mono text-2xs tracking-[0.16em] text-signal">
                      {Math.round(item.level * 100)}%
                    </span>
                  </div>
                  <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-[rgba(10,122,79,0.1)]">
                    <div
                      ref={(el) => {
                        bars.current[i] = el;
                      }}
                      data-level={item.level}
                      className="h-full origin-left rounded-full bg-signal-grad"
                      style={{
                        transform: 'scaleX(0)',
                        boxShadow: '0 0 8px rgba(10,122,79,0.35)',
                      }}
                    />
                  </div>
                </div>

                <Stagger className="relative mt-7 flex flex-wrap gap-2" stagger={0.05}>
                  {item.focus.map((f) => (
                    <StaggerItem key={f} as="span" className="chip" y={12}>
                      {f}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
