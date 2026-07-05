import { Box, Gamepad2, Palette, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";
import { ThreeDModelCard } from "@/components/ThreeDModelCard";
import { creativeFocus, hobbies, modelGallery } from "@/data/creative";

export function CreativeLabSection() {
  return (
    <section id="creative" className="bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Creative Lab"
            title="Creative Lab"
            description="Creativity is not separate from technology for me. Digital sculpting, 3D object design, image editing, video editing, games, physics, philosophy, mathematics, and robotics all train different forms of thinking."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <article className="surface-card p-6">
            <Palette aria-hidden className="text-sky" size={24} />
            <h3 className="mt-4 text-lg font-semibold text-text">
              Visual systems
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Blender, digital sculpting, 3D object design, image editing, and
              video editing sharpen spatial reasoning and design judgment.
            </p>
          </article>
          <article className="surface-card p-6">
            <Gamepad2 aria-hidden className="text-gold" size={24} />
            <h3 className="mt-4 text-lg font-semibold text-text">
              Games as systems
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Complex games combine incentives, constraints, optimization,
              uncertainty, feedback loops, and long-term strategy.
            </p>
          </article>
          <article className="surface-card p-6">
            <Sparkles aria-hidden className="text-violet" size={24} />
            <h3 className="mt-4 text-lg font-semibold text-text">
              Intellectual range
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              Physics, philosophy, mathematics, and robotics add different
              lenses for understanding technical and human systems.
            </p>
          </article>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <div className="surface-card p-6">
              <Box aria-hidden className="text-sky" size={24} />
              <h3 className="mt-4 text-lg font-semibold text-text">
                Focus areas
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {creativeFocus.map((item) => (
                  <SkillBadge key={item}>{item}</SkillBadge>
                ))}
              </div>
              <h3 className="mt-8 text-lg font-semibold text-text">Hobbies</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {hobbies.map((item) => (
                  <SkillBadge key={item}>{item}</SkillBadge>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {modelGallery.map((model, index) => (
              <Reveal key={model.title} delay={index * 0.04}>
                <ThreeDModelCard model={model} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
