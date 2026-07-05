import type { CVEntry } from "@/data/cv";

type TimelineProps = {
  entries: CVEntry[];
};

export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="relative grid gap-6 border-l border-white/10 pl-6">
      {entries.map((entry) => (
        <li key={`${entry.period}-${entry.title}`} className="relative">
          <span className="absolute -left-[31px] top-1 grid h-3 w-3 place-items-center rounded-full bg-sky ring-4 ring-ink" />
          <article className="surface-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-text">
                  {entry.title}
                </h3>
                {entry.organization ? (
                  <p className="mt-1 text-sm text-sky">{entry.organization}</p>
                ) : null}
              </div>
              <p className="rounded-lg border border-white/10 px-3 py-1 font-mono text-xs text-muted">
                {entry.period}
              </p>
            </div>
            {entry.description ? (
              <p className="mt-4 text-sm leading-7 text-muted">
                {entry.description}
              </p>
            ) : null}
          </article>
        </li>
      ))}
    </ol>
  );
}
