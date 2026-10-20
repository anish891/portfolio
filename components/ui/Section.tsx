interface SectionProps {
  id?: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Section({ id, title, action, children }: SectionProps) {
  return (
    <section id={id} className="container-prose pt-16">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="label-mono">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
