import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { completedProjects, featuredProjects, ongoingProjects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-mesh-dark">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Featured Projects"
            title="Evidence of building, measuring, improving, and leading."
            description="Each project is framed by the problem, my role, the technical stack, and the result. The goal is to make the work easy to scan while still showing the engineering context."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="surface-card p-6">
            <p className="eyebrow">Finished (Selected Projects)</p>
            <p className="mt-3 text-3xl font-semibold text-text">
              {completedProjects.length}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Completed projects with concrete delivery, competition, or
              evaluation outcomes.
            </p>
          </div>
          <div className="surface-card p-6">
            <p className="eyebrow">In Progress (Selected Projects)</p>
            <p className="mt-3 text-3xl font-semibold text-text">
              {ongoingProjects.length}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Active systems for community building, web infrastructure, and
              creative technology presentation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
