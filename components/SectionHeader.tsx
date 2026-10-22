type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  return (
    <div className={`border-t border-white/10 pt-6 ${align === "center" ? "text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`display-title mt-5 max-w-[28ch] text-3xl leading-tight sm:text-4xl lg:text-[2.8rem] ${align === "center" ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {description ? (
        <p className={`prose-copy mt-6 text-muted ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
