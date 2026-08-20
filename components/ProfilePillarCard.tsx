type ProfilePillarCardProps = {
  title: string;
  description: string;
  index: number;
};

export function ProfilePillarCard({
  title,
  description,
  index
}: ProfilePillarCardProps) {
  return (
    <article className="grid gap-4 border-t border-white/10 py-7 sm:grid-cols-[3rem_1fr]">
      <span className="font-mono text-[10px] text-slate-500">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          {description}
        </p>
      </div>
    </article>
  );
}
