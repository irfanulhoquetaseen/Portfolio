import { useEffect, useRef, useState } from 'react';
import { contact, profile, socials } from '../data/content';
import Reveal, { Stagger, StaggerItem } from './ui/Reveal';
import SplitText from './ui/SplitText';
import SocialIcon from './ui/SocialIcon';
import { ArrowUpRight, CheckIcon, CopyIcon, MailIcon, PhoneIcon, PinIcon } from './ui/Icons';

/**
 * CONTACT
 *
 * No form — a form on a personal site is a backend, a spam problem and
 * a message the owner may never see. Email and phone are shown in full,
 * are clickable, and can be copied in one tap, which is what someone
 * reaching out actually wants.
 */

/** Split the headline so its final two words get the accent line. */
const words = contact.title.split(' ');
const headline = {
  lead: words.slice(0, -2).join(' '),
  accent: words.slice(-2).join(' '),
};

export default function Contact() {
  const [copied, setCopied] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async (value, key) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for non-secure contexts.
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(key);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* Clipboard denied — the mailto link still works. */
    }
  };

  const channels = [
    {
      key: 'email',
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: MailIcon,
      note: 'Fastest route',
    },
    {
      key: 'phone',
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phoneHref}`,
      Icon: PhoneIcon,
      note: 'Calls & WhatsApp',
    },
  ];

  return (
    <section id="contact" className="section-pad relative z-10">
      <div className="shell">
        {/* ---------- Statement ---------- */}
        <div className="flex flex-col gap-4">
          <Reveal className="flex items-center gap-4" y={16}>
            <span className="readout text-signal">06</span>
            <span className="readout">{contact.eyebrow}</span>
            <span className="rule h-px flex-1" />
          </Reveal>

          {/* Headline is derived from content.js so the copy stays in one
              place; the last two words drop to their own accented line. */}
          <h2 className="fluid-h2 mt-4 max-w-[26ch] font-display text-bone">
            <SplitText text={headline.lead} inView stagger={0.045} />
            <span className="mt-1 block text-signal-grad glow-text">
              <SplitText text={headline.accent} inView stagger={0.045} delay={0.18} />
            </span>
          </h2>

          <Reveal className="measure mt-6" delay={0.2}>
            <p className="text-[1.0625rem] leading-[1.75] text-haze sm:text-lg">{contact.body}</p>
          </Reveal>
        </div>

        {/* ---------- Direct channels ---------- */}
        <div className="mt-14 grid gap-6 sm:mt-16 lg:grid-cols-12 lg:gap-7">
          <div className="grid gap-6 lg:col-span-7 sm:grid-cols-2 lg:gap-7">
            {channels.map((ch, i) => (
              <Reveal
                key={ch.key}
                className="glass glass-hover group relative overflow-hidden rounded-2xl p-7 sm:p-8"
                y={34}
                delay={i * 0.08}
              >
                <div
                  className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full opacity-0 transition-opacity duration-700 ease-expo group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(circle, rgba(10,122,79,0.08), transparent 68%)',
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(10,122,79,0.18)] bg-white text-signal shadow-sm transition-all duration-500 ease-expo group-hover:border-[rgba(10,122,79,0.45)] group-hover:shadow-[0_4px_16px_-4px_rgba(10,122,79,0.3)]">
                    <ch.Icon className="text-lg" />
                  </span>
                  <span className="readout">{ch.note}</span>
                </div>

                <p className="readout relative mt-6">{ch.label}</p>

                <a
                  href={ch.href}
                  data-cursor="hover"
                  className="group/link relative mt-2 inline-block break-all font-display text-lg tracking-tight text-bone transition-colors duration-300 hover:text-signal sm:text-xl"
                >
                  {ch.value}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-expo group-hover/link:scale-x-100" />
                </a>

                <button
                  type="button"
                  onClick={() => copy(ch.value, ch.key)}
                  data-cursor="hover"
                  aria-label={`Copy ${ch.label.toLowerCase()} to clipboard`}
                  className="relative mt-6 inline-flex items-center gap-2 rounded-lg border border-[rgba(10,122,79,0.18)] bg-white/70 px-3 py-2 font-mono text-2xs uppercase tracking-[0.14em] text-haze transition-all duration-300 hover:border-[rgba(10,122,79,0.45)] hover:bg-white hover:text-signal"
                >
                  {copied === ch.key ? (
                    <>
                      <CheckIcon className="text-sm text-signal" />
                      Copied
                    </>
                  ) : (
                    <>
                      <CopyIcon className="text-sm" />
                      Copy
                    </>
                  )}
                </button>
              </Reveal>
            ))}
          </div>

          {/* ---------- Socials ---------- */}
          <Reveal className="lg:col-span-5" y={34} delay={0.14}>
            <div className="glass relative h-full overflow-hidden rounded-2xl p-7 sm:p-8">
              <div className="bg-grid-fine pointer-events-none absolute inset-0 opacity-30" />

              <div className="relative flex items-baseline justify-between gap-4">
                <p className="readout">Elsewhere</p>
                <span className="readout text-signal">
                  {String(socials.length).padStart(2, '0')}
                </span>
              </div>

              <Stagger className="relative mt-5" stagger={0.06}>
                {socials.map((s) => (
                  <StaggerItem key={s.id} y={16}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="group/row flex items-center gap-4 border-b border-[rgba(10,122,79,0.09)] py-3.5 transition-colors duration-500 last:border-b-0 hover:border-[rgba(10,122,79,0.28)]"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgba(10,122,79,0.14)] bg-white/60 text-haze transition-all duration-500 ease-expo group-hover/row:border-[rgba(10,122,79,0.45)] group-hover/row:bg-white group-hover/row:text-signal group-hover/row:shadow-[0_4px_14px_-2px_rgba(10,122,79,0.25)]">
                        <SocialIcon id={s.id} className="text-base" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.9375rem] font-medium text-bone transition-colors duration-300 group-hover/row:text-signal">
                          {s.label}
                        </span>
                        <span className="mt-0.5 block truncate font-mono text-xs text-dim">
                          {s.handle}
                        </span>
                      </span>

                      <ArrowUpRight className="shrink-0 text-base text-dim transition-all duration-500 ease-expo group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-signal" />
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>

              <p className="relative mt-6 inline-flex items-center gap-2 text-sm text-haze">
                <PinIcon className="text-base text-signal" />
                {profile.location}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
