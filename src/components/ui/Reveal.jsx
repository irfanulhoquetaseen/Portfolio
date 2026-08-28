import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Scroll reveal. One component, four combinable transforms
 * (translate / scale / blur / opacity) so every section can share a
 * single motion vocabulary instead of inventing its own.
 */
export default function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  duration = 0.95,
  y = 30,
  x = 0,
  scale = 1,
  blur = 0,
  once = true,
  amount = 0.2,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        scale,
        filter: blur ? `blur(${blur}px)` : undefined,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: blur ? 'blur(0px)' : undefined,
      }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Stagger parent. Children rendered with <StaggerItem/> inherit the
 * timing automatically through framer-motion's variant propagation.
 */
export function Stagger({
  children,
  as = 'div',
  className = '',
  stagger = 0.09,
  delay = 0.05,
  once = true,
  amount = 0.18,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  as = 'div',
  className = '',
  y = 26,
  duration = 0.85,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
