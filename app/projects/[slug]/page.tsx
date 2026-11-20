import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { LaneDetectionDemo } from "@/components/LaneDetectionDemo";
import { SkillBadge } from "@/components/SkillBadge";
import { StructuredData } from "@/components/StructuredData";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { socials } from "@/data/profile";
import { absoluteUrl, createPageMetadata } from "@/lib/site";

type ProjectPageProps = {
  params: { slug: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  const caseStudy = getCaseStudy(params.slug);

  if (!caseStudy) notFound();

  return createPageMetadata({
    title: `${caseStudy.title} | Berke Katrancı`,
    description: caseStudy.description,
    path: `/projects/${caseStudy.slug}`
  });
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const caseStudy = getCaseStudy(params.slug);

  if (!caseStudy) notFound();

  const relatedStudies = caseStudies.filter(({ slug }) => slug !== caseStudy.slug);
  const hasLaneDemo = caseStudy.slug === "lane-detection";

  return (
    <article className="bg-ink">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/#projects") },
            { "@type": "ListItem", position: 3, name: caseStudy.title, item: absoluteUrl(`/projects/${caseStudy.slug}`) }
          ]
        }}
      />
      <header className="section-shell border-b border-white/10">
        <nav aria-label="Breadcrumb" className="mb-12 text-sm leading-6 text-muted">
          <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <li>
              <Link href="/" className="focus-ring transition-colors hover:text-sky">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#projects" className="focus-ring transition-colors hover:text-sky">Projects</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text">{caseStudy.title}</li>
          </ol>
        </nav>

        <p className="eyebrow">Project case study · {caseStudy.category}</p>
        <h1 className="display-title mt-6 max-w-[24ch] text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {caseStudy.title}
        </h1>
        <p className="prose-copy mt-8 text-muted sm:text-lg">{caseStudy.overview}</p>
        <p className="mt-5 text-sm text-muted">By Berke Katrancı</p>

        <dl className="mt-12 grid gap-7 border-t border-white/10 pt-7 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          {[
            ["My role", caseStudy.role],
            ["Context", caseStudy.context],
            ["Status", caseStudy.status]
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[11px] uppercase text-sky">{label}</dt>
              <dd className="mt-3 text-sm leading-7 text-muted">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="section-shell grid items-start gap-12 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-16">
        <aside className="border-t border-white/10 pt-6 lg:sticky lg:top-24">
          <h2 className="font-mono text-[11px] uppercase text-sky">Technologies</h2>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {caseStudy.techStack.map((tech) => <SkillBadge key={tech}>{tech}</SkillBadge>)}
          </div>
          <nav aria-label="In this case study" className="mt-10">
            <h2 className="font-mono text-[11px] uppercase text-sky">On this page</h2>
            <ul className="mt-4 space-y-3">
              {caseStudy.sections.map(({ id, title }) => (
                <li key={id}>
                  <a href={`#${id}`} className="focus-ring inline-block py-1 text-sm leading-6 text-muted transition-colors hover:text-sky">
                    {title}
                  </a>
                </li>
              ))}
              {hasLaneDemo ? (
                <li>
                  <a href="#lane-demo" className="focus-ring inline-block py-1 text-sm leading-6 text-muted transition-colors hover:text-sky">
                    Interactive demo
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 space-y-14">
          {caseStudy.sections.map((section) => (
            <section key={section.id} id={section.id} className="border-t border-white/10 pt-6">
              <h2 className="display-title text-2xl leading-tight sm:text-3xl">{section.title}</h2>
              <div className="mt-6 space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="prose-copy text-muted">{paragraph}</p>
                ))}
                {section.points ? (
                  <ul className="max-w-[60ch] list-disc space-y-3 pl-5 text-base leading-8 text-muted marker:text-sky">
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                ) : null}
              </div>
              {hasLaneDemo && section.id === "approach" ? (
                <LaneDetectionDemo />
              ) : null}
            </section>
          ))}

          <div className="border-t border-sky/40 pt-7">
            <h2 className="display-title text-2xl sm:text-3xl">Discuss this project</h2>
            <p className="prose-copy mt-5 text-muted">
              Get in touch to discuss the approach, my contribution or related AI and software work.
            </p>
            <a href={`mailto:${socials.email}`} className="focus-ring group mt-5 inline-flex min-h-12 items-center gap-3 border-b border-sky py-3 text-sm font-semibold text-text transition-colors hover:text-sky">
              Contact Berke <ArrowRight aria-hidden size={17} className="link-arrow" />
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 bg-night">
        <div className="section-shell">
          <h2 className="display-title text-2xl sm:text-3xl">More project case studies</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {relatedStudies.map((relatedStudy) => (
              <Link key={relatedStudy.slug} href={`/projects/${relatedStudy.slug}`} className="focus-ring group border-t border-white/15 py-6 transition-colors hover:bg-white/[0.02]">
                <p className="font-mono text-[10px] uppercase text-sky">{relatedStudy.category}</p>
                <h3 className="display-title mt-4 text-xl leading-snug sm:text-2xl">{relatedStudy.title}</h3>
                <span className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-muted group-hover:text-sky">
                  Read case study <ArrowRight aria-hidden size={16} className="link-arrow" />
                </span>
              </Link>
            ))}
          </div>
          <Link href="/#projects" className="focus-ring mt-8 inline-flex min-h-11 items-center gap-3 text-sm text-muted transition-colors hover:text-sky">
            <ArrowUpLeft aria-hidden size={17} /> Back to all projects
          </Link>
        </div>
      </footer>
    </article>
  );
}
