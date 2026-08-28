import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { sideQuest } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';
import Reveal from './ui/Reveal';
import { BranchIcon } from './ui/Icons';

/**
 * SIDE QUEST — game development.
 *
 * Not given a section id or a nav slot on purpose: it is a footnote to
 * the trajectory, not a sixth chapter. Visually it sits inside a full-bleed
 * band with its own darker substrate so it reads as an aside — the page
 * changes register for one screen, then returns.
 *
 * The frame-budget marquee is the joke and the point: 16.67ms, on a loop.
 */
export default function SideQuest() {
  const band = useRef(null);
  const marquee = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      // Scroll-linked drift: the ticker text moves with the page, so the
      // band feels like it is on a different plane to the sections above.
      gsap.to(marquee.current, {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: band.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, band);

    return () => ctx.revert();
  }, [reduced]);

  const ticker = ['16.67 MS PER FRAME', 'DELTA TIME', 'FIXED TIMESTEP', 'DRAW CALLS', 'CACHE MISS'];

  return (
    <section
      ref={band}
      aria-labelledby="sidequest-title"
      className="relative z-10 overflow-hidden border-y border-[rgba(10,122,79,0.12)] bg-[#f0f5f2]"
    >
      {/* Substrate */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 130% at 82% 0%, rgba(10,122,79,0.06), transparent 60%)',
        }}
      />

      {/* Frame-budget ticker */}
      <div className="pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden py-5">
        <div
          ref={marquee}
          className="mask-fade-x flex w-max items-center gap-8 whitespace-nowrap font-mono text-2xs uppercase tracking-[0.3em] text-[rgba(10,122,79,0.32)]"
        >
          {Array.from({ length: 4 }).flatMap((_, r) =>
            ticker.map((t) => (
              <span key={`${r}-${t}`} className="flex items-center gap-8">
                {t}
                <span className="h-1 w-1 rounded-full bg-[rgba(10,122,79,0.35)]" />
              </span>
            )),
          )}
        </div>
      </div>

      <div className="shell relative py-24 sm:py-28 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2.5">
                <BranchIcon className="text-lg text-signal" />
                <span className="readout text-signal">{sideQuest.eyebrow}</span>
              </span>
            </Reveal>

            <Reveal delay={0.08} y={34}>
              <h2
                id="sidequest-title"
                className="fluid-h2 mt-6 max-w-[22ch] font-display text-bone"
              >
                {sideQuest.title.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-signal-grad glow-text">
                  {sideQuest.title.split(' ').slice(-2).join(' ')}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="measure mt-7">
              <p className="text-[1.0625rem] leading-[1.75] text-haze">{sideQuest.body}</p>
            </Reveal>
          </div>

          {/* Read-out panel */}
          <Reveal
            className="lg:col-span-5 lg:pt-4"
            delay={0.2}
            x={20}
            y={20}
          >
            <dl className="rounded-2xl border border-[rgba(10,122,79,0.14)] bg-white/80 p-7 backdrop-blur-md shadow-sm sm:p-8">
              {sideQuest.items.map((item, i) => (
                <div
                  key={item.k}
                  className={`flex flex-col gap-1.5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 ${
                    i === 0 ? 'pt-0' : ''
                  } ${
                    i === sideQuest.items.length - 1
                      ? 'pb-0'
                      : 'border-b border-[rgba(10,122,79,0.09)]'
                  }`}
                >
                  <dt className="readout shrink-0">{item.k}</dt>
                  <dd className="text-sm text-bone sm:text-right">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
