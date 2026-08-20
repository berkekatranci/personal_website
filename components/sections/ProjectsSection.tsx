import { ProjectArchive } from "@/components/ProjectArchive";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  completedProjects,
  featuredProjects,
  ongoingProjects
} from "@/data/projects";

const showcaseProjects = featuredProjects.slice(0, 3);
const showcaseTitles = new Set(showcaseProjects.map((project) => project.title));
const completedArchive = completedProjects.filter(
  (project) => !showcaseTitles.has(project.title)
);

export function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-white/10 bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Featured Projects"
            title="Evidence of building, measuring, improving, and leading."
            description="Each project is framed by the problem, my role, the technical stack, and the result. The goal is to make the work easy to scan while still showing the engineering context."
          />
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <div className="pb-4">
            <p className="font-mono text-[10px] uppercase text-slate-500 lg:col-span-2">
              Selected work
            </p>
          </div>
          {showcaseProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="border-t border-white/10 pt-6 lg:sticky lg:top-24">
              <p className="eyebrow">Finished (Selected Projects)</p>
              <p className="mt-5 font-display text-5xl text-text">
                {completedProjects.length}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
                Completed projects with concrete delivery, competition, or
                evaluation outcomes.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.05}>
            <ProjectArchive
              projects={completedArchive}
              startIndex={showcaseProjects.length}
            />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="border-t border-gold/40 pt-6 lg:sticky lg:top-24">
              <p className="font-mono text-[10px] uppercase text-gold">
                In Progress (Selected Projects)
              </p>
              <p className="mt-5 font-display text-5xl text-text">
                {ongoingProjects.length}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
                Active systems for community building, web infrastructure, and
                creative technology presentation.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.05}>
            <ProjectArchive
              projects={ongoingProjects}
              startIndex={completedProjects.length}
              tone="active"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
