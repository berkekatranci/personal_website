"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useId, useState } from "react";
import { SkillBadge } from "@/components/SkillBadge";
import { inertProps } from "@/components/inertProps";
import { useMeasuredHeight } from "@/components/useMeasuredHeight";
import type { Project } from "@/data/projects";

type ProjectDisclosureProps = {
  project: Project;
  index: number;
  featured?: boolean;
  active?: boolean;
};

export function ProjectDisclosure({ project, index, featured = false, active = false }: ProjectDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const triggerId = `project-trigger-${id}`;
  const panelId = `project-panel-${id}`;
  const reducedMotion = useReducedMotion();
  const { contentRef, contentHeight } = useMeasuredHeight();
  const transition = { duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };
  const statusClass = project.status === "Finished" ? "text-mint" : "text-gold";

  return (
    <article className={`border-t border-white/15 ${featured ? "py-3 sm:py-5" : ""} ${active ? "border-l border-l-gold/40 pl-4 sm:pl-6" : ""}`}>
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((value) => !value)}
          className="focus-ring group grid min-h-20 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-5 gap-y-3 py-6 text-left transition-colors hover:text-sky sm:grid-cols-[2rem_minmax(0,1fr)_auto]"
        >
          <span className="hidden font-mono text-[11px] text-slate-500 sm:block">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[11px] uppercase leading-5 text-sky">{project.category}</span>
            <span className={`display-title mt-3 block leading-tight ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
              {project.title}
            </span>
            {!featured ? (
              <span className={`mt-3 block font-mono text-[11px] uppercase ${statusClass}`}>{project.status}</span>
            ) : null}
          </span>
          <span className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-2 text-muted group-hover:text-sky">
            <motion.span
              aria-hidden
              className="inline-flex"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={transition}
            >
              <ChevronDown size={20} />
            </motion.span>
            <span className="text-xs">{isOpen ? "Close" : "Open"}</span>
          </span>
        </button>
      </h3>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        initial={false}
        animate={{ height: isOpen ? contentHeight : 0, opacity: isOpen ? 1 : 0 }}
        transition={transition}
        className={`overflow-hidden ${isOpen ? "" : "pointer-events-none"}`}
      >
        <div ref={contentRef} {...inertProps(!isOpen)} className="pb-8 pt-3 sm:pl-7">
          <p className={`mb-7 font-mono text-[11px] uppercase ${statusClass}`}>{project.status}</p>
          <dl className="grid gap-7">
            {[
              ["Problem", project.problem],
              ["My role", project.role],
              ["Result", project.result]
            ].map(([label, value]) => (
              <div key={label} className="grid gap-3 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-6">
                <dt className="font-mono text-[11px] uppercase leading-8 text-slate-500">{label}</dt>
                <dd className="prose-copy text-muted">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 pt-5">
            {project.techStack.map((tech) => (
              <SkillBadge key={tech}>{tech}</SkillBadge>
            ))}
          </div>
          {project.links?.length ? (
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {project.links.map((link, linkIndex) =>
                !link.label ? null : link.href ? (
                  <a
                    key={`${link.label}-${linkIndex}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring group inline-flex min-h-11 items-center gap-2 pr-1 text-sm font-semibold text-text transition-colors hover:text-sky"
                  >
                    {link.label}
                    <ExternalLink aria-hidden size={15} className="link-arrow" />
                  </a>
                ) : (
                  <span key={`${link.label}-${linkIndex}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-500">
                    {link.label}
                  </span>
                )
              )}
            </div>
          ) : null}
        </div>
      </motion.div>
    </article>
  );
}
