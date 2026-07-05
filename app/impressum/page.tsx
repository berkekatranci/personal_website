import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Impressum - Berke Katrancı"
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
