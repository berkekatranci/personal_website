import { CalendarDays, Globe2, Mic2, Network, Presentation, Route, Settings2, UsersRound } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { socials } from "@/data/profile";

const leadershipCards = [
  { title: "Website development", icon: Globe2 },
  { title: "Speaker networking", icon: Network },
  { title: "Event organization", icon: CalendarDays },
  { title: "Organizational system building", icon: Settings2 },
  { title: "Public speaking", icon: Mic2 },
  { title: "Team coordination", icon: UsersRound },
  { title: "Strategic development", icon: Route },
  { title: "Presentations", icon: Presentation }
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
    <section id="leadership" className="bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Leadership & Community"
            title="Leadership & Community Building"
            description="Leadership, for me, means building systems where people can collaborate, learn, create, and grow. A strong system should eventually operate without its architect becoming the bottleneck for every decision."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="surface-card p-6">
              <p className="eyebrow">NovaExchangeWorkshop</p>
              <h3 className="mt-4 text-2xl font-semibold text-text">
                1st Chairperson, cofounder, organizer, and system builder.
              </h3>
              <p className="mt-5 text-sm leading-7 text-muted">
                Since March 2025, I have served as the 1st Chairperson of
                NovaExchangeWorkshop, a student association focused on
                entrepreneurship and investing. I cofounded NEW with seven
                people and work on the website, speaker connections,
                organizational systems, events, network expansion, and
                presentations in front of audiences.
              </p>
              <a
                href={socials.novaExchangeWorkshop}
                className="focus-ring mt-6 inline-flex rounded-lg border border-sky/30 bg-sky/10 px-4 py-2 text-sm font-semibold text-sky transition hover:bg-sky/20"
              >
                Visit new-bs.com
              </a>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {leadershipCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={index * 0.035}>
                  <article className="surface-card flex items-center gap-4 p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                      <Icon aria-hidden size={19} />
                    </span>
                    <h3 className="text-sm font-semibold leading-6 text-text">
                      {card.title}
                    </h3>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-10 surface-card p-6">
          <h3 className="text-lg font-semibold text-text">
            Additional leadership and community signals
          </h3>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {otherExperience.map((item) => (
              <p
                key={item}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-muted"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
