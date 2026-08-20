import type { SkillGroup } from "@/data/skills";
import { SkillBadge } from "@/components/SkillBadge";

type SkillCloudProps = {
  groups: SkillGroup[];
};

export function SkillCloud({ groups }: SkillCloudProps) {
  return (
    <div className="border-b border-white/10">
      {groups.map((group) => (
        <article
          key={group.title}
          className="grid gap-4 border-t border-white/10 py-5 sm:grid-cols-[11rem_1fr]"
        >
          <h3 className="font-mono text-[10px] uppercase text-text">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {group.skills.map((skill) => (
              <SkillBadge key={skill}>{skill}</SkillBadge>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
