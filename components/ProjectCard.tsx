import type { Project } from "@/data/projects";
import { ProjectDisclosure } from "@/components/ProjectDisclosure";

type ProjectCardProps = {
  project: Project;
  index?: number;
  visible?: boolean;
};

export function ProjectCard({ project, index = 0, visible = true }: ProjectCardProps) {
  return (
    <div data-project-filter-row="" hidden={!visible}>
      <ProjectDisclosure project={project} index={index} featured />
    </div>
  );
}
