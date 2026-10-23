import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";

export function PostList({
  posts,
  headingLevel: Heading = "h3",
}: {
  posts: PostMeta[];
  /** Use "h2" on pages whose only heading above the list is the page's h1. */
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="divide-y divide-dashed divide-border">
      {posts.map((post, i) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-[2.25rem_1fr] gap-x-3 py-4 first:pt-0"
          >
            <span className="pt-1 font-mono text-[11px] text-signal-ink">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <Heading className="font-display text-lg font-semibold tracking-tight group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-4">
                  {post.title}
                </Heading>
                <time
                  dateTime={post.date}
                  className="shrink-0 font-mono text-xs text-muted-foreground"
                >
                  {formatDate(post.date, "short")}
                </time>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
