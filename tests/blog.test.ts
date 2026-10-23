import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getAllTags,
  getHeadings,
  getPost,
  getPostsForProject,
  getPostsForTag,
  parsePostSource,
  readingMinutes,
} from "@/lib/blog";
import { projects } from "@/lib/data";

const valid = (extra = "") => `---
title: A title
description: "A description: with a colon"
date: 2026-10-20
tags: [one, two]
${extra}---

Body text.
`;

describe("parsePostSource", () => {
  it("parses a valid post", () => {
    const post = parsePostSource("my-post.mdx", valid());
    expect(post).toMatchObject({
      slug: "my-post",
      title: "A title",
      description: "A description: with a colon",
      date: "2026-10-20",
      tags: ["one", "two"],
      draft: false,
    });
    expect(post.content.trim()).toBe("Body text.");
  });

  it.each([
    ["missing title", "---\ndescription: d\ndate: 2026-10-20\n---\nx", /missing "title"/],
    ["missing description", "---\ntitle: t\ndate: 2026-10-20\n---\nx", /missing "description"/],
    ["missing date", "---\ntitle: t\ndescription: d\n---\nx", /"date" is missing/],
    ["invalid date", "---\ntitle: t\ndescription: d\ndate: not-a-date\n---\nx", /"date" is missing or not a valid date/],
    ["unknown project", valid("project: no-such-project\n"), /does not match any project id/],
  ])("rejects a post with %s, naming the file", (_name, raw, message) => {
    expect(() => parsePostSource("bad.mdx", raw)).toThrow(message);
    expect(() => parsePostSource("bad.mdx", raw)).toThrow(/content\/blog\/bad\.mdx/);
  });

  it("accepts a project reference that exists", () => {
    expect(parsePostSource("p.mdx", valid(`project: ${projects[0].id}\n`)).project).toBe(projects[0].id);
  });

  it("refuses front matter that would run code at build time", () => {
    const marker = "__frontMatterRan";
    const js = `---js\n{ title: "x", description: "y", date: "2026-10-20", pwn: (globalThis.${marker} = true) }\n---\nbody`;
    delete (globalThis as Record<string, unknown>)[marker];
    expect(() => parsePostSource("evil.mdx", js)).toThrow(/JavaScript front matter is disabled/);
    expect((globalThis as Record<string, unknown>)[marker]).toBeUndefined();
    const longForm = js.replace("---js", "---javascript");
    expect(() => parsePostSource("evil2.mdx", longForm)).toThrow(/JavaScript front matter is disabled/);
  });

  it("treats draft: true as a draft", () => {
    expect(parsePostSource("d.mdx", valid("draft: true\n")).draft).toBe(true);
  });
});

describe("readingMinutes", () => {
  const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

  it("is words divided by 220, rounded, with a minimum of one minute", () => {
    expect(readingMinutes("")).toBe(1);
    expect(readingMinutes(words(100))).toBe(1);
    expect(readingMinutes(words(440))).toBe(2);
    expect(readingMinutes(words(1100))).toBe(5);
  });

  it("does not count fenced code blocks as reading", () => {
    const code = "```js\n" + words(2000) + "\n```";
    expect(readingMinutes(words(220) + "\n\n" + code)).toBe(1);
  });
});

describe("getHeadings", () => {
  it("returns level-2 headings with GitHub-style ids, de-duplicated", () => {
    const md = "# Title\n\n## First thing\n\ntext\n\n### Not included\n\n## First thing\n\n## `Code` & *style*\n";
    expect(getHeadings(md)).toEqual([
      { id: "first-thing", text: "First thing" },
      { id: "first-thing-1", text: "First thing" },
      { id: "code--style", text: "Code & style" },
    ]);
  });

  it("ignores headings inside fenced code blocks", () => {
    expect(getHeadings("## Real\n\n```md\n## Fake\n```\n")).toEqual([{ id: "real", text: "Real" }]);
  });
});

describe("formatDate", () => {
  it("formats in UTC, so it never shifts a day", () => {
    expect(formatDate("2026-10-23")).toBe("October 23, 2026");
    expect(formatDate("2026-01-01", "short")).toBe("Jan 1, 2026");
  });
});

describe("the real content", () => {
  const posts = getAllPosts();

  it("has published posts, sorted newest first", () => {
    expect(posts.length).toBeGreaterThan(0);
    const dates = posts.map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("has unique slugs and non-empty metadata", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    for (const p of posts) {
      expect(p.title.length, p.slug).toBeGreaterThan(0);
      expect(p.description.length, p.slug).toBeGreaterThan(0);
      expect(p.readingMinutes, p.slug).toBeGreaterThanOrEqual(1);
      expect(p.date, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("gives every post unique heading ids, so table-of-contents links work", () => {
    for (const p of posts) {
      const ids = getHeadings(p.content).map((h) => h.id);
      expect(new Set(ids).size, p.slug).toBe(ids.length);
      for (const id of ids) expect(id, p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("links neighbours consistently: older of a post's newer post is the post itself", () => {
    for (const p of posts) {
      const { newer, older } = getAdjacentPosts(p.slug);
      if (newer) expect(getAdjacentPosts(newer.slug).older?.slug).toBe(p.slug);
      if (older) expect(getAdjacentPosts(older.slug).newer?.slug).toBe(p.slug);
    }
    expect(getAdjacentPosts(posts[0].slug).newer).toBeUndefined();
    expect(getAdjacentPosts(posts[posts.length - 1].slug).older).toBeUndefined();
    expect(getAdjacentPosts("does-not-exist")).toEqual({});
  });

  it("finds posts by slug, tag and project", () => {
    expect(getPost(posts[0].slug)?.title).toBe(posts[0].title);
    expect(getPost("does-not-exist")).toBeUndefined();
    const { tag, count } = getAllTags()[0];
    expect(getPostsForTag(tag)).toHaveLength(count);
    expect(getPostsForTag("no-such-tag")).toEqual([]);
    for (const project of projects) {
      for (const p of getPostsForProject(project.id)) expect(p.project).toBe(project.id);
    }
  });

  it("orders tags by use, then alphabetically", () => {
    const tags = getAllTags();
    for (let i = 1; i < tags.length; i++) {
      const a = tags[i - 1];
      const b = tags[i];
      expect(a.count > b.count || (a.count === b.count && a.tag.localeCompare(b.tag) <= 0)).toBe(true);
    }
  });
});

describe("loading posts from disk", () => {
  const dirs: string[] = [];
  afterEach(() => {
    vi.resetModules();
    for (const d of dirs.splice(0)) fs.rmSync(d, { recursive: true, force: true });
  });

  async function blogIn(files: Record<string, string>) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-test-"));
    dirs.push(root);
    fs.mkdirSync(path.join(root, "content", "blog"), { recursive: true });
    for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(root, "content", "blog", name), text);
    vi.resetModules();
    vi.spyOn(process, "cwd").mockReturnValue(root);
    return { root, blog: await import("@/lib/blog") };
  }

  it("refuses two files that would share one slug", async () => {
    const { blog } = await blogIn({ "same.md": valid(), "same.mdx": valid() });
    expect(() => blog.getAllPosts()).toThrow(/same slug "same"/);
  });

  it("hides drafts", async () => {
    const { blog } = await blogIn({ "live.mdx": valid(), "wip.mdx": valid("draft: true\n") });
    expect(blog.getAllPosts().map((p) => p.slug)).toEqual(["live"]);
  });

  it("returns an empty list when there is no content folder", async () => {
    const { root, blog } = await blogIn({});
    fs.rmSync(path.join(root, "content"), { recursive: true });
    expect(blog.getAllPosts()).toEqual([]);
  });

  it("re-reads files on every call in development, but only once in production", async () => {
    const dev = await blogIn({ "a.mdx": valid() });
    expect(dev.blog.getAllPosts()).toHaveLength(1);
    fs.writeFileSync(path.join(dev.root, "content", "blog", "b.mdx"), valid());
    expect(dev.blog.getAllPosts()).toHaveLength(2); // edits show up straight away

    vi.stubEnv("NODE_ENV", "production");
    const prod = await blogIn({ "a.mdx": valid() });
    expect(prod.blog.getAllPosts()).toHaveLength(1);
    fs.writeFileSync(path.join(prod.root, "content", "blog", "b.mdx"), valid());
    expect(prod.blog.getAllPosts()).toHaveLength(1); // cached
  });

  it("hands out a copy, so one caller cannot reorder another caller's list", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { blog } = await blogIn({
      "a.mdx": valid().replace("2026-10-20", "2026-10-01"),
      "b.mdx": valid().replace("2026-10-20", "2026-10-02"),
    });
    const first = blog.getAllPosts();
    first.reverse();
    expect(blog.getAllPosts().map((p) => p.slug)).toEqual(["b", "a"]);
  });
});
