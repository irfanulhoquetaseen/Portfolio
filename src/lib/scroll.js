/**
 * Scroll singleton.
 *
 * The Lenis instance is created once in <App/> and stashed here so
 * any component (navbar, hero CTAs, footer links) can drive the
 * scroll without prop drilling or context re-renders.
 */

let lenis = null;

/** Vertical offset so a section never lands underneath the fixed navbar. */
export const NAV_OFFSET = -72;

export function setLenis(instance) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function lockScroll() {
  if (lenis) lenis.stop();
  else document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll() {
  if (lenis) lenis.start();
  else document.documentElement.style.overflow = '';
}

/**
 * Scroll to a section by id. Falls back to the platform's own
 * smooth scroll when Lenis is disabled (reduced motion).
 */
export function scrollToSection(id) {
  if (!id) return;

  if (id === 'home') {
    if (lenis) lenis.scrollTo(0, { duration: 1.3 });
    else window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.3 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
    window.scrollTo({ top, behavior: 'auto' });
  }
}
