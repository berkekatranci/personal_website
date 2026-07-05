"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/data/profile";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link href="/#home" className="focus-ring flex items-center gap-3 rounded-lg">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-sky/40 bg-sky/10 font-mono text-sm font-bold text-sky">
            BK
          </span>
          <span className="hidden text-sm font-semibold text-text sm:inline">
            Berke Katrancı
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-lg px-3 py-2 text-xs font-medium text-muted transition hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#contact"
          className="focus-ring hidden rounded-lg border border-sky/30 bg-sky/10 px-4 py-2 text-sm font-semibold text-sky transition hover:border-sky/70 hover:bg-sky/20 md:inline-flex"
        >
          Contact
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-text lg:hidden"
        >
          {isOpen ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-ink/95 px-4 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="focus-ring rounded-lg px-3 py-3 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
