type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-4xl border-t border-white/10 pt-6 text-center"
          : "grid gap-5 border-t border-white/10 pt-6 lg:grid-cols-12 lg:gap-8"
      }
    >
      <p className={`eyebrow ${align === "left" ? "lg:col-span-2" : ""}`}>
        {eyebrow}
      </p>
      <div
        className={
          align === "left"
            ? "grid gap-5 lg:col-span-10 lg:grid-cols-10 lg:gap-8"
            : ""
        }
      >
        <h2
          className={`display-title text-3xl leading-tight sm:text-4xl lg:text-[2.8rem] ${
            align === "left" ? "lg:col-span-5" : "mt-4"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`text-base leading-8 text-muted ${
              align === "left" ? "lg:col-span-5" : "mt-5"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
