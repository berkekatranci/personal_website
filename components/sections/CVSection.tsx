import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillCloud } from "@/components/SkillCloud";
import { Timeline } from "@/components/Timeline";
import { activities, education, experience } from "@/data/cv";
import { skillGroups } from "@/data/skills";

export function CVSection() {
  return (
    <section id="cv" className="border-b border-white/10 bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="CV"
            title="Education, practical experience, activities, and skills."
            description="A visual timeline for scanning, followed by grouped skill areas for a more traditional CV view."
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div>
              <div className="mb-5 flex items-baseline justify-between border-t border-sky/40 pt-5">
                <h3 className="display-title text-2xl">Practical Experience</h3>
                <span className="font-mono text-[10px] text-slate-500">
                  {String(experience.length).padStart(2, "0")}
                </span>
              </div>
              <Timeline entries={experience} />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div>
              <div className="mb-5 flex items-baseline justify-between border-t border-violet/40 pt-5">
                <h3 className="display-title text-2xl">Education</h3>
                <span className="font-mono text-[10px] text-slate-500">
                  {String(education.length).padStart(2, "0")}
                </span>
              </div>
              <Timeline entries={education} />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="border-t border-white/10 pt-5 lg:sticky lg:top-24">
              <h3 className="display-title text-2xl leading-8">
                Practical Experience and Activities
              </h3>
              <p className="mt-3 font-mono text-[10px] text-slate-500">
                {String(activities.length).padStart(2, "0")} entries
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.05}>
            <Timeline entries={activities} compact />
          </Reveal>
        </div>

        <Reveal className="mt-20" delay={0.06}>
          <div className="grid gap-8 lg:grid-cols-12">
            <h3 className="display-title text-2xl text-text lg:col-span-4">
              Skills
            </h3>
            <div className="lg:col-span-8">
              <SkillCloud groups={skillGroups} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
