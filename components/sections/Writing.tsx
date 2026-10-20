import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { PostList } from "@/components/ui/PostList";

export function Writing() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <Section
      id="writing"
      title="Writing"
      action={
        <Link
          href="/blog"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          All posts
        </Link>
      }
    >
      <PostList posts={posts} />
    </Section>
  );
}
