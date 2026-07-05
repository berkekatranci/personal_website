import { AboutSection } from "@/components/sections/AboutSection";
import { AIDataSection } from "@/components/sections/AIDataSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CreativeLabSection } from "@/components/sections/CreativeLabSection";
import { CVSection } from "@/components/sections/CVSection";
import { FavoriteGamesSection } from "@/components/sections/FavoriteGamesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvestmentSection } from "@/components/sections/InvestmentSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SoftwareSection } from "@/components/sections/SoftwareSection";
import { WritingMediaSection } from "@/components/sections/WritingMediaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AIDataSection />
      <SoftwareSection />
      <LeadershipSection />
      <InvestmentSection />
      <CreativeLabSection />
      <FavoriteGamesSection />
      <WritingMediaSection />
      <CVSection />
      <ContactSection />
    </>
  );
}
