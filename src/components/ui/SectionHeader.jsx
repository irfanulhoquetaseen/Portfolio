import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import SplitText from './SplitText';

const EASE = [0.16, 1, 0.3, 1];

/**
 * The section header is the page's structural device.
 *
 * The mono readout carries the section's index, which is the same
 * number the navbar shows for the active section — so the marker is
 * wayfinding information, not decoration. The hairline rule draws
 * itself to full width as the header enters, which is how each
 * section announces that it has begun.
 */
export default function SectionHeader({
  index,
  label,
  title,
  lead,
  className = '',
  titleClassName = '',
  align = 'left',
}) {
  const reduced = useReducedMotion();
  const centered = align === 'center';

  return (
    <header className={`${centered ? 'text-center' : ''} ${className}`}>
      <div
        className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}
      >
        <span className="readout text-signal">[{index}]</span>
        <span className="readout">{label}</span>
        {reduced ? (
          <span className="rule hidden h-px flex-1 sm:block" />
        ) : (
          <motion.span
            className="hidden h-px flex-1 origin-left sm:block"
            style={{
              background:
                'linear-gradient(to right, rgba(10,122,79,0.35), rgba(10,122,79,0))',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          />
        )}
      </div>

      <h2
        className={`fluid-h2 mt-6 max-w-[22ch] text-bone ${
          centered ? 'mx-auto' : ''
        } ${titleClassName}`}
      >
        <SplitText text={title} inView stagger={0.045} duration={1} />
      </h2>

      {lead ? (
        <motion.p
          className={`measure mt-6 text-[1.0625rem] leading-relaxed text-haze ${
            centered ? 'mx-auto' : ''
          }`}
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        >
          {lead}
        </motion.p>
      ) : null}
    </header>
  );
}
