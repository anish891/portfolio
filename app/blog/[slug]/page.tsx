import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
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
          {post.tags.length > 0 && <> {" · "}{post.tags.join(", ")}</>}
        </p>
      </header>

      <article className="mt-10">
        <PostBody source={post.content} />
      </article>

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
