import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/site";

export const metadata = {
  ...createPageMetadata({
    title: "Impressum | Berke Katrancı",
    description: "Provider information for Berke Katrancı's personal portfolio.",
    path: "/impressum"
  }),
  robots: { index: false, follow: true }
};

export default function ImpressumPage() {
  return (
    <section className="section-shell min-h-[70vh]">
      <SectionHeader
        eyebrow="Legal"
        title="Impressum"
        description="This page is a placeholder for legally required provider information."
      />
      <div className="mt-10 max-w-3xl space-y-6 text-sm leading-7 text-muted">
        <p>
          Replace this placeholder with the correct legal information before
          publishing the website. Depending on jurisdiction, this may include
          your full name, address, contact information, responsible person,
          registration details, tax information, and content responsibility
          statements.
        </p>
        <p>
          Berke Katrancı
          <br />
          Address: [Add manually]
          <br />
          Email: b.katranci@tu-braunschweig.de
        </p>
      </div>
    </section>
  );
}
