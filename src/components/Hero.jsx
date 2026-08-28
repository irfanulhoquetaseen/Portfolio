import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../lib/gsap';
import { hero, profile } from '../data/content';
import { scrollToSection } from '../lib/scroll';
import useReducedMotion from '../hooks/useReducedMotion';
import NodeLattice from './NodeLattice';
import MagneticButton from './ui/MagneticButton';
import SplitText from './ui/SplitText';
import { ArrowDown } from './ui/Icons';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ start }) {
  const section = useRef(null);
  const content = useRef(null);
  const latticeWrap = useRef(null);
  const reduced = useReducedMotion();

  // Scroll parallax: the type leaves faster than the lattice behind
  // it, which gives the hero depth as it hands over to the next
  // section instead of simply scrolling away.
  useEffect(() => {
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(content.current, {
        yPercent: -18,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(latticeWrap.current, {
        yPercent: 12,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const gate = (delay) => ({
    initial: reduced ? undefined : { opacity: 0, y: 26 },
    animate: start ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section
      id="home"
      ref={section}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-32 sm:pb-20"
    >
      {/* Live cluster topology */}
      <div
        ref={latticeWrap}
        className="pointer-events-none absolute inset-0 z-0 opacity-90 mask-fade-b"
      >
        <NodeLattice />
      </div>

      <div ref={content} className="shell relative z-10 w-full">
        {/* Status readout */}
        <motion.div
          className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mb-10"
          {...gate(0.05)}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-signal" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          <span className="readout">{profile.location}</span>
          <span className="hidden h-3 w-px bg-[rgba(10,122,79,0.2)] sm:block" />
          <span className="readout hidden sm:block">Open to internships &amp; collaborations</span>
        </motion.div>

        {/* Headline — the copy is one sentence; the type gives it two
            registers so the name carries the weight. */}
        <h1 className="text-bone">
          <motion.span
            className="mb-3 block font-mono text-xs uppercase tracking-widest2 text-haze sm:mb-4 sm:text-sm"
            {...gate(0.15)}
          >
            Hi, I&rsquo;m
          </motion.span>
          <span className="fluid-display block font-display font-semibold">
            <SplitText
              text="Irfanul Hoque Taseen."
              mode="words"
              play={start}
              stagger={0.075}
              delay={0.1}
              duration={1.25}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-7 font-display text-xl font-medium leading-tight tracking-tight sm:mt-8 sm:text-3xl lg:text-4xl"
          {...gate(0.55)}
        >
          <span className="text-bone">CSE Student &amp; Aspiring </span>
          <span className="text-signal-grad glow-text">AI Software Engineer</span>
        </motion.p>

        {/* Supporting line */}
        <motion.p
          className="measure mt-6 text-base leading-relaxed text-haze sm:text-lg"
          {...gate(0.68)}
        >
          {hero.supporting}
        </motion.p>

        {/* Calls to action */}
        <motion.div className="mt-10 flex flex-wrap items-center gap-3 sm:mt-12 sm:gap-4" {...gate(0.8)}>
          <MagneticButton onClick={() => scrollToSection(hero.primaryCta.target)}>
            {hero.primaryCta.label}
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToSection(hero.secondaryCta.target)}>
            {hero.secondaryCta.label}
          </MagneticButton>
        </motion.div>

        {/* Meta strip */}
        <motion.dl
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[rgba(10,122,79,0.12)] bg-[rgba(10,122,79,0.12)] shadow-sm sm:mt-16 sm:grid-cols-4"
          {...gate(0.95)}
        >
          {hero.meta.map((m) => (
            <div key={m.k} className="bg-white/80 px-4 py-4 backdrop-blur-sm sm:px-5 sm:py-5">
              <dt className="readout">{m.k}</dt>
              <dd className="mt-2 font-display text-sm text-bone sm:text-base">{m.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('about')}
        data-cursor="hover"
        aria-label="Scroll to About"
        className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={start ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span className="readout transition-colors duration-300 group-hover:text-signal">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-[rgba(10,122,79,0.18)]">
          <span className="absolute inset-x-0 top-0 h-4 bg-signal" style={{ animation: 'scrollCue 2.1s ease-in-out infinite' }} />
        </span>
        <ArrowDown className="text-sm text-signal opacity-70 transition-opacity group-hover:opacity-100" />
      </motion.button>
    </section>
  );
}
