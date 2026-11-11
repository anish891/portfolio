interface HeadProps {
  title: string;
  /**
   * Plain-English subtitle shown at the right of the heading rule. It is also part of the heading
   * text (visually hidden), so screen readers and crawlers read "Missions: selected projects"
   * rather than the themed word alone.
   */
  kicker?: string;
  action?: React.ReactNode;
}

/**
 * The numbered heading strip of a manual section. The number comes from a CSS counter on <main>,
 * so sections that are not rendered (for example an empty timeline) never leave a gap.
 */
export function SectionHead({ title, kicker, action }: HeadProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="sec-no font-mono text-[11px] text-signal-ink" aria-hidden />
      <h2 className="font-display text-base font-semibold uppercase tracking-[0.12em]">
        {title}
        {kicker && <span className="sr-only">: {kicker}</span>}
      </h2>
      <span className="h-px flex-1 bg-border" aria-hidden />
      {kicker && (
        <span className="label-mono hidden sm:inline" aria-hidden>
          {kicker}
        </span>
      )}
      {action}
    </div>
  );
}

interface SectionProps extends HeadProps {
  id?: string;
  children: React.ReactNode;
}

export function Section({ id, title, kicker, action, children }: SectionProps) {
  return (
    <section id={id} className="container-prose pt-16">
      <SectionHead title={title} kicker={kicker} action={action} />
      {children}
    </section>
  );
}
