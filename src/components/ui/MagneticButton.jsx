import useMagnetic from '../../hooks/useMagnetic';
import useReducedMotion from '../../hooks/useReducedMotion';
import { ArrowRight, ArrowUpRight } from './Icons';

/**
 * Magnetic button.
 *
 * The whole control leans toward the cursor while the label leans
 * slightly further, which gives the press a sense of depth before
 * anything is clicked. Renders as <a> when href is given, <button>
 * otherwise — so it is always the right element for the job.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  external = false,
  arrow = true,
  className = '',
  ariaLabel,
  ...rest
}) {
  const reduced = useReducedMotion();
  const { ref, innerRef } = useMagnetic({
    strength: 0.22,
    textStrength: 0.1,
    disabled: reduced,
  });

  const isPrimary = variant === 'primary';

  const shell = [
    'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full',
    'px-6 py-3.5 sm:px-7 sm:py-4',
    'font-mono text-2xs uppercase tracking-[0.16em]',
    'transition-[color,border-color,box-shadow] duration-500 ease-expo',
    isPrimary
      ? 'bg-signal text-white shadow-[0_8px_24px_-8px_rgba(10,122,79,0.5)] hover:shadow-[0_14px_32px_-6px_rgba(10,122,79,0.65)] hover:bg-[#086a44]'
      : 'border border-[rgba(10,122,79,0.25)] bg-white/70 text-bone hover:border-signal hover:text-signal shadow-sm',
    className,
  ].join(' ');

  const Arrow = external ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      {/* Ghost variant: signal wash rises from the bottom edge. */}
      {!isPrimary ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[rgba(10,122,79,0.08)] transition-transform duration-[600ms] ease-expo group-hover:scale-y-100"
        />
      ) : (
        /* Primary variant: a sheen sweeps across on hover. */
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-18deg] bg-white/35 blur-[6px] transition-all duration-[900ms] ease-expo group-hover:left-[140%]"
        />
      )}

      <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2.5">
        <span>{children}</span>
        {arrow ? (
          <Arrow className="text-[1.05em] transition-transform duration-500 ease-expo group-hover:translate-x-[3px]" />
        ) : null}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        data-cursor="hover"
        className={shell}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor="hover"
      className={shell}
      {...rest}
    >
      {content}
    </button>
  );
}
