"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { salzgitterInternship, socials } from "@/data/profile";

const topics = [
  { label: "data", description: "Weather sensor data, model evaluation, and feedback analysis for language models." },
  { label: "code", description: "Software tools, mobile applications, and computer vision." },
  { label: "teams", description: "Team leadership in AI projects and at NovaExchangeWorkshop." }
];

const aboutTabs = ["Now", "Community"] as const;
const ease = [0.22, 0.78, 0.24, 1] as const;

export function AboutKeywords() {
  const [selected, setSelected] = useState(0);
  const [hasSelected, setHasSelected] = useState(false);
  const reducedMotion = useReducedMotion();
  const captionId = useId();

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0 font-display text-xl text-text" role="group" aria-label="Explore work by theme">
        <span>I build with</span>
        {topics.map((topic, index) => (
          <button
            key={topic.label}
            type="button"
            aria-pressed={selected === index}
            aria-controls={captionId}
            onClick={() => {
              setHasSelected(true);
              setSelected(index);
            }}
            className="about-keyword focus-ring min-h-11 min-w-11 px-0.5 text-sky active:bg-white/5"
          >
            {topic.label}
          </button>
        ))}
      </div>
      <div id={captionId} aria-live="polite" aria-atomic="true" className="mt-2 min-h-[4rem] border-l border-sky/40 pl-4">
        <motion.p
          key={selected}
          className="prose-copy text-muted"
          initial={!hasSelected || reducedMotion ? false : { opacity: 0.55, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22, ease }}
        >
          {topics[selected].description}
        </motion.p>
      </div>
    </div>
  );
}

export function AboutFocus() {
  const [selection, setSelection] = useState<{ tab: (typeof aboutTabs)[number]; changes: number }>({ tab: "Now", changes: 0 });
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const animateChange = selection.changes > 0 && !reducedMotion;

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-x-5" role="group" aria-label="Current work and community">
        {aboutTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={selection.tab === tab}
            aria-controls={panelId}
            onClick={() => setSelection((previous) => previous.tab === tab ? previous : { tab, changes: previous.changes + 1 })}
            className="about-keyword focus-ring min-h-11 min-w-11 px-0.5 text-left text-sm font-medium text-muted aria-pressed:text-sky active:bg-white/5"
          >
            {tab}
          </button>
        ))}
      </div>
      <div id={panelId} aria-live="polite" aria-atomic="true" className="mt-4 grid grid-cols-[2px_minmax(0,1fr)] gap-4">
        <motion.span
          key={`rule-${selection.changes}`}
          aria-hidden
          className="origin-top bg-sky/60"
          initial={animateChange ? { scaleY: 0.6 } : false}
          animate={{ scaleY: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.22, ease }}
        />
        <motion.div
          key={selection.changes}
          initial={animateChange ? { opacity: 0.5, y: 5 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22, ease }}
        >
          {selection.tab === "Now" ? (
            <>
              <h3 className="display-title text-2xl">{salzgitterInternship.organization}</h3>
              <p className="mt-2 text-sm font-medium text-sky">
                {salzgitterInternship.title} · Since {salzgitterInternship.started}
              </p>
              <p className="prose-copy mt-2 text-muted">{salzgitterInternship.description}</p>
              <p className="mt-3 text-sm leading-6 text-muted">M.Sc. Informatics and student software &amp; AI development at TU Braunschweig HPC.</p>
            </>
          ) : (
            <>
              <h3 className="display-title text-2xl">NovaExchangeWorkshop</h3>
              <p className="prose-copy mt-2 text-muted">Co-founder and first chair of a student association for entrepreneurship and investing. I help organize events and build its website.</p>
              <a href={socials.novaExchangeWorkshop} className="focus-ring inline-flex min-h-11 items-center text-sm text-sky underline underline-offset-4">Visit NovaExchangeWorkshop</a>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
