import Link from "next/link";
import { socials } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night">
      <div className="content-shell grid gap-8 py-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-display text-xl text-text">Berke Katrancı</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            AI, software, leadership, investing, and creative technology through
            the lens of complex systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm lg:col-span-6 lg:justify-end">
          <a
            href={`mailto:${socials.email}`}
            className="focus-ring min-h-11 content-center text-muted transition-colors hover:text-sky"
          >
            Email
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring min-h-11 content-center text-muted transition-colors hover:text-sky"
          >
            LinkedIn
          </a>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="focus-ring min-h-11 content-center text-muted transition-colors hover:text-sky"
          >
            Instagram
          </a>
          <span className="min-h-11 content-center text-slate-600">GitHub</span>
          <Link
            href="/impressum"
            className="focus-ring min-h-11 content-center text-muted transition-colors hover:text-text"
          >
            Impressum
          </Link>
          <Link
            href="/privacy"
            className="focus-ring min-h-11 content-center text-muted transition-colors hover:text-text"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
