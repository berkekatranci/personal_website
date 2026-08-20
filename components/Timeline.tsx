import type { CVEntry } from "@/data/cv";

type TimelineProps = {
  entries: CVEntry[];
  compact?: boolean;
};

export function Timeline({ entries, compact = false }: TimelineProps) {
  return (
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
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
                {entry.description}
              </p>
            ) : null}
          </article>
        </li>
      ))}
    </ol>
  );
}
