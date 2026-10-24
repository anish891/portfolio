import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentPosts, getAllPosts, getHeadings, getPost } from "@/lib/blog";
import { TagList } from "@/components/ui/TagList";
import { PostBody } from "@/components/ui/PostBody";
import { PageHeader } from "@/components/ui/PageHeader";
import { heroContent, siteConfig } from "@/lib/data";
import { serializeJsonLd } from "@/lib/jsonld";

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
    <main id="main" className="container-prose pt-14 pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <PageHeader
        back={{ href: "/blog", label: "Blog" }}
        kicker="Log entry"
        title={post.title}
        uppercase={false}
      >
        <dl className="mt-6">
          <div className="spec-row">
            <dt className="label-mono">Read</dt>
            <dd className="font-mono text-xs">{post.readingMinutes} min</dd>
          </div>
          {post.tags.length > 0 && (
            <div className="spec-row">
              <dt className="label-mono pt-0.5">Tags</dt>
              <dd>
                <TagList tags={post.tags} />
              </dd>
            </div>
          )}
        </dl>
      </PageHeader>

      {headings.length >= 3 && (
        <nav aria-label="On this page" className="mt-8 border border-dashed border-border p-4">
          <p className="label-mono mb-3 text-signal-ink">Contents</p>
          <ol className="space-y-1.5 text-sm">
            {headings.map((h, i) => (
              <li key={h.id} className="flex gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${h.id}`}
                  className="text-foreground/85 transition-colors hover:text-signal-ink"
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
          className="mt-14 grid gap-6 border-t border-dashed border-border pt-6 text-sm sm:grid-cols-2"
        >
          {older ? (
            <Link href={`/blog/${older.slug}`} className="group">
              <p className="label-mono mb-1">← Previous entry</p>
              <p className="font-display text-base font-semibold group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-4">
                {older.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="group sm:text-right">
              <p className="label-mono mb-1">Next entry →</p>
              <p className="font-display text-base font-semibold group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-4">
                {newer.title}
              </p>
            </Link>
          )}
        </nav>
      )}

      {post.project && (
        <p className="label-mono mt-10 border-t border-dashed border-border pt-6">
          Related mission:{" "}
          <Link
            href={`/projects/${post.project}`}
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-signal"
          >
            {post.project}
          </Link>
        </p>
      )}
    </main>
  );
}
