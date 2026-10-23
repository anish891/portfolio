import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsForTag } from "@/lib/blog";
import { PostList } from "@/components/ui/PostList";
import { TagList } from "@/components/ui/TagList";
import { PageHeader } from "@/components/ui/PageHeader";
import { safeDecodeURIComponent } from "@/lib/utils";

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
  return {
    title: `#${tag}`,
    description: `Posts tagged ${tag}.`,
    alternates: { canonical: `/blog/tag/${encodeURIComponent(tag)}` },
  };
}

export default async function TagPage({ params }: Props) {
  const tag = safeDecodeURIComponent((await params).tag);
  if (tag === null) notFound();
  const posts = getPostsForTag(tag);
  if (posts.length === 0) notFound();

  return (
    <main id="main" className="container-prose pt-14">
      <PageHeader
        back={{ href: "/blog", label: "Blog" }}
        kicker="Tag"
        title={`#${tag}`}
        description={`${posts.length} ${posts.length === 1 ? "entry" : "entries"}`}
        uppercase={false}
      />
      <div className="mt-6">
        <TagList tags={getAllTags().map((t) => t.tag)} active={tag} />
      </div>
      <div className="mt-10">
        <PostList posts={posts} headingLevel="h2" />
      </div>
    </main>
  );
}
