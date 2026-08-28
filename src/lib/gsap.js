import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single registration point for GSAP plugins. Importing gsap or
 * ScrollTrigger from anywhere else in the app is a bug — import
 * from here so the plugin is guaranteed registered exactly once.
 */
gsap.registerPlugin(ScrollTrigger);

// Pinned sections misbehave on mobile when the URL bar collapses
// and fires a resize; ignoring that keeps pins from re-calculating.
ScrollTrigger.config({ ignoreMobileResize: true });

gsap.defaults({ ease: 'power3.out', duration: 1 });

export { gsap, ScrollTrigger };
