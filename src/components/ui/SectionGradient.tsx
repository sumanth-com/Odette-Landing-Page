type GradientTone = 0 | 1 | 2 | 3 | 4 | 5;

const toneClass: Record<GradientTone, string> = {
  0: "section-gradient--tone-0",
  1: "section-gradient--tone-1",
  2: "section-gradient--tone-2",
  3: "section-gradient--tone-3",
  4: "section-gradient--tone-4",
  5: "section-gradient--tone-5",
};

export function SectionGradient({ tone = 0 }: { tone?: GradientTone }) {
  return (
    <div
      className={`section-gradient pointer-events-none absolute inset-0 ${toneClass[tone]}`}
      aria-hidden="true"
    />
  );
}
