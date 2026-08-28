import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { roadmap } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import { BranchIcon } from './ui/Icons';

/**
 * CAREER ROADMAP — the pinned section.
 *
 * On desktop the section pins and the trajectory scrubs sideways:
 * vertical scrolling becomes forward movement along the path, which is
 * the point — a career is traversed, not listed. The spine fills, the
 * stage counter advances, and the Game Dev panel forks off the trunk
 * as a parallel track rather than a fourth step.
 *
 * Below 1024px the same markup lays out as a vertical timeline. No
 * pinning, no horizontal scroll — on a phone that fights the user.
 */
export default function Roadmap() {
  const section = useRef(null);
  const track = useRef(null);
  const fill = useRef(null);
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const el = track.current;
      if (!el) return undefined;

      // Read live so a window resize recomputes the travel distance.
      const distance = () => Math.max(0, el.scrollWidth - window.innerWidth);

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (fill.current) gsap.set(fill.current, { scaleX: self.progress });
            const idx = Math.min(
              roadmap.length - 1,
              Math.floor(self.progress * roadmap.length + 0.001),
            );
            setStage((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      return () => tween.kill();
    });

    // The panels are wide and the fonts arrive late; one deferred
    // refresh keeps the pin distance honest.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
  }, [reduced]);

  return (
    <section
      id="journey"
      ref={section}
      className="relative z-10 overflow-hidden lg:flex lg:h-[100svh] lg:flex-col lg:justify-center"
    >
      <div className="section-pad w-full lg:py-0">
        <div className="shell">
          <SectionHeader
            index="02"
            label="Journey"
            title="A trajectory, not a wish list."
            lead="Three stages on the trunk, one deliberate branch. Each stage exists because the one before it makes it possible."
          />

          {/* Desktop-only progress spine + live stage readout */}
          <div className="mt-8 hidden items-center gap-5 lg:flex">
            <span className="readout shrink-0 text-signal">
              {roadmap[stage]?.branch ? '↳' : roadmap[stage]?.index}
              <span className="text-haze"> / 03</span>
            </span>
            <div className="relative h-px flex-1 bg-[rgba(10,122,79,0.13)]">
              <div
                ref={fill}
                className="h-px origin-left bg-signal-grad"
                style={{ transform: 'scaleX(0)', boxShadow: '0 0 8px rgba(10,122,79,0.4)' }}
              />
            </div>
            <span className="readout shrink-0">{roadmap[stage]?.title}</span>
          </div>
        </div>

        {/* TRACK — horizontal on desktop, stacked below it */}
        <div
          ref={track}
          className="mt-10 flex flex-col gap-6 lg:w-max lg:flex-row lg:items-start lg:gap-8"
          style={{ paddingInline: 'var(--gutter)' }}
        >
          {roadmap.map((item, i) => {
            const active = stage === i;

            return (
              <Reveal
                key={item.id}
                className={`relative shrink-0 lg:w-[clamp(340px,30vw,480px)] ${
                  item.branch ? 'lg:mt-16' : ''
                }`}
                y={30}
                delay={i * 0.05}
                amount={0.15}
              >
                {/* Branch riser — shows the fork leaving the trunk. */}
                {item.branch ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 left-9 hidden h-16 w-px lg:block"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(10,122,79,0), rgba(10,122,79,0.4))',
                    }}
                  />
                ) : null}

                <div
                  className={[
                    'flex h-full flex-col justify-between rounded-2xl p-7 sm:p-9',
                    item.branch
                      ? 'border border-dashed border-[rgba(10,122,79,0.25)] bg-[rgba(242,246,243,0.85)] backdrop-blur-md'
                      : 'glass',
                    'transition-[box-shadow,border-color,opacity] duration-700 ease-expo',
                    active
                      ? 'lg:shadow-[0_0_0_1px_rgba(10,122,79,0.2),0_30px_60px_-30px_rgba(10,122,79,0.25)]'
                      : 'lg:opacity-75 hover:lg:opacity-100',
                  ].join(' ')}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-display text-3xl leading-none tracking-tightest sm:text-4xl ${
                            item.branch ? 'text-haze' : 'text-signal'
                          }`}
                        >
                          {item.index}
                        </span>
                        <span className="readout">{item.stage}</span>
                      </span>
                      <span
                        className={`chip ${
                          item.branch ? '' : 'border-[rgba(10,122,79,0.32)] !text-signal'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="mt-6 flex items-center gap-3 font-display text-2xl tracking-tight text-bone sm:text-[1.75rem]">
                      {item.branch ? (
                        <BranchIcon className="shrink-0 text-xl text-signal" />
                      ) : null}
                      {item.title}
                    </h3>

                    <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-haze">
                      {item.blurb}
                    </p>
                  </div>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {item.markers.map((m) => (
                      <li key={m} className="chip">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trunk node */}
                {!item.branch ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-9 hidden h-1.5 w-1.5 translate-y-1/2 rounded-full bg-signal lg:block"
                    style={{ boxShadow: '0 0 8px 2px rgba(10,122,79,0.4)' }}
                  />
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
