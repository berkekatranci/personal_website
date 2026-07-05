import { AppWindow, Braces, Cloud, Code2, Layers3 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";

const groups = [
  {
    title: "Programming Languages",
    icon: Code2,
    items: ["Java", "Python", "C++", "C#"]
  },
  {
    title: "Databases and Platforms",
    icon: Cloud,
    items: ["SQL", "MariaDB", "MongoDB", "AWS"]
  },
  {
    title: "Applications and Tools",
    icon: AppWindow,
    items: [
      "Unity",
      "Android Studio",
      "Blender",
      "Adobe Photoshop",
      "Adobe After Effects",
      "MS Office"
    ]
  },
  {
    title: "Engineering Principles",
    icon: Braces,
    items: [
      "Clean structure",
      "Clear naming",
      "Modularity",
      "Documentation",
      "Practical usability"
    ]
  },
  {
    title: "Software Projects",
    icon: Layers3,
    items: ["Web apps", "Visualizations", "Tools", "Interfaces", "Experiments"]
  }
];

export function SoftwareSection() {
  return (
    <section id="software" className="bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Software Engineering"
            title="Software Engineering"
            description="I see software engineering as the process of transforming ideas into reliable, usable, and maintainable systems. I enjoy building applications, tools, visualizations, interfaces, and experiments that connect logic with real-world use."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={index * 0.04}>
                <article className="surface-card h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-violet/30 bg-violet/10 text-violet">
                    <Icon aria-hidden size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-text">
                    {group.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <SkillBadge key={item}>{item}</SkillBadge>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-10 max-w-4xl text-base leading-8 text-muted">
            I am comfortable learning new technologies when a project requires
            them, and I value clean structure, clear naming, modularity,
            documentation, and practical usability.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
