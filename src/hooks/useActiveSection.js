import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which section is currently under a probe line set at 38% of
 * the viewport height, plus overall scroll progress.
 *
 * Deliberately not IntersectionObserver: the roadmap section is
 * pinned by ScrollTrigger, so its intersection ratio stays constant
 * for hundreds of pixels of scrolling and IO stops being meaningful.
 * A probe line is unambiguous — exactly one section owns it.
 *
 * Note on `progressRef`: scroll progress changes on essentially every
 * frame. Putting it in state would re-render the whole page tree 60–120
 * times a second for one CSS transform, which is the single easiest way
 * to make a scroll experience feel heavy. Instead the caller attaches
 * `progressRef` to the element that should fill, and this hook writes
 * the transform straight to it. `active` and `scrolled` stay in state
 * because they change a handful of times per page, not per frame.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;

      const y = window.scrollY;
      const vh = window.innerHeight;
      const probe = y + vh * 0.38;

      const doc = document.documentElement;
      const max = doc.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      // Written directly to the DOM — no render pass involved.
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      setScrolled(y > 24);

      let current = ids[0];
      for (let i = 0; i < ids.length; i += 1) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + y;
        if (top <= probe) current = ids[i];
      }

      // Bottom of the page always belongs to the last section, even if
      // it is too short to reach the probe line.
      if (max > 0 && y >= max - 4) current = ids[ids.length - 1];

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return { active, scrolled, progressRef };
}
