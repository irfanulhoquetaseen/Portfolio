import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

/**
 * Section transition.
 *
 * Rather than dropping a decorative line between sections, the
 * divider reports what is coming next and shows a signal travelling
 * along the wire as you scroll through it — so the space between
 * sections still carries information.
 */
export default function SectionDivider({ label, caption }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scaleX = useTransform(scrollYProgress, [0, 0.45], [0.15, 1]);

  return (
    <div ref={ref} className="relative z-10" aria-hidden="true">
      <div className="shell">
        <div className="flex items-center gap-4 py-9 sm:py-12">
          <span className="readout shrink-0 text-signal">{label}</span>

          <div className="relative h-px flex-1">
            {reduced ? (
              <div className="absolute inset-0 bg-[rgba(10,122,79,0.16)]" />
            ) : (
              <>
                <motion.div
                  className="absolute inset-0 origin-left bg-[rgba(10,122,79,0.16)]"
                  style={{ scaleX }}
                />
                <motion.div
                  className="absolute top-1/2 h-1.5 w-1.5 rounded-full bg-signal"
                  style={{
                    left: x,
                    opacity,
                    marginLeft: '-3px',
                    marginTop: '-3px',
                    boxShadow: '0 0 8px 2px rgba(10,122,79,0.45)',
                  }}
                />
              </>
            )}
          </div>

          <span className="readout hidden shrink-0 sm:block">{caption}</span>
        </div>
      </div>
    </div>
  );
}
