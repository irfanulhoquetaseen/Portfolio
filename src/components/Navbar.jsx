import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems, profile, sections } from '../data/content';
import { scrollToSection, lockScroll, unlockScroll } from '../lib/scroll';
import useReducedMotion from '../hooks/useReducedMotion';
import { CloseIcon, MenuIcon } from './ui/Icons';
import MagneticButton from './ui/MagneticButton';

const EASE = [0.16, 1, 0.3, 1];

function BrandMark({ compact }) {
  return (
    <span className="flex items-center gap-3">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="text-signal transition-all duration-500 ease-expo"
        style={{ width: compact ? 20 : 24, height: compact ? 20 : 24 }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 19V5l7 8 7-8v14" />
        <circle cx="5" cy="5" r="1.7" fill="var(--void)" />
        <circle cx="19" cy="5" r="1.7" fill="var(--void)" />
        <circle cx="12" cy="13" r="1.9" fill="currentColor" stroke="none" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-sm font-semibold tracking-tight text-bone">
          {profile.initials}
        </span>
        <span className="readout mt-1 hidden text-[9px] sm:block">Portfolio</span>
      </span>
    </span>
  );
}

export default function Navbar({ active, progressRef, scrolled }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const activeMeta = sections.find((s) => s.id === active);

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
  }, [open]);

  // Escape closes the mobile sheet.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // Let the sheet start closing before the scroll takes over.
    window.setTimeout(() => {
      scrollToSection(id);
      window.history.replaceState(
        null,
        '',
        id === 'home' ? window.location.pathname + window.location.search : `#${id}`,
      );
    }, open ? 240 : 0);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100]"
        initial={reduced ? undefined : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: reduced ? 0 : 1.9 }}
      >
        {/* The bar only grows a background once you have left the hero. */}
        <div
          className="absolute inset-0 border-b transition-all duration-500 ease-expo"
          style={{
            background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
            backdropFilter: scrolled ? 'blur(16px) saturate(130%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(130%)' : 'none',
            borderColor: scrolled ? 'rgba(10, 122, 79, 0.12)' : 'rgba(10, 122, 79, 0)',
          }}
        />

        <nav
          aria-label="Primary"
          className="shell relative flex items-center justify-between gap-6 transition-[padding] duration-500 ease-expo"
          style={{ paddingTop: scrolled ? 14 : 26, paddingBottom: scrolled ? 14 : 26 }}
        >
          <a
            href="#home"
            onClick={(e) => go(e, 'home')}
            data-cursor="hover"
            aria-label="Back to top"
            className="shrink-0"
          >
            <BrandMark compact={scrolled} />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    data-cursor="hover"
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative flex items-baseline gap-1.5 rounded-full px-4 py-2 font-mono text-2xs uppercase tracking-[0.16em] transition-colors duration-300 ${
                      isActive ? 'text-signal' : 'text-haze hover:text-bone'
                    }`}
                  >
                    {isActive && !reduced ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-[rgba(10,122,79,0.22)] bg-[rgba(10,122,79,0.08)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span
                      className={`text-[8px] transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
                      }`}
                    >
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            {/* Live readout of where you are — the nav index and the
                section header index are the same number. */}
            <span className="readout hidden xl:block">
              <span className="text-signal">[{activeMeta?.index ?? '00'}]</span>{' '}
              {activeMeta?.label ?? 'Index'}
            </span>

            <div className="hidden lg:block">
              <MagneticButton
                variant="ghost"
                arrow={false}
                onClick={() => scrollToSection('contact')}
                className="!px-5 !py-2.5"
              >
                Hire me
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              data-cursor="hover"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,122,79,0.2)] text-bone transition-colors duration-300 hover:border-[rgba(10,122,79,0.5)] hover:text-signal lg:hidden"
            >
              {open ? <CloseIcon className="text-xl" /> : <MenuIcon className="text-xl" />}
            </button>
          </div>
        </nav>

        {/* Scroll progress — a hairline that fills as you read. The
            transform is written by useActiveSection straight to the DOM,
            so reading the page does not re-render React. */}
        <div className="relative h-px w-full bg-[rgba(10,122,79,0.08)]">
          <div
            ref={progressRef}
            className="h-px origin-left bg-signal-grad"
            style={{
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(10,122,79,0.4)',
            }}
          />
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-void/95 bg-grain backdrop-blur-xl lg:hidden"
            initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
            <ul className="shell relative space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={reduced ? undefined : { opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.16 + i * 0.06 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    className={`flex items-baseline gap-4 border-b border-[rgba(10,122,79,0.1)] py-4 font-display text-3xl tracking-tightest transition-colors duration-300 xs:text-4xl ${
                      active === item.id ? 'text-signal' : 'text-bone'
                    }`}
                  >
                    <span className="readout w-6 shrink-0">{item.index}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="shell relative mt-10"
              initial={reduced ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-2xs uppercase tracking-[0.16em] text-signal"
              >
                {profile.email}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
