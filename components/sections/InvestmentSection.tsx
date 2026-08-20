import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { investmentMetrics, investmentPrinciples } from "@/data/investment";

export function InvestmentSection() {
  return (
    <section id="investing" className="border-b border-white/10 bg-night">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Investment Thinking"
            title="Investment Thinking"
            description="Investing is one of the ways I study uncertainty, incentives, psychology, long-term thinking, and capital allocation. I use this section as a personal investment journal where I document my frameworks, mistakes, reflections, and selected performance metrics."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="border-l border-gold/60 pl-6 lg:sticky lg:top-24">
              <p className="font-mono text-[10px] uppercase text-gold">
                Disclaimer
              </p>
              <p className="mt-5 text-sm leading-7 text-slate-200">
                The content in this section represents only my personal thoughts,
                learning process, and analysis. It is not financial advice, not
                investment advice, and not a recommendation to buy, sell, or hold
                any financial instrument. Any performance figures are personal
                tracking metrics and should not be interpreted as audited investment
                performance.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="border-b border-white/10">
              {investmentMetrics.map((metric, index) => (
                <article
                  key={metric.label}
                  className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-white/10 py-5"
                >
                  <span className="font-mono text-[10px] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase text-muted">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-sm text-muted">{metric.detail}</p>
                  </div>
                  <p className="font-display text-2xl text-text sm:text-3xl">
                    {metric.value}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16" delay={0.06}>
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="font-mono text-[10px] uppercase text-gold lg:col-span-3">
              Decision framework
            </p>
            <div className="grid border-b border-white/10 md:grid-cols-2 lg:col-span-9">
              {investmentPrinciples.map((principle, index) => (
                <article
                  key={principle.title}
                  className="border-t border-white/10 py-6 md:odd:pr-8 md:even:border-l md:even:pl-8"
                >
                  <p className="font-mono text-[10px] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-text">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {principle.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
