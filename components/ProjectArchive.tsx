import { ProjectDisclosure } from "@/components/ProjectDisclosure";
import type { Project } from "@/data/projects";

type ProjectArchiveProps = {
  projects: Project[];
  startIndex?: number;
  tone?: "finished" | "active";
};

export function ProjectArchive({ projects, startIndex = 0, tone = "finished" }: ProjectArchiveProps) {
  return (
    <div className="border-b border-white/10">
      {projects.map((project, index) => (
        <ProjectDisclosure
          key={`${project.title}-${index}`}
          project={project}
          index={startIndex + index}
          active={tone === "active"}
        />
      ))}
    </div>
  );
}
