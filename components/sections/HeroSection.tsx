import Link from "next/link";
import { ArrowDownRight, Mail } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Reveal } from "@/components/Reveal";
import { coreThesis, heroMetrics, socials } from "@/data/profile";

export function HeroSection() {
  return (
    <section id="home" className="border-b border-white/10 bg-ink">
      <div className="section-shell pb-16 pt-14 sm:pt-20 lg:py-10">
        <Reveal>
          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <p className="font-mono text-[10px] uppercase text-slate-500">
                Portfolio / 2026
              </p>
              <p className="mt-3 text-lg font-medium text-text">
                Berke Katrancı
              </p>
              <p className="mt-2 max-w-44 text-sm leading-6 text-muted">
                AI / Data / Software / Strategy
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="eyebrow">Systems thesis</p>
              <h1 className="display-title mt-5 max-w-4xl text-4xl leading-[1.05] sm:text-5xl lg:text-[4rem]">
                I build intelligent systems with data, code, teams, and strategic
                thinking.
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                I am an M.Sc. Informatics student at TU Braunschweig focused on
                Artificial Intelligence, Data Science, Software Engineering, and
                complex systems. I turn ideas into working models, products,
                tools, communities, and long-term strategies.
              </p>
            </div>

            <aside className="flex flex-col justify-between border-l border-white/10 pl-6 lg:col-span-3 lg:pl-8">
              <blockquote className="font-display text-2xl leading-8 text-text">
                “{coreThesis}”
              </blockquote>

              <div className="mt-10">
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/#projects"
                    className="focus-ring group inline-flex min-h-12 items-center justify-between border-b border-sky py-3 text-sm font-semibold text-text transition-colors hover:text-sky"
                  >
                    View Projects
                    <ArrowDownRight
                      aria-hidden
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <a
                    href={`mailto:${socials.email}`}
                    className="focus-ring inline-flex min-h-12 items-center justify-between border-b border-white/20 py-3 text-sm font-semibold text-muted transition-colors hover:border-sky hover:text-sky"
                  >
                    Contact Me
                    <Mail aria-hidden size={17} />
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <p className="mt-9 border-t border-white/10 pt-5 text-sm leading-7 text-muted lg:ml-[16.666667%] lg:max-w-5xl lg:pl-8">
            <span className="mr-2 font-mono text-[10px] uppercase text-sky">
              Currently
            </span>
            Software / AI Developer at TU Braunschweig HPC as student worker -
            1st Chairperson of{" "}
            <a
              href={socials.novaExchangeWorkshop}
              className="font-semibold text-text underline decoration-white/30 underline-offset-4 transition-colors hover:text-sky"
            >
              NovaExchangeWorkshop
            </a>{" "}
            - M.Sc. student at TU Braunschweig
          </p>
        </Reveal>
      </div>

      <div className="border-t border-white/10 bg-night">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-6 lg:px-12">
          {heroMetrics.map((metric, index) => (
            <MetricCard key={metric.label} {...metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
