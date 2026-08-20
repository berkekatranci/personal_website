import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { SkillBadge } from "@/components/SkillBadge";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const statusClass = project.status === "Finished" ? "text-mint" : "text-gold";

  return (
    <article className="border-t border-white/15 py-8 lg:py-10">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
        <p className="font-mono text-[10px] text-slate-500 lg:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </p>
        <div className="lg:col-span-7">
          <p className="font-mono text-[10px] uppercase text-sky">
            {project.category}
          </p>
          <h3 className="display-title mt-3 text-2xl leading-tight sm:text-3xl">
            {project.title}
          </h3>
        </div>
        <div className="flex items-start gap-2 lg:col-span-4 lg:justify-end">
          <span
            aria-hidden
            className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-current ${statusClass}`}
          />
          <p className={`font-mono text-[10px] uppercase ${statusClass}`}>
            {project.status}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-7 lg:ml-[8.333333%] lg:grid-cols-3 lg:gap-8">
        {[
          ["Problem", project.problem],
          ["My role", project.role],
          ["Result", project.result]
        ].map(([label, value]) => (
          <div key={label}>
            <p className="font-mono text-[10px] uppercase text-slate-500">
              {label}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 border-t border-white/10 pt-5 lg:ml-[8.333333%] lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {project.techStack.map((tech) => (
            <SkillBadge key={tech}>{tech}</SkillBadge>
          ))}
        </div>
        {project.links?.length ? (
          <div className="flex flex-wrap gap-4">
            {project.links.map((link, linkIndex) =>
              !link.label ? null : link.href ? (
                <a
                  key={`${link.label}-${linkIndex}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-text transition-colors hover:text-sky"
                >
                  {link.label}
                  <ExternalLink aria-hidden size={13} />
                </a>
              ) : (
                <span
                  key={`${link.label}-${linkIndex}`}
                  className="inline-flex min-h-10 items-center text-xs font-semibold text-slate-500"
                >
                  {link.label}
                </span>
              )
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}
