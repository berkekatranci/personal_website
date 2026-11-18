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
import { StructuredData } from "@/components/StructuredData";
import { createPageMetadata, profilePageSchema } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Berke Katrancı (Gariban Adam) | AI & Software Portfolio",
  description:
    "Berke Katrancı, also known as Gariban Adam: AI, machine learning and software projects, research and community leadership at TU Braunschweig.",
  path: "/"
});

export default function Home() {
  return (
    <>
      <StructuredData data={profilePageSchema("/")} />
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
