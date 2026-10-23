import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { projects } from "@/lib/data";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * gray-matter can evaluate "---js" / "---javascript" front matter with eval(), which would let a
 * post run arbitrary code at build time. Posts only ever need YAML, so the JavaScript engine is
 * replaced with one that refuses to run.
 */
const MATTER_OPTIONS = {
  engines: {
    javascript: {
      parse(): never {
        throw new Error("JavaScript front matter is disabled; use YAML between --- lines");
      },
    },
  },
};

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
  draft: boolean;
}

export function readingMinutes(text: string): number {
  // Code blocks are skimmed, not read word by word, so they are left out of the estimate.
  const prose = text.replace(/^```[\s\S]*?^```/gm, "");
  const words = prose.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Turns the text of one post file into a Post, or throws a clear error naming the file.
 * Kept free of file-system access so it can be tested directly.
 */
export function parsePostSource(file: string, raw: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const fail = (msg: string): never => {
    throw new Error(`content/blog/${file}: ${msg}`);
  };

  const { data, content } = matter(raw, MATTER_OPTIONS);

  if (!data.title) fail('missing "title" in frontmatter');
  if (!data.description) fail('missing "description" in frontmatter');
  const date = new Date(data.date);
  if (!data.date || Number.isNaN(date.getTime())) {
    fail('"date" is missing or not a valid date (use yyyy-mm-dd)');
  }
  if (data.project && !projects.some((p) => p.id === data.project)) {
    fail(
      `"project: ${data.project}" does not match any project id (${projects
        .map((p) => p.id)
        .join(", ")})`
    );
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    date: date.toISOString().slice(0, 10),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    project: data.project ? String(data.project) : undefined,
    readingMinutes: readingMinutes(content),
    content,
    draft: Boolean(data.draft),
  };
}

function readPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));

  // "x.md" and "x.mdx" would both become the slug "x": refuse rather than silently pick one.
  const seen = new Map<string, string>();
  for (const f of files) {
    const slug = f.replace(/\.mdx?$/, "");
    const other = seen.get(slug);
    if (other) throw new Error(`content/blog: "${other}" and "${f}" produce the same slug "${slug}"`);
    seen.set(slug, f);
  }

  return files
    .map((f) => parsePostSource(f, fs.readFileSync(path.join(BLOG_DIR, f), "utf8")))
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

// In production the content cannot change while the process runs, and the layout plus each page
// ask for the post list several times, so read and parse the files once. In development the
// files are re-read every time so edits show up straight away.
let cachedPosts: Post[] | null = null;

/** All published posts, newest first. Posts with `draft: true` are skipped. */
export function getAllPosts(): Post[] {
  if (process.env.NODE_ENV !== "production") return readPosts();
  cachedPosts ??= readPosts();
  return [...cachedPosts];
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Every tag in use, with how many posts carry it, most-used first. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsForTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
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

export interface Heading {
  id: string;
  text: string;
}

/** Level-2 headings of a post, with the same ids rehype-slug gives them. */
export function getHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const withoutCode = markdown.replace(/^```[\s\S]*?^```/gm, "");
  return [...withoutCode.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => {
    const text = m[1].replace(/[`*_]/g, "");
    return { id: slugger.slug(text), text };
  });
}

/** Neighbouring posts in date order: `newer` is the next-published, `older` the previous. */
export function getAdjacentPosts(slug: string): { newer?: Post; older?: Post } {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}
