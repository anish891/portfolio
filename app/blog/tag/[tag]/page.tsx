import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllTags, getPostsForTag } from "@/lib/blog";
import { PostList } from "@/components/ui/PostList";
import { TagList } from "@/components/ui/TagList";

interface Props {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent((await params).tag);
  return {
    title: `#${tag}`,
    description: `Posts tagged ${tag}.`,
    alternates: { canonical: `/blog/tag/${encodeURIComponent(tag)}` },
  };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag);
  const posts = getPostsForTag(tag);
  if (posts.length === 0) notFound();

  return (
    <main id="main" className="container-prose pt-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Blog
      </Link>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight">#{tag}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      <div className="mt-6">
        <TagList tags={getAllTags().map((t) => t.tag)} active={tag} />
      </div>
      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </main>
  );
}
