import type { TimelineEntry } from "@/lib/data";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative space-y-8 border-l border-dashed border-border pl-6">
      {entries.map((e) => (
        <li key={`${e.organization}-${e.start}`} className="relative">
          <span className="absolute -left-[1.85rem] top-1.5 size-2 bg-signal" aria-hidden />
          <p className="font-mono text-xs text-muted-foreground">
            {e.start} – {e.end}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
            {e.title}
            <span className="font-sans text-sm font-normal text-muted-foreground">
              {" · "}
              {e.url ? (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-4 hover:decoration-signal"
                >
                  {e.organization}
                </a>
              ) : (
                e.organization
              )}
            </span>
          </h3>
          {e.location && <p className="label-mono mt-0.5">{e.location}</p>}
          {e.highlights && e.highlights.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-foreground/85 marker:text-signal">
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {e.tags && e.tags.length > 0 && (
            <p className="mt-2 font-mono text-xs text-muted-foreground">{e.tags.join(" · ")}</p>
          )}
        </li>
      ))}
    </ol>
  );
}
