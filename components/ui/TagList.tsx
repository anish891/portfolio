import Link from "next/link";

export function TagList({ tags, active }: { tags: string[]; active?: string }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/blog/tag/${encodeURIComponent(tag)}`}
            aria-current={tag === active ? "page" : undefined}
            className={
              tag === active
                ? "text-foreground"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
