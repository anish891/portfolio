import Link from "next/link";

export function TagList({ tags, active }: { tags: string[]; active?: string }) {
  return (
    <ul className="flex flex-wrap gap-2 font-mono text-xs">
      {tags.map((tag) => {
        const on = tag === active;
        return (
          <li key={tag}>
            <Link
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              aria-current={on ? "page" : undefined}
              className={
                on
                  ? "rounded-sm border border-signal px-2 py-0.5 text-signal-ink"
                  : "rounded-sm border border-border px-2 py-0.5 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              }
            >
              #{tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
