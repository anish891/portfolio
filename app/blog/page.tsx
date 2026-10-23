import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { TagList } from "@/components/ui/TagList";
import { PostList } from "@/components/ui/PostList";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Write-ups on the things I've built: how they work, what broke, and what I'd do differently.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <main id="main" className="container-prose pt-14">
      <PageHeader
        kicker="Flight log"
        title="Blog"
        description="Write-ups on what I build: how it works, what broke, and what I'd change."
      >
        <p className="label-mono mt-4">
          <a
            href="/feed.xml"
            className="underline decoration-border underline-offset-4 hover:decoration-signal"
          >
            RSS feed
          </a>
          {" · "}
          {posts.length} {posts.length === 1 ? "entry" : "entries"}
        </p>
      </PageHeader>
      {tags.length > 0 && (
        <div className="mt-6">
          <TagList tags={tags.map((t) => t.tag)} />
        </div>
      )}
      <div className="mt-10">
        {posts.length ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-sm text-muted-foreground">Nothing here yet.</p>
        )}
      </div>
    </main>
  );
}
