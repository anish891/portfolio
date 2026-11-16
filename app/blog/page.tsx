import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { TagList } from "@/components/ui/TagList";
import { PostsByYear } from "@/components/ui/PostList";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Write-ups by Anish Tejwani on AI agents, data tools and the projects behind them: how they work, what broke, and what changed.",
  path: "/blog",
  feed: true,
});

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <main id="main" className="wrap flex-1 pt-12">
      <JsonLd data={breadcrumbs([{ name: "Blog", path: "/blog" }])} />
      <header>
        <h1 className="page-title">Writing</h1>
        <p className="muted mt-3">
          Write-ups on what I build: how it works, what broke, and what I&apos;d change.
        </p>
        <p className="ui muted mt-3">
          <a href="/feed.xml">RSS feed</a> · {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
        {tags.length > 0 && (
          <div className="mt-2">
            <TagList tags={tags.map((t) => t.tag)} />
          </div>
        )}
      </header>
      <div className="mt-12">
        {posts.length ? (
          <PostsByYear posts={posts} />
        ) : (
          <p className="ui muted">Nothing here yet.</p>
        )}
      </div>
    </main>
  );
}
