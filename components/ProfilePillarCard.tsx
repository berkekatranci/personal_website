import { BrainCircuit, Code2, Gem, LineChart, UsersRound } from "lucide-react";

const pillarIcons = [BrainCircuit, Code2, UsersRound, LineChart, Gem];

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
  const Icon = pillarIcons[index % pillarIcons.length];

  return (
    <article className="surface-card h-full p-6">
      <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-sky">
        <Icon aria-hidden size={20} />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-text">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
    </article>
  );
}
