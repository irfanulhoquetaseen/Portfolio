import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { about, profile } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';
import SectionHeader from './ui/SectionHeader';
import Reveal, { Stagger, StaggerItem } from './ui/Reveal';
import Monogram from './ui/Monogram';
import { MailIcon, PinIcon } from './ui/Icons';

export default function About() {
  const section = useRef(null);
  const portrait = useRef(null);
  const reduced = useReducedMotion();

  // The portrait column drifts against the prose as you scroll —
  // desktop only, where there are two columns to play off each other.
  useEffect(() => {
    if (reduced) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        portrait.current,
        { y: 44 },
        {
          y: -44,
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="about" ref={section} className="section-pad relative z-10">
      <div className="shell">
        <SectionHeader index="01" label="About" title={about.lead} />

        <div className="mt-14 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Portrait + hard facts */}
          <div className="lg:col-span-5">
            <div ref={portrait}>
              <Reveal className="glass glass-hover relative overflow-hidden rounded-2xl p-7 sm:p-9" y={36}>
                <div className="bg-grid-fine pointer-events-none absolute inset-0 opacity-40" />

                <div className="relative flex flex-col items-start gap-7 sm:flex-row sm:items-center">
                  {/*
                    PROFILE PHOTO SLOT
                    Save your square photo to public/profile.jpg and it
                    replaces the monogram automatically.
                  */}
                  <Monogram size={132} />

                  <div className="min-w-0">
                    <p className="readout">Portfolio owner</p>
                    <h3 className="fluid-h3 mt-2 break-words font-display text-bone">
                      {profile.name}
                    </h3>
                    <p className="mt-2 font-mono text-2xs uppercase tracking-[0.14em] text-signal">
                      {profile.title}
                    </p>
                  </div>
                </div>

                <dl className="relative mt-8 border-t border-[rgba(10,122,79,0.12)]">
                  {about.facts.map((f) => (
                    <div
                      key={f.k}
                      className="flex flex-col gap-1 border-b border-[rgba(10,122,79,0.09)] py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <dt className="readout shrink-0">{f.k}</dt>
                      <dd className="text-sm text-bone sm:text-right">{f.v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="relative mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <span className="inline-flex items-center gap-2 text-sm text-haze">
                    <PinIcon className="text-base text-signal" />
                    {profile.location}
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="hover"
                    className="inline-flex items-center gap-2 text-sm text-haze transition-colors duration-300 hover:text-signal"
                  >
                    <MailIcon className="text-base text-signal" />
                    {profile.email}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Prose */}
          <div className="lg:col-span-7 lg:pt-2">
            <Stagger className="space-y-6" stagger={0.14}>
              {about.paragraphs.map((p, i) => (
                <StaggerItem key={i} as="p" className="text-[1.0625rem] leading-[1.75] text-haze sm:text-lg">
                  {i === 0 ? (
                    <span className="text-bone">{p}</span>
                  ) : (
                    p
                  )}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-10 flex flex-wrap gap-2" delay={0.2}>
              {['Depth over breadth', 'Ship, then refine', 'Read the constraint first'].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
