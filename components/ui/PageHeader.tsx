import Link from "next/link";

interface Props {
  /** Small orange label above the title, e.g. "Mission index". */
  kicker: string;
  title: string;
  description?: string;
  back?: { href: string; label: string };
  /** Short titles read well in uppercase; sentence-style titles (articles) should not. */
  uppercase?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({ kicker, title, description, back, uppercase = true, children }: Props) {
  return (
    <header className="fade-up">
      {back && (
        <Link
          href={back.href}
          className="label-mono mb-8 inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
        >
          <span aria-hidden>←</span> {back.label}
        </Link>
      )}
      <p className="label-mono text-signal-ink">{kicker}</p>
      <h1
        className={
          uppercase
            ? "mt-2 font-display text-4xl font-semibold uppercase leading-none tracking-tight sm:text-5xl"
            : "mt-2 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl"
        }
      >
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{description}</p>
      )}
      {children}
      <div className="mt-8 h-px bg-border" aria-hidden />
    </header>
  );
}
