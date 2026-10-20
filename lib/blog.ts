import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  /** Slug of the project this post is about (matches lib/data.ts) */
  project?: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function parsePost(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: new Date(data.date).toISOString().slice(0, 10),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    project: data.project ? String(data.project) : undefined,
    readingMinutes: readingMinutes(content),
    content,
  };
}

/** All published posts, newest first. Posts with `draft: true` are skipped. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => ({
      post: parsePost(file),
      draft: Boolean(
        matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8")).data.draft
      ),
    }))
    .filter((p) => !p.draft)
    .map((p) => p.post)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsForProject(projectId: string): Post[] {
  return getAllPosts().filter((p) => p.project === projectId);
}

export function formatDate(iso: string, style: "short" | "long" = "long"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
