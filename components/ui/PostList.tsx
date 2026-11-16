import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";

/**
 * A plain list of posts: linked title, the post's one-line description, then a muted line with the
 * date, reading time and (optionally) tags.
 */
export function PostList({ posts, showTags = false }: { posts: PostMeta[]; showTags?: boolean }) {
  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="leading-snug">
            {post.title}
          </Link>
          <p className="muted mt-1 text-[16px] leading-normal">{post.description}</p>
          <p className="ui muted mt-1">
            <time dateTime={post.date}>{formatDate(post.date, "short")}</time> ·{" "}
            {post.readingMinutes} min read
            {showTags &&
              post.tags.map((tag) => (
                <span key={tag}>
                  {" · "}
                  <Link
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="text-muted hover:text-text"
                  >
                    {tag}
                  </Link>
                </span>
              ))}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Posts grouped under a year label, newest year first (posts arrive newest first). */
export function PostsByYear({ posts }: { posts: PostMeta[] }) {
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];
  return (
    <div className="space-y-12">
      {years.map((year) => (
        <section key={year} aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="label mb-5">
            {year}
          </h2>
          <PostList posts={posts.filter((p) => p.date.startsWith(year))} showTags />
        </section>
      ))}
    </div>
  );
}
