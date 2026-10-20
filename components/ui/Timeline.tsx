import type { TimelineEntry } from "@/lib/data";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="space-y-8">
      {entries.map((e) => (
        <li
          key={`${e.organization}-${e.start}`}
          className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4"
        >
          <p className="font-mono text-xs text-muted-foreground sm:pt-1">
            {e.start} – {e.end}
          </p>
          <div>
            <h3 className="font-medium tracking-tight">
              {e.title}
              <span className="font-normal text-muted-foreground">
                {" · "}
                {e.url ? (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {e.organization}
                  </a>
                ) : (
                  e.organization
                )}
              </span>
            </h3>
            {e.location && (
              <p className="text-xs text-muted-foreground">{e.location}</p>
            )}
            {e.highlights && e.highlights.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-foreground/85">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {e.tags && e.tags.length > 0 && (
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {e.tags.join(" · ")}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
