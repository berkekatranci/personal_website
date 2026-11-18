import Link from "next/link";
import { ArrowDownRight, Mail } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { heroMetrics, socials } from "@/data/profile";

export function HeroSection() {
  return (
    <section id="home" className="border-b border-white/10 bg-ink">
      <div className="section-shell pb-14 pt-14 sm:pt-20 lg:pb-16 lg:pt-20">
        <div>
          <p className="eyebrow">AI &amp; Machine Learning Portfolio</p>
          <h1 className="display-title mt-6 max-w-[20ch] text-[2.5rem] leading-[1.14] sm:text-5xl lg:text-[4rem]">
            Berke Katrancı
          </h1>
          <p className="prose-copy mt-8 font-display text-2xl leading-relaxed text-text sm:text-3xl">
            I build intelligent systems with data, code, teams, and strategic thinking.
          </p>
          <p className="prose-copy mt-8 text-muted sm:text-lg">
            I am an M.Sc. Informatics student at TU Braunschweig focused on
            Artificial Intelligence, Data Science, Software Engineering, and
            complex systems. I turn ideas into working models, products,
            tools, communities, and long-term strategies.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/#projects"
              className="focus-ring group inline-flex min-h-12 items-center gap-6 border-b border-sky py-3 text-sm font-semibold text-text transition-colors hover:text-sky"
            >
              View Projects
              <ArrowDownRight
                aria-hidden
                size={18}
                className="transition-transform duration-[170ms] group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-focus-visible:translate-x-[3px] group-focus-visible:translate-y-[3px]"
              />
            </Link>
            <a
              href={`mailto:${socials.email}`}
              className="focus-ring inline-flex min-h-12 items-center gap-6 border-b border-white/20 py-3 text-sm font-semibold text-muted transition-colors hover:border-sky hover:text-sky"
            >
              Contact Me
              <Mail aria-hidden size={17} />
            </a>
          </div>
          <p className="prose-copy mt-10 text-muted">
            <span className="mr-2 font-mono text-[11px] uppercase text-sky">
              Currently
            </span>
            Software / AI Developer at TU Braunschweig HPC as student worker -
            1st Chairperson of{" "}
            <a
              href={socials.novaExchangeWorkshop}
              className="focus-ring font-semibold text-text underline decoration-white/30 underline-offset-4 transition-colors hover:text-sky"
            >
              NovaExchangeWorkshop
            </a>{" "}
            - M.Sc. student at TU Braunschweig
          </p>
        </div>
      </div>
      <div className="bg-night">
        <div className="content-shell grid grid-cols-1 gap-4 pb-10 min-[390px]:grid-cols-2 md:grid-cols-3">
          {heroMetrics.map((metric, index) => (
            <MetricCard key={metric.label} {...metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
