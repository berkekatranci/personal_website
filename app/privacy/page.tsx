import { SectionHeader } from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/site";

export const metadata = {
  ...createPageMetadata({
    title: "Privacy | Berke Katrancı",
    description: "Privacy information for Berke Katrancı's personal portfolio.",
    path: "/privacy"
  }),
  robots: { index: false, follow: true }
};

export default function PrivacyPage() {
  return (
    <section className="section-shell min-h-[70vh]">
      <SectionHeader
        eyebrow="Legal"
        title="Privacy"
        description="This page is a placeholder for the website privacy policy."
      />
      <div className="mt-10 max-w-3xl space-y-6 text-sm leading-7 text-muted">
        <p>
          Replace this text with a complete privacy policy before publishing.
          Include information about hosting, analytics, cookies, embedded media,
          external links, and user rights under the applicable privacy law.
        </p>
        <p>
          The current site does not submit form data or write to a database. If
          you later add a backend, newsletter, analytics, or contact workflow,
          update this page to explain how personal data is processed.
        </p>
      </div>
    </section>
  );
}
