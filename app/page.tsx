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
import {
  createPageMetadata,
  defaultDescription,
  defaultTitle,
  profilePageSchema,
  websiteSchema
} from "@/lib/site";

export const metadata = createPageMetadata({
  title: defaultTitle,
  description: defaultDescription,
  path: "/"
});

export default function Home() {
  return (
    <>
      <StructuredData data={[websiteSchema, profilePageSchema("/")]} />
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
