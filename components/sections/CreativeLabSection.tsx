import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";
import { ThreeDModelCard } from "@/components/ThreeDModelCard";
import { creativeFocus, hobbies, modelGallery } from "@/data/creative";

const creativeNotes = [
  {
    title: "Visual systems",
    text: "Blender, digital sculpting, 3D object design, image editing, and video editing sharpen spatial reasoning and design judgment."
  },
  {
    title: "Games as systems",
    text: "Complex games combine incentives, constraints, optimization, uncertainty, feedback loops, and long-term strategy."
  },
  {
    title: "Intellectual range",
    text: "Physics, philosophy, mathematics, and robotics add different lenses for understanding technical and human systems."
  }
];

export function CreativeLabSection() {
  return (
    <section id="creative" className="border-b border-white/10 bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Creative Lab"
            title="Creative Lab"
            description="Creativity is not separate from technology for me. Digital sculpting, 3D object design, image editing, video editing, games, physics, philosophy, mathematics, and robotics all train different forms of thinking."
          />
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <div className="grid border-b border-white/10 md:grid-cols-3">
            {creativeNotes.map((note, index) => (
              <article
                key={note.title}
                className="border-t border-white/10 py-6 md:px-6 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l"
              >
                <p className="font-mono text-[10px] text-violet">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-text">
                  {note.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{note.text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="grid gap-8 lg:sticky lg:top-24">
              <div className="border-t border-white/10 pt-5">
                <h3 className="font-mono text-[10px] uppercase text-text">
                  Focus areas
                </h3>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {creativeFocus.map((item) => (
                    <SkillBadge key={item}>{item}</SkillBadge>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 pt-5">
                <h3 className="font-mono text-[10px] uppercase text-text">
                  Hobbies
                </h3>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {hobbies.map((item) => (
                    <SkillBadge key={item}>{item}</SkillBadge>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.05}>
            <div className="grid gap-5 md:grid-cols-3">
              {modelGallery.map((model) => (
                <ThreeDModelCard key={model.title} model={model} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
