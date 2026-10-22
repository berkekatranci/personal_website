import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";

const groups = [
  {
    title: "Programming Languages",
    items: ["Java", "Python", "C++", "C#"]
  },
  {
    title: "Databases and Platforms",
    items: ["SQL", "MariaDB", "MongoDB", "AWS"]
  },
  {
    title: "Applications and Tools",
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
    items: ["Web apps", "Visualizations", "Tools", "Interfaces", "Experiments"]
  }
];

export function SoftwareSection() {
  return (
    <section id="software" className="border-b border-white/10 bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Software Engineering"
            title="Software Engineering"
            description="I see software engineering as the process of transforming ideas into reliable, usable, and maintainable systems. I enjoy building applications, tools, visualizations, interfaces, and experiments that connect logic with real-world use."
          />
        </Reveal>

        <div className="mt-14 grid gap-10">
          <Reveal className="max-w-[60ch]">
            <p className="border-l border-violet/50 pl-5 font-display text-2xl leading-8 text-text lg:sticky lg:top-24">
              I am comfortable learning new technologies when a project requires
              them, and I value clean structure, clear naming, modularity,
              documentation, and practical usability.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="border-b border-white/10">
              {groups.map((group, index) => (
                <article
                  key={group.title}
                  className="text-row grid gap-3 border-t border-white/10 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-5"
                >
                  <span className="font-mono text-[10px] text-violet sm:row-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-text">{group.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.items.map((item) => (
                      <SkillBadge key={item}>{item}</SkillBadge>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
