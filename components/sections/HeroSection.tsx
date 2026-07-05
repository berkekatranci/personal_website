import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Reveal } from "@/components/Reveal";
import { coreThesis, heroMetrics, socials } from "@/data/profile";

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <Image
        src="/images/hero-systems.png"
        alt="Abstract intelligent systems visualization"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />

      <div className="section-shell relative pt-24 lg:pt-28">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">AI / Data / Software / Strategy</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-text sm:text-6xl lg:text-7xl">
            I build intelligent systems with data, code, teams, and strategic
            thinking.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
            I am an M.Sc. Informatics student at TU Braunschweig focused on Artificial
            Intelligence, Data Science, Software Engineering, and complex
            systems. I turn ideas into working models, products, tools, communities, and
            long-term strategies.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#projects"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-sky px-5 py-3 text-sm font-semibold text-ink transition hover:bg-cyan-300"
            >
              View Projects
              <ArrowRight aria-hidden size={18} />
            </Link>
            <a
              href={`mailto:${socials.email}`}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-muted transition hover:border-sky/50 hover:text-sky"
            >
              <Mail aria-hidden size={18} />
              Contact Me
            </a>
          </div>

          <p className="mt-8 max-w-3xl rounded-lg border border-white/10 bg-ink/70 px-4 py-3 text-sm leading-7 text-muted">
            Currently: Software / AI Developer at TU Braunschweig HPC as
            student worker - 1st Chairperson of{" "}
            <a
              href={socials.novaExchangeWorkshop}
              className="font-semibold text-sky underline decoration-sky/40 underline-offset-4"
            >
              NovaExchangeWorkshop
            </a>{" "}
            - M.Sc. student at TU Braunschweig
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heroMetrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.04}>
              <MetricCard {...metric} index={index} />
            </Reveal>
          ))}
        </div>

        <p className="mt-12 max-w-4xl text-xl font-medium leading-9 text-text">
          {coreThesis}
        </p>
      </div>
    </section>
  );
}
