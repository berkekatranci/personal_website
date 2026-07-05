import { AlertTriangle, LineChart, Scale, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { investmentMetrics, investmentPrinciples } from "@/data/investment";

const icons = [Target, TrendingUp, ShieldCheck, Scale, LineChart, AlertTriangle];

export function InvestmentSection() {
  return (
    <section id="investing" className="bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Investment Thinking"
            title="Investment Thinking"
            description="Investing is one of the ways I study uncertainty, incentives, psychology, long-term thinking, and capital allocation. I use this section as a personal investment journal where I document my frameworks, mistakes, reflections, and selected performance metrics."
          />
        </Reveal>

        <Reveal>
          <div className="mt-10 rounded-lg border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-slate-100">
            <span className="font-semibold text-gold">Disclaimer: </span>
            The content in this section represents only my personal thoughts,
            learning process, and analysis. It is not financial advice, not
            investment advice, and not a recommendation to buy, sell, or hold
            any financial instrument. Any performance figures are personal
            tracking metrics and should not be interpreted as audited investment
            performance.
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {investmentMetrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.04}>
              <article className="surface-card p-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-mint">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm text-muted">{metric.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {investmentPrinciples.map((principle, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={principle.title} delay={index * 0.04}>
                <article className="surface-card h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
                    <Icon aria-hidden size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-text">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {principle.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
