import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Monogram from './ui/Monogram';

const COUNT_MS = 1150;
const EXIT_MS = 900;
const EASE = [0.76, 0, 0.24, 1];

/**
 * Page-load intro.
 *
 * A short system-boot readout, then the panel lifts away. The reveal
 * is deliberately overlapped: onReveal fires as the curtain starts to
 * leave, so the hero's own reveal is already underway behind it and
 * the two motions read as one gesture rather than two steps.
 */
export default function Preloader({ onReveal, onDone }) {
  const [pct, setPct] = useState(0);
  const [exiting, setExiting] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      // Ease-out so the count decelerates into 100 instead of stopping dead.
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!fired.current) {
        fired.current = true;
        setExiting(true);
        onReveal?.();
        window.setTimeout(() => onDone?.(), EXIT_MS);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onReveal, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[250] flex flex-col justify-between bg-void bg-grain"
      initial={{ y: 0 }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: EXIT_MS / 1000, ease: EASE }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(10,122,79,0.08) 0%, rgba(10,122,79,0) 65%)',
        }}
      />

      <motion.div
        className="relative shell flex flex-1 flex-col justify-center"
        animate={exiting ? { opacity: 0, y: -28 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="flex items-end justify-between gap-8">
          <div className="flex items-center gap-5 sm:gap-7">
            <Monogram size={64} showPhoto={false} />
            <div>
              <p className="readout mb-2">Portfolio</p>
              <p className="font-display text-xl leading-none tracking-tightest text-bone sm:text-3xl">
                Irfanul Hoque Taseen
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="readout mb-2 hidden sm:block">Loading</p>
            <p className="font-display text-5xl leading-none tracking-tightest text-signal sm:text-7xl">
              {String(pct).padStart(3, '0')}
            </p>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-[rgba(10,122,79,0.14)]">
          <div
            className="h-px bg-signal"
            style={{
              width: `${pct}%`,
              boxShadow: '0 0 10px rgba(10,122,79,0.4)',
            }}
          />
        </div>

        <p className="readout mt-5">
          <span className="text-signal">›</span> initialising interface
        </p>
      </motion.div>
    </motion.div>
  );
}
