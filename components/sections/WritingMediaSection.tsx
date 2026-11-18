import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { writingItems } from "@/data/writing";

export function WritingMediaSection() {
  return (
    <section id="writing" className="border-b border-white/10 bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Writing & Media"
            title="Writing & Media"
            description="I publish technical and reflective content to document my learning process, explain projects, and share ideas about AI, machine learning, software, investing, and personal development."
          />
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <div className="border-b border-white/10">
            {writingItems.map((item, index) => {
              const isInternal = item.href?.startsWith("/");
              const content = (
                <>
                  <span className="font-mono text-[10px] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-sky">
                    {item.type}
                  </span>
                  <span className="col-start-2 sm:col-start-auto">
                    <h3 className="font-semibold text-text">
                      {item.title}
                    </h3>
                    <span className="mt-2 block max-w-2xl text-sm leading-7 text-muted">
                      {item.description}
                    </span>
                  </span>
                  <span className="hidden justify-self-end text-muted sm:block">
                    {item.href ? (isInternal ? <ArrowUpRight aria-hidden size={16} className="link-arrow" /> : <ExternalLink aria-hidden size={16} className="link-arrow" />) : "—"}
                  </span>
                </>
              );

              return item.href && isInternal ? (
                <Link
                  key={item.title}
                  href={item.href}
                  className="focus-ring group grid min-h-24 grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-white/10 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[3rem_7rem_minmax(0,1fr)_2rem]"
                >
                  {content}
                </Link>
              ) : item.href ? (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring group grid min-h-24 grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-white/10 py-5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[3rem_7rem_minmax(0,1fr)_2rem]"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.title}
                  className="grid min-h-24 grid-cols-[2.5rem_1fr] gap-4 border-t border-white/10 py-5 sm:grid-cols-[3rem_7rem_1fr_2rem]"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
