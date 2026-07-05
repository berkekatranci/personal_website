import { ExternalLink, Newspaper, PenLine, Video } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { writingItems } from "@/data/writing";

const icons = [PenLine, Video, Newspaper, ExternalLink];

export function WritingMediaSection() {
  return (
    <section id="writing" className="bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Writing & Media"
            title="Writing & Media"
            description="I publish technical and reflective content to document my learning process, explain projects, and share ideas about AI, machine learning, software, investing, and personal development."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {writingItems.map((item, index) => {
            const Icon = icons[index % icons.length];
            const card = (
              <article className="surface-card h-full p-6 transition hover:-translate-y-1 hover:border-sky/40">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-sky/30 bg-sky/10 text-sky">
                  <Icon aria-hidden size={20} />
                </span>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {item.type}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            );

            return (
              <Reveal key={item.title} delay={index * 0.04}>
                {item.href ? (
                  <a href={item.href} className="focus-ring block rounded-lg">
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
