import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { setLenis } from '../lib/scroll';

/**
 * Boots Lenis and marries it to GSAP.
 *
 * Two things have to be true for scroll animation to feel right:
 *  1. Lenis must advance on GSAP's ticker, not its own rAF loop, so
 *     there is exactly one frame loop and no tearing between the
 *     scroll position and the animations reading it.
 *  2. ScrollTrigger must recompute on every Lenis scroll event,
 *     because Lenis interpolates the scroll position itself.
 *
 * When reduced motion is requested we skip Lenis entirely and hand
 * scrolling back to the browser.
 */
export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) {
      setLenis(null);
      document.documentElement.style.scrollBehavior = 'auto';
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.7,
      syncTouch: false,
      autoRaf: false,
    });

    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Late-arriving webfonts change text metrics, which changes every
    // trigger start/end. Refresh once they land.
    let alive = true;
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          if (alive) ScrollTrigger.refresh();
        })
        .catch(() => {});
    }

    return () => {
      alive = false;
      window.clearTimeout(refreshTimer);
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenis(null);
    };
  }, [enabled]);
}
