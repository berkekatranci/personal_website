import { ProfilePillarCard } from "@/components/ProfilePillarCard";
import { RecruiterSummary } from "@/components/RecruiterSummary";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profilePillars } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="bg-ink">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-start">
          <Reveal>
            <SectionHeader
              eyebrow="About"
              title="A systems-minded builder across AI, software, teams, and strategy."
              description="My work connects technical depth with practical execution. AI models are data systems. Software projects are technical systems. Organizations are human systems. Investing is information gathering and decision-making systems. 3D design is spatial and visual systems thinking. Games and NP-hard problems are optimization systems."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <RecruiterSummary />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {profilePillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.04}>
              <ProfilePillarCard {...pillar} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
