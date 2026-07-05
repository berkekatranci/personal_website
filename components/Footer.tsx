import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { socials } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold text-text">Berke Katrancı</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            AI, software, leadership, investing, and creative technology through
            the lens of complex systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            aria-label="Email Berke"
            href={`mailto:${socials.email}`}
            className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted transition hover:border-sky/50 hover:text-sky"
          >
            <Mail aria-hidden size={18} />
          </a>
          <a
            aria-label="LinkedIn profile"
            href={socials.linkedin}
            className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted transition hover:border-sky/50 hover:text-sky"
          >
            <Linkedin aria-hidden size={18} />
          </a>
          <a
            aria-label="Instagram profile"
            href={socials.instagram}
            className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted transition hover:border-sky/50 hover:text-sky"
          >
            <Instagram aria-hidden size={18} />
          </a>
          <span
            aria-label="GitHub placeholder"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-500"
          >
            <Github aria-hidden size={18} />
          </span>
          <Link
            href="/impressum"
            className="focus-ring rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-text"
          >
            Impressum
          </Link>
          <Link
            href="/privacy"
            className="focus-ring rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-text"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
