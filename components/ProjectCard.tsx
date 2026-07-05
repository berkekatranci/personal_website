import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { SkillBadge } from "@/components/SkillBadge";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="surface-card flex h-full flex-col p-6 transition hover:-translate-y-1 hover:border-sky/40">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="rounded-lg border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-xs text-gold">
          {project.status}
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-sky">
          {project.category}
        </p>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-7 text-text">
        {project.title}
      </h3>

      <div className="mt-6 grid gap-4 text-sm leading-7 text-muted">
        <p>
          <span className="font-semibold text-text">Problem: </span>
          {project.problem}
        </p>
        <p>
          <span className="font-semibold text-text">My role: </span>
          {project.role}
        </p>
        <p>
          <span className="font-semibold text-text">Result: </span>
          {project.result}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <SkillBadge key={tech}>{tech}</SkillBadge>
        ))}
      </div>

      {project.links?.length ? (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
          {project.links.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-muted transition hover:border-sky/40 hover:text-sky"
              >
                {link.label}
                <ExternalLink aria-hidden size={13} />
              </a>
            ) : (
              <span
                key={link.label}
                className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-500"
              >
                {link.label}
              </span>
            )
          )}
        </div>
      ) : null}
    </article>
  );
}
