import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { socials } from "@/data/profile";

const leadershipCards = [
  "Website development",
  "Speaker networking",
  "Event organization",
  "Organizational system building",
  "Public speaking",
  "Team coordination",
  "Strategic development",
  "Presentations"
];

const otherExperience = [
  "ParkRun Braunschweig leadership and organizational support since 2022",
  "Event support for Klasse! Wir singen",
  "Business Training Camp at Bogazici University",
  "Fethiye Rocket Club (FETRON) Vice President",
  "Fethiye Rocket Club (FETRON) Electronics Department Leader",
  "Class honor committee representative",
  "Math club honorary member"
];

export function LeadershipSection() {
  return (
    <section id="leadership" className="border-b border-white/10 bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Leadership & Community"
            title="Leadership & Community Building"
            description="Leadership, for me, means building systems where people can collaborate, learn, create, and grow. A strong system should eventually operate without its architect becoming the bottleneck for every decision."
          />
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <article className="grid gap-10 border-t border-gold/40 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase text-gold">
                NovaExchangeWorkshop
              </p>
              <h3 className="display-title mt-4 text-3xl leading-tight">
                1st Chairperson, cofounder, organizer, and system builder.
              </h3>
              <a
                href={socials.novaExchangeWorkshop}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-7 inline-flex min-h-11 items-center border-b border-gold text-sm font-semibold text-text transition-colors hover:text-gold"
              >
                Visit new-bs.com
              </a>
            </div>

            <div className="lg:col-span-8">
              <p className="max-w-3xl text-base leading-8 text-muted">
                Since March 2025, I have served as the 1st Chairperson of
                NovaExchangeWorkshop, a student association focused on
                entrepreneurship and investing. I cofounded NEW with seven
                people and work on the website, speaker connections,
                organizational systems, events, network expansion, and
                presentations in front of audiences.
              </p>
              <div className="mt-8 grid border-b border-white/10 sm:grid-cols-2">
                {leadershipCards.map((card, index) => (
                  <div
                    key={card}
                    className="grid grid-cols-[2.5rem_1fr] border-t border-white/10 py-4 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                  >
                    <span className="font-mono text-[10px] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium text-text">{card}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-16" delay={0.06}>
          <div className="grid gap-8 lg:grid-cols-12">
            <h3 className="font-display text-2xl text-text lg:col-span-4">
              Additional leadership and community signals
            </h3>
            <ol className="border-b border-white/10 lg:col-span-8">
              {otherExperience.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[3rem_1fr] border-t border-white/10 py-4 text-sm leading-7 text-muted"
                >
                  <span className="font-mono text-[10px] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
