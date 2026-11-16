import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsForTag } from "@/lib/blog";
import { PostsByYear } from "@/components/ui/PostList";
import { TagList } from "@/components/ui/TagList";
import { safeDecodeURIComponent } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs } from "@/lib/schema";

interface Props {
  params: Promise<{ tag: string }>;
}

// Every tag is known at build time, so anything else is a 404 without rendering (or caching) a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = safeDecodeURIComponent((await params).tag);
  if (tag === null) return {};
  return pageMetadata({
    title: `#${tag}`,
    description: `Posts by Anish Tejwani tagged ${tag}.`,
    path: `/blog/tag/${encodeURIComponent(tag)}`,
  });
}

export default async function TagPage({ params }: Props) {
  const tag = safeDecodeURIComponent((await params).tag);
  if (tag === null) notFound();
  const posts = getPostsForTag(tag);
  if (posts.length === 0) notFound();

  return (
    <main id="main" className="wrap flex-1 pt-10">
      <JsonLd
        data={breadcrumbs([
          { name: "Blog", path: "/blog" },
          { name: `#${tag}`, path: `/blog/tag/${encodeURIComponent(tag)}` },
        ])}
      />
      <header>
        <Link href="/blog" className="ui">
          ← All writing
        </Link>
        <h1 className="page-title mt-6">#{tag}</h1>
        <p className="ui muted mt-3">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
        <div className="mt-2">
          <TagList tags={getAllTags().map((t) => t.tag)} active={tag} />
        </div>
      </header>
      <div className="mt-12">
        <PostsByYear posts={posts} />
      </div>
    </main>
  );
}
