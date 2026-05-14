interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-3xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
      <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </div>
  );
}

