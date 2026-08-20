import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { socials } from "@/data/profile";

const contactLinks = [
  {
    label: "Email",
    value: "b.katranci@tu-braunschweig.de",
    href: `mailto:${socials.email}`
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/berke-katrancı",
    href: socials.linkedin
  },
  {
    label: "Instagram",
    value: "instagram.com/berkekatranc",
    href: socials.instagram
  }
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            title="Let's build something intelligent."
            description="I am always interested in meaningful conversations around AI, software engineering, data, entrepreneurship, investing, research, and creative technology."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <div className="border-l border-sky/40 pl-6">
              <p className="font-mono text-[10px] uppercase text-sky">Topics</p>
              <p className="mt-4 font-display text-2xl leading-8 text-text">
                AI, software, data, investing, student communities, and creative
                technology.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.05}>
            <div className="border-b border-white/10">
              {contactLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="focus-ring group grid min-h-24 grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-white/10 py-5"
                >
                  <span className="font-mono text-[10px] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase text-muted">
                      {link.label}
                    </span>
                    <span className="mt-2 block break-all text-base text-text sm:text-lg">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={18}
                    className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky"
                  />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
