import { Award, BarChart3, BrainCircuit, BriefcaseBusiness, Users, Video } from "lucide-react";

const icons = [
  BarChart3,
  Award,
  BrainCircuit,
  Users,
  BriefcaseBusiness,
  Video
];

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  index: number;
};

export function MetricCard({ label, value, detail, index }: MetricCardProps) {
  const Icon = icons[index % icons.length];

  return (
    <article className="surface-card p-5 transition hover:-translate-y-1 hover:border-sky/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {label}
          </p>
          <p className="mt-3 text-2xl font-semibold text-text">{value}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-sky/30 bg-sky/10 text-sky">
          <Icon aria-hidden size={18} />
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{detail}</p>
    </article>
  );
}
