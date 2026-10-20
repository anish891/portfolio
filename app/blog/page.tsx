import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { TagList } from "@/components/ui/TagList";
import { PostList } from "@/components/ui/PostList";

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
    <main id="main" className="container-prose pt-16">
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Write-ups on what I build: how it works, what broke, and what I&apos;d change.{" "}
        <a
          href="/feed.xml"
          className="underline decoration-border underline-offset-4 hover:decoration-foreground"
        >
          RSS
        </a>
      </p>
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
