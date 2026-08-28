import { projects, socials } from '../data/content';
import SectionHeader from './ui/SectionHeader';
import Reveal from './ui/Reveal';
import ProjectCard from './ProjectCard';
import SocialIcon from './ui/SocialIcon';
import { ArrowUpRight } from './ui/Icons';

const github = socials.find((s) => s.id === 'github');

/**
 * WORK
 *
 * Three projects, one full-width card each rather than a three-up grid.
 * With this few projects a grid makes the section look thin; giving each
 * one the full measure lets the description actually argue for the work.
 */
export default function Projects() {
  return (
    <section id="work" className="section-pad relative z-10">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Work"
          title="Three problems I decided to solve properly."
          lead="Each of these started as a question I could not answer by reading about it. The diagrams are of the actual mechanism — not screenshots."
        />

        <div className="mt-14 space-y-7 sm:mt-16 lg:space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Everything else lives on GitHub — say so instead of padding
            the section with half-finished work. */}
        <Reveal className="mt-8" delay={0.1} y={24}>
          <a
            href={github?.href}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            className="group flex flex-col items-start gap-5 rounded-2xl border border-dashed border-[rgba(10,122,79,0.22)] bg-white/70 p-7 transition-all duration-500 ease-expo hover:border-[rgba(10,122,79,0.45)] hover:bg-[rgba(10,122,79,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <span className="flex items-center gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[rgba(10,122,79,0.2)] bg-white text-signal shadow-sm transition-all duration-500 ease-expo group-hover:border-[rgba(10,122,79,0.5)] group-hover:shadow-[0_4px_16px_-4px_rgba(10,122,79,0.35)]">
                <SocialIcon id="github" className="text-xl" />
              </span>
              <span>
                <span className="readout">Everything else</span>
                <span className="mt-2 block font-display text-lg tracking-tight text-bone sm:text-xl">
                  Experiments, coursework and work in progress
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2 font-mono text-2xs uppercase tracking-[0.16em] text-signal">
              Browse the repos
              <ArrowUpRight className="text-base transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
