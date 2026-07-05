import { Instagram, Linkedin, Mail, MessagesSquare } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { socials } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <Reveal>
            <SectionHeader
              eyebrow="Contact"
              title="Let's build something intelligent."
              description="I am always interested in meaningful conversations around AI, software engineering, data, entrepreneurship, investing, research, and creative technology."
            />
          </Reveal>

          <div className="grid gap-4">
            <Reveal delay={0.04}>
              <a
                href={`mailto:${socials.email}`}
                className="focus-ring surface-card flex items-center gap-4 p-5 transition hover:border-sky/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-sky/30 bg-sky/10 text-sky">
                  <Mail aria-hidden size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">
                    Email
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {socials.email}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={socials.linkedin}
                className="focus-ring surface-card flex items-center gap-4 p-5 transition hover:border-sky/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-sky/30 bg-sky/10 text-sky">
                  <Linkedin aria-hidden size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">
                    LinkedIn
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    linkedin.com/in/berke-katrancı
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={socials.instagram}
                className="focus-ring surface-card flex items-center gap-4 p-5 transition hover:border-sky/40"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-sky/30 bg-sky/10 text-sky">
                  <Instagram aria-hidden size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">
                    Instagram
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    instagram.com/berkekatranc
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="surface-card flex items-center gap-4 p-5">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-gold">
                  <MessagesSquare aria-hidden size={20} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-text">
                    Topics
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted">
                    AI, software, data, investing, student communities, and
                    creative technology.
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
