"use client";

import { motion, useReducedMotion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  const reducedMotion = useReducedMotion();
  return (
    <div className={`relative border-t border-white/10 pt-6 ${align === "center" ? "text-center" : ""}`}>
      <motion.span
        aria-hidden
        className="section-entry-rule pointer-events-none absolute inset-x-0 -top-px h-px origin-left bg-gradient-to-r from-sky/80 via-sky/25 to-transparent"
        initial={reducedMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reducedMotion ? 0 : 0.38, ease: [0.22, 0.78, 0.24, 1] }}
      />
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`display-title mt-5 max-w-[28ch] text-3xl leading-tight sm:text-4xl lg:text-[2.8rem] ${align === "center" ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {description ? (
        <p className={`prose-copy mt-6 text-muted ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
