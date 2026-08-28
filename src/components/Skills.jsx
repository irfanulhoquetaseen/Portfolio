import { skillGroups } from '../data/content';
import { scrollToSection } from '../lib/scroll';
import SectionHeader from './ui/SectionHeader';
import Reveal, { Stagger, StaggerItem } from './ui/Reveal';
import { ArrowRight, TerminalIcon } from './ui/Icons';

/**
 * SKILLS
 *
 * Deliberately not a grid of multi-coloured brand logos — those pull
 * five different design languages onto one page. Each technology gets
 * a typographic mark set in the mono face, which keeps the section in
 * the same system-readout language as the rest of the site and lets
 * the grouping (not the logos) carry the information.
 */
export default function Skills() {
  return (
    <section id="stack" className="section-pad relative z-10">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Stack"
          title="The tools I actually reach for."
          lead="Grouped by what they are for rather than by how well I know them — the honest signal is in the second column."
        />

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {skillGroups.map((group, gi) => (
            <Reveal
              key={group.id}
              className="glass glass-hover group relative overflow-hidden rounded-2xl p-7 sm:p-8"
              y={34}
              delay={gi * 0.08}
            >
              <div className="bg-grid-fine pointer-events-none absolute inset-0 opacity-30" />

              {/* Group header */}
              <div className="relative flex items-baseline justify-between gap-4 border-b border-[rgba(10,122,79,0.12)] pb-5">
                <h3 className="font-display text-xl tracking-tight text-bone">{group.label}</h3>
                <span className="readout text-signal">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <p className="relative mt-3 text-sm text-dim">{group.note}</p>

              {/* Items */}
              <Stagger className="relative mt-6 space-y-2.5" stagger={0.06} amount={0.25}>
                {group.items.map((item) => (
                  <StaggerItem
                    key={`${group.id}-${item.name}`}
                    className="group/item flex items-center gap-4 rounded-xl border border-transparent px-3 py-3 transition-all duration-500 ease-expo hover:border-[rgba(10,122,79,0.2)] hover:bg-[rgba(10,122,79,0.05)]"
                  >
                    {/* Typographic mark */}
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[rgba(10,122,79,0.18)] bg-white font-mono text-[0.8125rem] font-medium text-signal shadow-sm transition-all duration-500 ease-expo group-hover/item:border-[rgba(10,122,79,0.45)] group-hover/item:shadow-[0_4px_14px_-2px_rgba(10,122,79,0.25)]"
                      aria-hidden="true"
                    >
                      {item.mark}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-[0.9375rem] font-medium text-bone">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-dim">{item.detail}</span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>

        {/* Pointer to the growth section — the honest other half of a
            skills list is what is not on it yet. */}
        <Reveal className="mt-7" delay={0.1}>
          <button
            type="button"
            onClick={() => scrollToSection('growth')}
            data-cursor="hover"
            className="group flex w-full flex-col items-start gap-4 rounded-2xl border border-[rgba(10,122,79,0.14)] bg-[rgba(10,122,79,0.04)] p-6 text-left transition-all duration-500 ease-expo hover:border-[rgba(10,122,79,0.35)] hover:bg-[rgba(10,122,79,0.08)] sm:flex-row sm:items-center sm:justify-between sm:p-7"
          >
            <span className="flex items-start gap-4 sm:items-center">
              <TerminalIcon className="mt-0.5 shrink-0 text-xl text-signal sm:mt-0" />
              <span>
                <span className="readout">Not on this list yet</span>
                <span className="mt-2 block font-display text-lg tracking-tight text-bone sm:text-xl">
                  Competitive programming and AI engineering — in progress
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-signal">
              See growth
              <ArrowRight className="text-base transition-transform duration-500 ease-expo group-hover:translate-x-1" />
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
