import { useCallback, useEffect, useState } from 'react';
import { sections } from './data/content';
import useReducedMotion from './hooks/useReducedMotion';
import useSmoothScroll from './hooks/useSmoothScroll';
import useActiveSection from './hooks/useActiveSection';
import { lockScroll, unlockScroll } from './lib/scroll';

import AmbientBackground from './components/AmbientBackground';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Roadmap from './components/Roadmap';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Growth from './components/Growth';
import SideQuest from './components/SideQuest';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SectionDivider from './components/ui/SectionDivider';

// Module-level constant: a fresh array each render would restart the
// scroll observer on every state change.
const SECTION_IDS = sections.map((s) => s.id);

export default function App() {
  const reduced = useReducedMotion();

  // Reduced motion skips the intro entirely — the page is readable
  // the instant it paints.
  const [booting, setBooting] = useState(!reduced);
  const [revealed, setRevealed] = useState(reduced);

  useSmoothScroll(!reduced);
  const { active, scrolled, progressRef } = useActiveSection(SECTION_IDS);

  // Remove the pre-hydration paint shim once React owns the screen.
  useEffect(() => {
    document.getElementById('boot')?.remove();
  }, []);

  // Nobody scrolls during the intro.
  useEffect(() => {
    if (booting) {
      lockScroll();
      window.scrollTo(0, 0);
    } else {
      unlockScroll();
    }
  }, [booting]);

  const handleReveal = useCallback(() => setRevealed(true), []);
  const handleDone = useCallback(() => setBooting(false), []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[400] focus:rounded-full focus:bg-signal focus:px-5 focus:py-3 focus:font-mono focus:text-2xs focus:uppercase focus:tracking-[0.16em] focus:text-white shadow-lg"
      >
        Skip to content
      </a>

      <AmbientBackground />
      <CustomCursor />

      {booting ? <Preloader onReveal={handleReveal} onDone={handleDone} /> : null}

      <Navbar active={active} progressRef={progressRef} scrolled={scrolled} />

      <main id="main" className="relative z-10">
        <Hero start={revealed} />

        <SectionDivider label="Who" caption="Background & intent" />
        <About />

        <SectionDivider label="Where" caption="Career trajectory" />
        <Roadmap />

        <SectionDivider label="What with" caption="Tools & languages" />
        <Skills />

        <SectionDivider label="Proof" caption="Things I have built" />
        <Projects />

        <SectionDivider label="Next" caption="Actively levelling up" />
        <Growth />

        <SideQuest />

        <SectionDivider label="Reach" caption="Say hello" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
