import type { SkillGroup } from "@/data/skills";
import { SkillBadge } from "@/components/SkillBadge";

type SkillCloudProps = {
  groups: SkillGroup[];
};

export function SkillCloud({ groups }: SkillCloudProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {groups.map((group) => (
        <article key={group.title} className="surface-card p-5">
          <h3 className="text-sm font-semibold text-text">{group.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <SkillBadge key={skill}>{skill}</SkillBadge>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
