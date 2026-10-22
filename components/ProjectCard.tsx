import type { Project } from "@/data/projects";
import { ProjectDisclosure } from "@/components/ProjectDisclosure";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return <ProjectDisclosure project={project} index={index} featured />;
}
