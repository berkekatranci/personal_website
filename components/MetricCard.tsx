type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  index: number;
};

export function MetricCard({ label, value, detail, index }: MetricCardProps) {
  return (
    <article className="metric-card relative min-w-0 border border-white/10 px-5 py-6 transition-transform duration-[170ms] hover:scale-[1.01]">
      <p className="font-mono text-[10px] text-slate-500">
        {String(index + 1).padStart(2, "0")}
      </p>
      <p className="mt-5 font-mono text-[10px] uppercase text-muted">{label}</p>
      <p className="mt-2 text-xl font-semibold text-text">{value}</p>
      <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{detail}</p>
    </article>
  );
}
