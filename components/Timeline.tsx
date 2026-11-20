"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { useMeasuredHeight } from "@/components/useMeasuredHeight";
import type { CVEntry } from "@/data/cv";

type TimelineProps = {
  entries: CVEntry[];
  compact?: boolean;
  browseYears?: boolean;
};

function entryYears(entry: CVEntry): string[] {
  return entry.period.match(/(?:19|20)\d{2}/g) ?? [];
}

export function Timeline({ entries, compact = false, browseYears = false }: TimelineProps) {
  const years = Array.from(new Set(entries.flatMap(entryYears)))
    .sort((a, b) => Number(b) - Number(a))
    .slice(0, 3);
  const [chosenYear, setChosenYear] = useState(years[0]);
  const activeYear = years.includes(chosenYear) ? chosenYear : years[0];
  const spotlight = entries.find((entry) => entryYears(entry).includes(activeYear));
  const reducedMotion = useReducedMotion();
  const timelineId = useId();
  const { contentRef, contentHeight } = useMeasuredHeight();
  const transition = { duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div>
    {browseYears && spotlight ? (
      <div className="mb-8">
        <div role="group" aria-label="Browse experience by year" className="relative mb-5 flex max-w-sm justify-between">
          <span aria-hidden className="absolute bottom-[7px] left-6 right-6 h-px bg-white/20" />
          {years.map((year) => (
            <button key={year} type="button" aria-pressed={year === activeYear}
              aria-controls={`timeline-spotlight-${timelineId}`}
              onClick={() => setChosenYear(year)}
              className={`focus-ring relative flex min-h-14 min-w-12 flex-col items-center justify-between gap-3 px-3 pb-1 pt-1 font-mono text-sm transition-colors duration-[250ms] active:bg-sky/10 ${year === activeYear ? "text-sky" : "text-muted hover:text-text"}`}>
              {year}
              <span aria-hidden className="relative grid h-2 w-2 place-items-center rounded-full bg-night ring-1 ring-white/30">
                {year === activeYear ? (
                  <motion.span layoutId={`timeline-point-${timelineId}`} initial={false}
                    transition={transition} className="absolute inset-0 rounded-full bg-sky" />
                ) : null}
              </span>
            </button>
          ))}
        </div>
        <motion.div id={`timeline-spotlight-${timelineId}`} aria-live="polite" aria-atomic="true"
          initial={false} animate={{ height: contentHeight || "auto" }} transition={transition}
          className="overflow-hidden border-l border-sky/40">
          <div ref={contentRef} className="py-2 pl-5">
            <motion.div key={activeYear} initial={reducedMotion ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }} transition={transition}>
              <p className="font-mono text-[11px] text-muted">{spotlight.period}</p>
              <p className="mt-2 font-display text-xl leading-7 text-text">{spotlight.title}</p>
              {spotlight.organization ? <p className="mt-2 text-sm text-sky">{spotlight.organization}</p> : null}
              {spotlight.description ? <p className="prose-copy mt-3 text-muted">{spotlight.description}</p> : null}
            </motion.div>
          </div>
        </motion.div>
      </div>
    ) : null}
    <ol className="border-b border-white/10">
      {entries.map((entry) => (
        <li
          key={`${entry.period}-${entry.title}`}
          className={`grid border-t border-white/10 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 ${
            compact ? "lg:grid-cols-[9rem_1fr]" : "lg:py-6"
          }`}
        >
          <p className="font-mono text-[10px] text-muted">{entry.period}</p>
          <article className="mt-2 sm:mt-0">
            <h3 className="text-base font-semibold text-text">{entry.title}</h3>
            {entry.organization ? (
              <p
                className={`mt-1 text-sm ${
                  entry.type === "education" ? "text-violet" : "text-sky"
                }`}
              >
                {entry.organization}
              </p>
            ) : null}
            {entry.description ? (
              <p className="prose-copy mt-3 text-muted">
                {entry.description}
              </p>
            ) : null}
          </article>
        </li>
      ))}
    </ol>
    </div>
  );
}
