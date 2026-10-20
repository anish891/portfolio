import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getAdjacentPosts, getAllPosts, getHeadings, getPost } from "@/lib/blog";
import { TagList } from "@/components/ui/TagList";
import { PostBody } from "@/components/ui/PostBody";
import { heroContent, siteConfig } from "@/lib/data";

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
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [heroContent.name],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = getHeadings(post.content);
  const { newer, older } = getAdjacentPosts(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: heroContent.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <main id="main" className="container-prose pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Blog
      </Link>

      <header className="mt-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{post.title}</h1>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {" · "}
          {post.readingMinutes} min read
        </p>
        {post.tags.length > 0 && (
          <div className="mt-3">
            <TagList tags={post.tags} />
          </div>
        )}
      </header>

      {headings.length >= 3 && (
        <nav aria-label="On this page" className="mt-8 rounded-lg border border-border/60 p-4">
          <p className="label-mono mb-2">On this page</p>
          <ol className="space-y-1 text-sm">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <article className="mt-10">
        <PostBody source={post.content} />
      </article>

      {(newer || older) && (
        <nav
          aria-label="More posts"
          className="mt-12 grid gap-6 border-t border-border/60 pt-6 text-sm sm:grid-cols-2"
        >
          {older ? (
            <Link href={`/blog/${older.slug}`} className="group">
              <p className="label-mono mb-1">Older</p>
              <p className="group-hover:underline group-hover:decoration-border group-hover:underline-offset-4">
                {older.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="group sm:text-right">
              <p className="label-mono mb-1">Newer</p>
              <p className="group-hover:underline group-hover:decoration-border group-hover:underline-offset-4">
                {newer.title}
              </p>
            </Link>
          )}
        </nav>
      )}

      {post.project && (
        <p className="mt-12 border-t border-border/60 pt-6 text-sm text-muted-foreground">
          About the project:{" "}
          <Link
            href={`/projects/${post.project}`}
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            {post.project}
          </Link>
        </p>
      )}
    </main>
  );
}
