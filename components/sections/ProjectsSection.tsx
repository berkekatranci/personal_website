import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCollections } from "@/components/ProjectCollections";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { caseStudies } from "@/data/case-studies";
import {
  completedProjects,
  featuredProjects,
  ongoingProjects
} from "@/data/projects";
import caseStudyStyles from "./project-case-studies.module.css";

const showcaseProjects = featuredProjects.slice(0, 3);
const showcaseTitles = new Set(showcaseProjects.map((project) => project.title));
const completedArchive = completedProjects.filter(
  (project) => !showcaseTitles.has(project.title)
);

export function ProjectsSection() {
  return (
    <section id="projects" className="border-b border-white/10 bg-night [overflow-anchor:none]">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Featured Projects"
            title="Evidence of building, measuring, improving, and leading."
            description="Each project is framed by the problem, my role, the technical stack, and the result. The goal is to make the work easy to scan while still showing the engineering context."
          />
        </Reveal>

        <div className="mt-14 border-t border-white/10 pt-6">
          <h3 className="font-mono text-[11px] uppercase text-sky">Project case studies</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Explore the problem, approach, results and limitations behind selected AI and computer vision projects.
          </p>
          <div className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.slug}
                href={`/projects/${caseStudy.slug}`}
                className={`${caseStudyStyles.link} focus-ring group flex flex-col items-start border-t border-white/15 py-6`}
              >
                <p className="font-mono text-[10px] uppercase leading-5 text-sky">{caseStudy.category}</p>
                <h4 className="display-title mt-4 text-xl leading-snug sm:text-2xl">{caseStudy.title}</h4>
                <span className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-muted group-hover:text-sky">
                  Read case study <ArrowRight aria-hidden size={16} className="link-arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <ProjectCollections
          selected={showcaseProjects}
          finished={completedArchive}
          ongoing={ongoingProjects}
          finishedCount={completedProjects.length}
        />
      </div>
    </section>
  );
}
