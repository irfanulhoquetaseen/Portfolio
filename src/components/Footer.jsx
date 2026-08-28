import { footerTagline, navItems, profile, socials } from '../data/content';
import { scrollToSection } from '../lib/scroll';
import Reveal from './ui/Reveal';
import SocialIcon from './ui/SocialIcon';
import { ArrowDown, MailIcon, PhoneIcon } from './ui/Icons';

/**
 * FOOTER
 *
 * Uses the same .shell container as every section and the navbar, so the
 * left edge of the wordmark lines up with every section index above it and
 * the right edge lines up with the nav. That alignment is the whole reason
 * the page reads as one system rather than stacked blocks.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[rgba(10,122,79,0.12)] bg-[#f2f6f3]">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64"
        style={{
          background: 'radial-gradient(70% 100% at 50% 130%, rgba(10,122,79,0.08), transparent 65%)',
        }}
      />

      <div className="shell relative">
        {/* ---------- Oversized wordmark ---------- */}
        <div className="border-b border-[rgba(10,122,79,0.09)] pb-12 pt-20 sm:pt-24">
          <Reveal y={26}>
            <p className="readout">Thanks for scrolling</p>
            <h2 className="fluid-h2 mt-5 font-display text-bone">
              Let’s talk.{' '}
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="group inline-flex items-baseline text-signal-grad transition-opacity duration-300 hover:opacity-80"
              >
                {profile.email}
                <span className="ml-3 hidden h-[2px] w-10 self-center bg-signal transition-all duration-500 ease-expo group-hover:w-16 sm:inline-block" />
              </a>
            </h2>
          </Reveal>
        </div>

        {/* ---------- Columns ---------- */}
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-8">
          {/* Identity */}
          <div className="lg:col-span-5">
            <p className="font-display text-base tracking-tight text-bone">{profile.name}</p>
            <p className="mt-2 font-mono text-2xs uppercase tracking-[0.14em] text-signal">
              {profile.title}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
              {profile.location} — building toward AI software engineering, one shipped project at a
              time.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="inline-flex w-fit items-center gap-2.5 text-sm text-haze transition-colors duration-300 hover:text-signal"
              >
                <MailIcon className="text-base text-signal" />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phoneHref}`}
                data-cursor="hover"
                className="inline-flex w-fit items-center gap-2.5 text-sm text-haze transition-colors duration-300 hover:text-signal"
              >
                <PhoneIcon className="text-base text-signal" />
                {profile.phone}
              </a>
            </div>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer navigation" className="lg:col-span-4">
            <p className="readout">Navigate</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    data-cursor="hover"
                    className="group inline-flex items-baseline gap-2.5 text-sm text-haze transition-colors duration-300 hover:text-signal"
                  >
                    <span className="font-mono text-2xs text-dim transition-colors duration-300 group-hover:text-signal">
                      {item.index}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-expo group-hover:scale-x-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="lg:col-span-3">
            <p className="readout">Find me</p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    title={s.label}
                    data-cursor="hover"
                    className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(10,122,79,0.14)] bg-white text-haze shadow-sm transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-[rgba(10,122,79,0.45)] hover:text-signal hover:shadow-[0_6px_20px_-6px_rgba(10,122,79,0.35)]"
                  >
                    <SocialIcon id={s.id} className="text-lg" />
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => scrollToSection('home')}
              data-cursor="hover"
              className="group mt-7 inline-flex items-center gap-2.5 font-mono text-2xs uppercase tracking-[0.16em] text-haze transition-colors duration-300 hover:text-signal"
            >
              <ArrowDown className="rotate-180 text-base text-signal transition-transform duration-500 ease-expo group-hover:-translate-y-1" />
              Back to top
            </button>
          </div>
        </div>

        {/* ---------- Baseline ---------- */}
        <div className="flex flex-col gap-3 border-t border-[rgba(10,122,79,0.09)] py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xs uppercase tracking-[0.14em] text-dim">
            © {year} {profile.shortName}. All rights reserved.
          </p>
          <p className="font-mono text-2xs uppercase tracking-[0.14em] text-dim">
            {footerTagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
