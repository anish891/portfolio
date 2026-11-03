import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { ALLOWED_AI_CRAWLERS, BLOCKED_TRAINING_CRAWLERS } from "@/lib/crawlers";
import { llmsFullTxt, llmsTxt } from "@/lib/llms";
import { projects, siteConfig } from "@/lib/data";

describe("robots", () => {
  const rules = robots().rules as { userAgent: string | string[]; allow?: string; disallow?: string }[];
  const forAgent = (name: string) => rules.find((r) => [r.userAgent].flat().includes(name));

  it("allows everything for ordinary crawlers", () => {
    expect(forAgent("*")).toMatchObject({ allow: "/" });
  });

  it("allows the AI search and user-request bots", () => {
    for (const bot of ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "PerplexityBot"]) {
      expect(forAgent(bot)).toMatchObject({ allow: "/" });
    }
  });

  it("blocks the training bots", () => {
    for (const bot of ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended", "Applebot-Extended"]) {
      expect(forAgent(bot)).toMatchObject({ disallow: "/" });
    }
  });

  it("never lists a bot in both groups", () => {
    const both = ALLOWED_AI_CRAWLERS.filter((b) => BLOCKED_TRAINING_CRAWLERS.includes(b));
    expect(both).toEqual([]);
  });

  it("points at the sitemap", () => {
    expect(robots().sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});

describe("sitemap", () => {
  const entries = sitemap();

  it("lists every project and has no duplicate urls", () => {
    for (const p of projects) expect(entries.map((e) => e.url)).toContain(`${siteConfig.url}/projects/${p.id}`);
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("only sets lastModified to real yyyy-mm-dd dates", () => {
    for (const e of entries) {
      if (e.lastModified !== undefined) expect(String(e.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("gives pages without a tracked date no lastModified", () => {
    const home = entries.find((e) => e.url === siteConfig.url);
    expect(home?.lastModified).toBeUndefined();
  });
});

describe("llms.txt", () => {
  const posts = [{ slug: "tea", title: "Tea", description: "About tea", date: "2026-10-22" }];

  it("follows the llms.txt shape: H1, blockquote summary, then link sections", () => {
    const t = llmsTxt(posts);
    expect(t.startsWith("# Anish Tejwani\n\n> ")).toBe(true);
    expect(t).toContain("## Projects");
    expect(t).toContain(`- [Tea](${siteConfig.url}/blog/tea): About tea`);
  });

  it("writes the role with its capitals intact", () => {
    expect(llmsTxt(posts)).toContain("is a software engineer at Tata Consultancy Services (TCS)");
  });

  it("links every project with an absolute url", () => {
    const t = llmsTxt(posts);
    for (const p of projects) expect(t).toContain(`(${siteConfig.url}/projects/${p.id})`);
  });

  it("lists profiles but not the mailto link as a profile", () => {
    const t = llmsTxt(posts);
    expect(t).toContain(siteConfig.githubUrl);
    expect(t).not.toContain("](mailto:");
  });

  it("the full version carries each project's long description", () => {
    const t = llmsFullTxt(posts);
    for (const p of projects) expect(t).toContain(p.longDescription);
  });
});
