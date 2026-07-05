type SkillBadgeProps = {
  children: string;
};

export function SkillBadge({ children }: SkillBadgeProps) {
  return (
    <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
