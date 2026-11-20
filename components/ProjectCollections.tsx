"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ProjectArchive } from "@/components/ProjectArchive";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/data/projects";

const filters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "software", label: "Software" },
  { id: "optimization", label: "Optimization" },
  { id: "community", label: "Community & creative" },
  { id: "other", label: "Other" }
] as const;

type Filter = (typeof filters)[number]["id"];

type ProjectCollectionsProps = {
  selected: Project[];
  finished: Project[];
  ongoing: Project[];
  finishedCount: number;
};

const motionPreference = "(prefers-reduced-motion: reduce)";
const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const projectCategories: Record<string, Exclude<Filter, "all">> = {
  "AI & Data Engineering": "ai",
  "AI / Deep Learning": "ai",
  "AI Engineering": "ai",
  "AI Engineering / Data Science": "ai",
  "Computer Vision": "ai",
  "Mobile Development": "software",
  "Software Development": "software",
  "Algorithms / Optimization": "optimization",
  "Leadership / Web / Community": "community",
  "Creative Technology": "community"
};

function getFilter(project: Project) {
  return projectCategories[project.category] ?? "other";
}

function getVisibleRows(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>("[data-project-filter-row]"))
    .filter((row) => row.getClientRects().length > 0);
}

export function ProjectCollections({ selected, finished, ongoing, finishedCount }: ProjectCollectionsProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const resultsId = useId();
  const results = useRef<HTMLDivElement>(null);
  const previousTops = useRef<Map<HTMLElement, number> | null>(null);
  const animations = useRef<Animation[]>([]);
  const allProjects = [...selected, ...finished, ...ongoing];
  const availableFilters = new Set(allProjects.map(getFilter));
  const matches = (project: Project) => filter === "all" || filter === getFilter(project);
  const selectedMatches = selected.filter(matches);
  const finishedMatches = finished.filter(matches);
  const ongoingMatches = ongoing.filter(matches);
  const resultCount = selectedMatches.length + finishedMatches.length + ongoingMatches.length;

  useClientLayoutEffect(() => {
    const oldTops = previousTops.current;
    previousTops.current = null;
    if (!oldTops || !results.current || window.matchMedia(motionPreference).matches) return;

    const positions = getVisibleRows(results.current).map((row) => ({
      row,
      top: row.getBoundingClientRect().top
    }));

    animations.current = positions.flatMap(({ row, top }) => {
      const oldTop = oldTops.get(row);
      const offset = oldTop === undefined ? 8 : Math.max(-32, Math.min(32, oldTop - top));
      if (oldTop !== undefined && Math.abs(offset) < 1) return [];
      return row.animate(
        [
          { transform: `translateY(${offset}px)`, opacity: oldTop === undefined ? 0.6 : 1 },
          { transform: "translateY(0)", opacity: 1 }
        ],
        { duration: 260, easing: "cubic-bezier(.22, 1, .36, 1)" }
      );
    });
  }, [filter]);

  useEffect(() => {
    const preference = window.matchMedia(motionPreference);
    function stopMotion() {
      animations.current.forEach((animation) => animation.cancel());
      animations.current = [];
    }

    preference.addEventListener("change", stopMotion);
    return () => {
      preference.removeEventListener("change", stopMotion);
      stopMotion();
    };
  }, []);

  function selectFilter(next: Filter) {
    if (next === filter) return;

    previousTops.current = results.current && !window.matchMedia(motionPreference).matches
      ? new Map(getVisibleRows(results.current).map((row) => [row, row.getBoundingClientRect().top]))
      : null;
    animations.current.forEach((animation) => animation.cancel());
    animations.current = [];
    setFilter(next);
  }

  return (
    <div className="mt-14">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-white/10 pt-5">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.filter(({ id }) => id === "all" || availableFilters.has(id)).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-controls={resultsId}
              aria-pressed={filter === id}
              onClick={() => selectFilter(id)}
              className="focus-ring min-h-11 min-w-11 border border-white/15 px-3 text-sm font-medium text-muted transition-[background-color,border-color,color] duration-150 hover:border-white/40 hover:text-text active:bg-white/15 aria-pressed:border-sky/45 aria-pressed:bg-sky/10 aria-pressed:text-sky"
            >
              {label}
            </button>
          ))}
        </div>
        <p role="status" className="text-sm text-muted">
          {resultCount} {resultCount === 1 ? "project" : "projects"}
        </p>
      </div>

      <div ref={results} id={resultsId} className="mt-8">
        <div hidden={selectedMatches.length === 0}>
          <Reveal className="space-y-4" delay={0.05}>
            <p className="pb-4 font-mono text-[10px] uppercase text-slate-500">Selected work</p>
            {selected.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} visible={matches(project)} />
            ))}
          </Reveal>
        </div>

        <div hidden={finishedMatches.length === 0} className="mt-20">
          <div className="grid gap-8">
            <Reveal>
              <div className="border-t border-white/10 pt-6 lg:sticky lg:top-24">
                <p className="eyebrow">Finished (Selected Projects)</p>
                <p className="mt-5 font-display text-5xl text-text">
                  {filter === "all" ? finishedCount : finishedMatches.length}
                </p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
                  Completed projects with concrete delivery, competition, or evaluation outcomes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <ProjectArchive projects={finished} startIndex={selected.length} isVisible={matches} />
            </Reveal>
          </div>
        </div>

        <div hidden={ongoingMatches.length === 0} className="mt-20">
          <div className="grid gap-8">
            <Reveal>
              <div className="border-t border-gold/40 pt-6 lg:sticky lg:top-24">
                <p className="font-mono text-[10px] uppercase text-gold">In Progress (Selected Projects)</p>
                <p className="mt-5 font-display text-5xl text-text">{ongoingMatches.length}</p>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
                  Active systems for community building, web infrastructure, and creative technology presentation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <ProjectArchive projects={ongoing} startIndex={finishedCount} tone="active" isVisible={matches} />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
