"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { navLinks } from "@/data/profile";
import { inertProps } from "@/components/inertProps";
import { useMeasuredHeight } from "@/components/useMeasuredHeight";

const primaryLabels = new Set(["About", "Projects", "AI & Data", "Leadership", "CV"]);

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/#home");
  const menuButton = useRef<HTMLButtonElement>(null);
  const indexButton = useRef<HTMLButtonElement>(null);
  const indexContainer = useRef<HTMLDivElement>(null);
  const navigationTarget = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { contentRef: menuContentRef, contentHeight: menuHeight } = useMeasuredHeight();
  const primaryLinks = navLinks.filter((link) => primaryLabels.has(link.label));
  const activeLink = navLinks.find((link) => link.href === activeHref);
  const activeIsPrimary = primaryLinks.some((link) => link.href === activeHref);
  const menuTransition = { duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.split("#")[1]))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const target = navigationTarget.current;
      if (target) {
        const top = target.getBoundingClientRect().top;
        if (top > 112 && window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) return;
        navigationTarget.current = null;
      }
      const current = sections.filter((section) => section.getBoundingClientRect().top <= 112).at(-1) ?? sections[0];
      setActiveHref(`/#${current.id}`);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };
    const releaseTarget = () => {
      navigationTarget.current = null;
      scheduleUpdate();
    };
    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scrollend", releaseTarget);
    window.addEventListener("wheel", releaseTarget, { passive: true });
    window.addEventListener("touchstart", releaseTarget, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scrollend", releaseTarget);
      window.removeEventListener("wheel", releaseTarget);
      window.removeEventListener("touchstart", releaseTarget);
    };
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isOpen) menuButton.current?.focus();
        if (isIndexOpen) indexButton.current?.focus();
        setIsOpen(false);
        setIsIndexOpen(false);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (isIndexOpen && !indexContainer.current?.contains(event.target as Node)) setIsIndexOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, isIndexOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeMenus = () => {
      setIsOpen(false);
      setIsIndexOpen(false);
    };
    desktop.addEventListener("change", closeMenus);
    return () => desktop.removeEventListener("change", closeMenus);
  }, []);

  const navigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setIsOpen(false);
    setIsIndexOpen(false);
    setActiveHref(href);
    const section = document.getElementById(href.split("#")[1]);
    if (!section) return;
    event.preventDefault();
    navigationTarget.current = section;
    section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
    window.history.pushState(null, "", href);
    section.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
  };

  const underline = (
    <motion.span
      aria-hidden
      layoutId="active-section-line"
      className="absolute inset-x-0 bottom-0 h-px bg-sky"
      transition={{ duration: reducedMotion ? 0 : 0.23, ease: [0.22, 1, 0.36, 1] }}
    />
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95">
      <a href="#main-content" className="focus-ring absolute left-4 top-2 z-[60] -translate-y-20 bg-text px-4 py-2 text-sm font-semibold text-ink transition focus:translate-y-0">
        Skip to content
      </a>
      <nav aria-label="Primary navigation" className="content-shell flex h-16 items-center justify-between gap-4">
        <Link href="/#home" onClick={(event) => navigate(event, "/#home")} className="focus-ring flex min-h-11 shrink-0 items-center gap-4">
          <span className="font-display text-xl text-text">Berke Katrancı</span>
          <span className="hidden border-l border-white/15 pl-4 font-mono text-[10px] uppercase text-muted sm:inline lg:hidden xl:inline">
            Systems builder
          </span>
        </Link>
        <LayoutGroup id="primary-navigation">
          <div className="hidden items-center gap-5 lg:flex">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)}
                aria-current={activeHref === link.href ? "location" : undefined}
                className={`focus-ring relative inline-flex min-h-11 items-center px-1 text-xs font-medium transition-colors ${activeHref === link.href ? "text-text" : "text-muted hover:text-text"}`}>
                {link.label}
                {activeHref === link.href ? underline : null}
              </Link>
            ))}
            <div ref={indexContainer} className="relative">
              <button ref={indexButton} type="button" aria-label="Open section index" aria-expanded={isIndexOpen}
                aria-controls="desktop-index" onClick={() => setIsIndexOpen((value) => !value)}
                className="focus-ring relative flex min-h-11 items-center gap-1 px-1 text-xs font-medium text-muted transition-colors hover:text-text">
                <span>
                  Index
                  {!activeIsPrimary && activeLink && activeHref !== "/#contact" ? <span className="ml-2 text-sky">{activeLink.label}</span> : null}
                </span>
                <motion.span aria-hidden animate={{ rotate: isIndexOpen ? 180 : 0 }} transition={menuTransition}>
                  <ChevronDown size={14} />
                </motion.span>
                {!activeIsPrimary && activeHref !== "/#contact" ? underline : null}
              </button>
              <motion.div id="desktop-index" aria-hidden={!isIndexOpen}
                initial={false} animate={{ opacity: isIndexOpen ? 1 : 0, y: isIndexOpen ? 0 : -8 }}
                transition={menuTransition}
                style={{ visibility: isIndexOpen ? "visible" : undefined }}
                className={`absolute right-0 top-[calc(100%+0.75rem)] w-64 border border-white/10 bg-night p-2 shadow-card ${isIndexOpen ? "" : "pointer-events-none"}`}>
                <div {...inertProps(!isIndexOpen)}>
                {navLinks.map((link, index) => (
                  <Link key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)}
                    aria-current={activeHref === link.href ? "location" : undefined}
                    className="focus-ring grid min-h-11 grid-cols-[2rem_1fr] items-center border-b border-white/10 px-3 text-sm text-muted transition-colors last:border-b-0 hover:bg-white/[0.04] hover:text-text">
                    <span className="font-mono text-[10px] text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                    <span className={activeHref === link.href ? "text-sky" : ""}>{link.label}</span>
                  </Link>
                ))}
                </div>
              </motion.div>
            </div>
            <Link href="/#contact" onClick={(event) => navigate(event, "/#contact")}
              aria-current={activeHref === "/#contact" ? "location" : undefined}
              className="focus-ring relative ml-1 inline-flex min-h-11 items-center border-l border-white/15 pl-5 text-xs font-semibold text-sky transition-colors hover:text-text">
              Contact
              {activeHref === "/#contact" ? underline : null}
            </Link>
          </div>
        </LayoutGroup>
        <button ref={menuButton} type="button" aria-label="Toggle navigation" aria-expanded={isOpen}
          aria-controls="mobile-navigation" onClick={() => setIsOpen((value) => !value)}
          className="focus-ring grid h-11 w-11 shrink-0 place-items-center border border-white/15 text-text lg:hidden">
          {isOpen ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </nav>
      <motion.div id="mobile-navigation" aria-hidden={!isOpen}
        initial={false} animate={{ height: isOpen ? menuHeight : 0, opacity: isOpen ? 1 : 0 }}
        transition={menuTransition}
        className={`absolute inset-x-0 top-full overflow-hidden bg-ink lg:hidden ${isOpen ? "" : "pointer-events-none"}`}>
        <div ref={menuContentRef} {...inertProps(!isOpen)}>
        <motion.div initial={false} animate={{ y: isOpen ? 0 : -8 }} transition={menuTransition}
          className="content-shell max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/10 py-3">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={(event) => navigate(event, link.href)}
              aria-current={activeHref === link.href ? "location" : undefined}
              className="focus-ring grid min-h-12 grid-cols-[2.5rem_1fr] items-center border-b border-white/10 text-sm font-medium text-muted transition-colors hover:text-text">
              <span className="font-mono text-[10px] text-slate-500">{String(index + 1).padStart(2, "0")}</span>
              <span className={activeHref === link.href ? "text-sky" : ""}>{link.label}</span>
            </Link>
          ))}
        </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
