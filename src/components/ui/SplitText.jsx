import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Masked text reveal.
 *
 * Each unit (word or character) sits inside an overflow-hidden clip
 * and slides up from below it, so the type appears to rise out of the
 * page rather than fade onto it. The whole string is exposed to
 * assistive tech via aria-label; the fragments are hidden.
 */
export default function SplitText({
  text,
  mode = 'words',
  as = 'span',
  className = '',
  unitClassName = '',
  stagger = 0.055,
  delay = 0,
  duration = 1.05,
  y = '110%',
  animate = true,
  play = true,
  once = true,
  inView = false,
}) {
  const reduced = useReducedMotion();
  const Tag = as;

  const units = mode === 'chars' ? Array.from(text) : text.split(' ');

  if (reduced || !animate) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const item = {
    hidden: { y, opacity: 0, rotate: 2 },
    visible: { y: '0%', opacity: 1, rotate: 0, transition: { duration, ease: EASE } },
  };

  const activation = inView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once, amount: 0.4 } }
    : { initial: 'hidden', animate: play ? 'visible' : 'hidden' };

  return (
    <motion.span
      className={className}
      variants={container}
      aria-label={text}
      {...activation}
      style={{ display: 'inline' }}
    >
      {units.map((unit, i) => (
        <span
          key={unit + '-' + i}
          aria-hidden="true"
          className="line-clip"
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            // An inline-block collapses trailing whitespace, so the gap
            // between words has to come from the box, not a space char.
            marginRight: mode === 'words' ? '0.27em' : undefined,
          }}
        >
          <motion.span
            variants={item}
            className={unitClassName}
            style={{ display: 'inline-block', willChange: 'transform' }}
          >
            {unit === ' ' ? ' ' : unit}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
