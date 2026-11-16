import Link from "next/link";

/** Tags as a row of small muted links. The active tag (on a tag page) is shown in the text colour. */
export function TagList({ tags, active }: { tags: string[]; active?: string }) {
  return (
    <ul className="ui flex flex-wrap gap-x-3 gap-y-0.5">
      {tags.map((tag) => {
        const on = tag === active;
        return (
          <li key={tag}>
            <Link
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              aria-current={on ? "page" : undefined}
              className={`inline-block py-1 hover:text-text ${on ? "font-semibold text-text" : "text-muted"}`}
            >
              #{tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
