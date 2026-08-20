"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/profile";

const primaryLabels = new Set([
  "About",
  "Projects",
  "AI & Data",
  "Leadership",
  "CV"
]);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/#home");
  const primaryLinks = navLinks.filter((link) => primaryLabels.has(link.label));
  const activeLink = navLinks.find((link) => link.href === activeHref);
  const activeIsPrimary = primaryLinks.some((link) => link.href === activeHref);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.split("#")[1]))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`/#${visible.target.id}`);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1, 0.25] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsIndexOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navClass = (href: string) =>
    `focus-ring border-b px-1 py-2 text-xs font-medium transition-colors ${
      activeHref === href
        ? "border-sky text-text"
        : "border-transparent text-muted hover:border-white/30 hover:text-text"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95">
      <a
        href="#main-content"
        className="focus-ring absolute left-4 top-2 z-[60] -translate-y-20 bg-text px-4 py-2 text-sm font-semibold text-ink transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        <Link href="/#home" className="focus-ring flex min-h-11 items-center gap-4">
          <span className="font-display text-xl text-text">Berke Katrancı</span>
          <span className="hidden border-l border-white/15 pl-4 font-mono text-[10px] uppercase text-muted sm:inline">
            Systems builder
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "location" : undefined}
              className={navClass(link.href)}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              aria-label="Open section index"
              aria-expanded={isIndexOpen}
              aria-controls="desktop-index"
              onClick={() => setIsIndexOpen((value) => !value)}
              className="focus-ring flex min-h-11 items-center gap-1 border-b border-transparent px-1 text-xs font-medium text-muted transition-colors hover:border-white/30 hover:text-text"
            >
              <span>
                Index
                {!activeIsPrimary && activeLink ? (
                  <span className="ml-2 text-sky">{activeLink.label}</span>
                ) : null}
              </span>
              <ChevronDown
                aria-hidden
                size={14}
                className={`transition-transform ${isIndexOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isIndexOpen ? (
              <div
                id="desktop-index"
                className="absolute right-0 top-[calc(100%+0.75rem)] w-64 border border-white/10 bg-night p-2 shadow-card"
              >
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsIndexOpen(false)}
                    aria-current={activeHref === link.href ? "location" : undefined}
                    className="focus-ring grid min-h-11 grid-cols-[2rem_1fr] items-center border-b border-white/10 px-3 text-sm text-muted transition-colors last:border-b-0 hover:bg-white/[0.04] hover:text-text"
                  >
                    <span className="font-mono text-[10px] text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={activeHref === link.href ? "text-sky" : ""}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            href="/#contact"
            className="focus-ring ml-1 inline-flex min-h-11 items-center border-l border-white/15 pl-5 text-xs font-semibold text-sky transition-colors hover:text-text"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
          className="focus-ring grid h-11 w-11 place-items-center border border-white/15 text-text lg:hidden"
        >
          {isOpen ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </nav>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 bg-ink px-5 py-3 sm:px-8 lg:hidden"
        >
          <div className="mx-auto grid max-w-[1400px]">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={activeHref === link.href ? "location" : undefined}
                className="focus-ring grid min-h-12 grid-cols-[2.5rem_1fr] items-center border-b border-white/10 text-sm font-medium text-muted transition-colors hover:text-text"
              >
                <span className="font-mono text-[10px] text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={activeHref === link.href ? "text-sky" : ""}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
