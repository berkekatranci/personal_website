import { ProjectDisclosure } from "@/components/ProjectDisclosure";
import type { Project } from "@/data/projects";

type ProjectArchiveProps = {
  projects: Project[];
  startIndex?: number;
  tone?: "finished" | "active";
  isVisible?: (project: Project) => boolean;
};

export function ProjectArchive({ projects, startIndex = 0, tone = "finished", isVisible }: ProjectArchiveProps) {
  return (
    <div className="border-b border-white/10">
      {projects.map((project, index) => (
        <div key={`${project.title}-${index}`} data-project-filter-row="" hidden={isVisible ? !isVisible(project) : false}>
          <ProjectDisclosure project={project} index={startIndex + index} active={tone === "active"} />
        </div>
      ))}
    </div>
  );
}
