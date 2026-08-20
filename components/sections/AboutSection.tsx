import { ProfilePillarCard } from "@/components/ProfilePillarCard";
import { RecruiterSummary } from "@/components/RecruiterSummary";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profilePillars } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="border-b border-white/10 bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="About"
            title="A systems-minded builder across AI, software, teams, and strategy."
            description="My work connects technical depth with practical execution. AI models are data systems. Software projects are technical systems. Organizations are human systems. Investing is information gathering and decision-making systems. 3D design is spatial and visual systems thinking. Games and NP-hard problems are optimization systems."
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <RecruiterSummary />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.06}>
            <div className="border-b border-white/10">
              {profilePillars.map((pillar, index) => (
                <ProfilePillarCard key={pillar.title} {...pillar} index={index} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
