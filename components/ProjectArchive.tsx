import { ChevronDown, ExternalLink } from "lucide-react";
import { SkillBadge } from "@/components/SkillBadge";
import type { Project } from "@/data/projects";

type ProjectArchiveProps = {
  projects: Project[];
  startIndex?: number;
  tone?: "finished" | "active";
};

export function ProjectArchive({
  projects,
  startIndex = 0,
  tone = "finished"
}: ProjectArchiveProps) {
  return (
    <div className="border-b border-white/10">
      {projects.map((project, index) => (
        <details
          key={`${project.title}-${index}`}
          className={`group border-t border-white/10 ${
            tone === "active" ? "border-l border-l-gold/40 pl-4 sm:pl-6" : ""
          }`}
        >
          <summary className="focus-ring grid min-h-20 cursor-pointer list-none items-center gap-4 py-5 marker:content-none sm:grid-cols-[3rem_1.5fr_1fr_auto] [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-[10px] text-slate-500">
              {String(startIndex + index + 1).padStart(2, "0")}
            </span>
            <span className="font-medium leading-6 text-text">
              {project.title}
            </span>
            <span className="hidden font-mono text-[10px] uppercase text-muted sm:block">
              {project.category}
            </span>
            <span className="flex items-center gap-3">
              <span
                className={`font-mono text-[10px] uppercase ${
                  project.status === "Finished" ? "text-mint" : "text-gold"
                }`}
              >
                {project.status}
              </span>
              <ChevronDown
                aria-hidden
                size={16}
                className="text-muted transition-transform duration-300 group-open:rotate-180"
              />
            </span>
          </summary>

          <div className="pb-8 sm:pl-[3rem]">
            <p className="mb-6 font-mono text-[10px] uppercase text-muted sm:hidden">
              {project.category}
            </p>
            <div className="grid gap-6 lg:grid-cols-3">
              {[
                ["Problem", project.problem],
                ["My role", project.role],
                ["Result", project.result]
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-[10px] uppercase text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-5">
              {project.techStack.map((tech) => (
                <SkillBadge key={tech}>{tech}</SkillBadge>
              ))}
            </div>

            {project.links?.length ? (
              <div className="mt-5 flex flex-wrap gap-4">
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
        </details>
      ))}
    </div>
  );
}
