import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillCloud } from "@/components/SkillCloud";
import { Timeline } from "@/components/Timeline";
import { activities, education, experience } from "@/data/cv";
import { skillGroups } from "@/data/skills";

export function CVSection() {
  return (
    <section id="cv" className="bg-mesh-dark">
      <div className="section-shell">
        <div className="grid gap-8 lg:max-w-4xl">
          <Reveal>
            <SectionHeader
              eyebrow="CV"
              title="Education, practical experience, activities, and skills."
              description="A visual timeline for scanning, followed by grouped skill areas for a more traditional CV view."
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <Timeline entries={[...experience, ...education]} />
          </Reveal>

          <div className="grid gap-8">
            <Reveal>
              <div>
                <h3 className="text-xl font-semibold text-text">
                  Practical Experience and Activities
                </h3>
                <div className="mt-5 grid gap-3">
                  {activities.map((entry) => (
                    <article
                      key={`${entry.period}-${entry.title}`}
                      className="rounded-lg border border-white/10 bg-panel/70 p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-semibold text-text">
                            {entry.title}
                          </h4>
                          {entry.organization ? (
                            <p className="mt-1 text-xs text-sky">
                              {entry.organization}
                            </p>
                          ) : null}
                        </div>
                        <p className="font-mono text-xs text-muted">
                          {entry.period}
                        </p>
                      </div>
                      {entry.description ? (
                        <p className="mt-3 text-sm leading-6 text-muted">
                          {entry.description}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <h3 className="mb-5 text-xl font-semibold text-text">Skills</h3>
                <SkillCloud groups={skillGroups} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
