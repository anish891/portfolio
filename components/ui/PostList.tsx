import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="divide-y divide-border/60">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group block py-4 first:pt-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-medium tracking-tight group-hover:underline group-hover:decoration-border group-hover:underline-offset-4">
                {post.title}
              </h3>
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
