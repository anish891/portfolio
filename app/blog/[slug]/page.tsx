import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAdjacentPosts, getAllPosts, getHeadings, getPost } from "@/lib/blog";
import { TagList } from "@/components/ui/TagList";
import { PostBody } from "@/components/ui/PostBody";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { blogPosting, breadcrumbs } from "@/lib/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    article: { publishedTime: post.date, tags: post.tags },
    ownImage: true,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = getHeadings(post.content);
  const { newer, older } = getAdjacentPosts(post.slug);

  return (
    <main id="main" data-wide className="wrap flex-1 pt-10">
      <JsonLd
        data={[
          blogPosting(post),
          breadcrumbs([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article>
        <header>
          <Link href="/blog" className="ui">
            ← All writing
          </Link>
          <h1 className="page-title mt-6">{post.title}</h1>
          <p className="ui muted mt-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
            read
          </p>
          {post.tags.length > 0 && (
            <div className="mt-1">
              <TagList tags={post.tags} />
            </div>
          )}
        </header>

        {headings.length >= 4 && (
          <nav aria-labelledby="toc-label" className="ui mt-8 border-y border-line py-4">
            <h2 id="toc-label" className="label mb-2">
              Contents
            </h2>
            <ol className="space-y-0.5">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="inline-block py-0.5">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-8">
          <PostBody source={post.content} />
        </div>
      </article>

      <footer className="ui mt-14 border-t border-line pt-6">
        {post.project && (
          <p className="muted mb-4">
            Related project: <Link href={`/projects/${post.project}`}>{post.project}</Link>
          </p>
        )}

        {(newer || older) && (
          <nav aria-label="More posts" className="grid gap-4 sm:grid-cols-2">
            {older ? (
              <p>
                <span className="muted block">← Previous</span>
                <Link href={`/blog/${older.slug}`}>{older.title}</Link>
              </p>
            ) : (
              <span />
            )}
            {newer && (
              <p className="sm:text-right">
                <span className="muted block">Next →</span>
                <Link href={`/blog/${newer.slug}`}>{newer.title}</Link>
              </p>
            )}
          </nav>
        )}

        <p className="mt-8">
          <Link href="/blog">← All writing</Link>
        </p>
      </footer>
    </main>
  );
}
