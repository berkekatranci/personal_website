type SkillBadgeProps = {
  children: string;
};

export function SkillBadge({ children }: SkillBadgeProps) {
  return (
    <span className="inline-flex border-b border-white/20 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
