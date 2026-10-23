import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { heroContent, navItems, projects, siteConfig, socialLinks, techStack } from "@/lib/data";

const root = process.cwd();

describe("projects", () => {
  it("have unique ids and complete content", () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    for (const p of projects) {
      expect(p.id, p.id).toMatch(/^[a-z0-9-]+$/);
      expect(p.title.length, p.id).toBeGreaterThan(0);
      expect(p.description.length, p.id).toBeGreaterThan(0);
      expect(p.longDescription.length, p.id).toBeGreaterThan(p.description.length);
      expect(p.features.length, p.id).toBeGreaterThan(0);
      expect(p.proof.length, p.id).toBeGreaterThan(0);
      expect(p.techStack.length, p.id).toBeGreaterThan(0);
      expect(["ai", "web", "mobile"], p.id).toContain(p.category);
    }
  });

  it("link to real https URLs", () => {
    for (const p of projects) {
      for (const url of [p.deployedUrl, p.githubUrl].filter(Boolean) as string[]) {
        expect(new URL(url).protocol, `${p.id} ${url}`).toBe("https:");
      }
    }
  });

  it("only reference preview images that exist", () => {
    for (const p of projects) {
      if (p.image) expect(fs.existsSync(path.join(root, "public", p.image)), `${p.id}: ${p.image}`).toBe(true);
    }
  });
});

describe("site configuration", () => {
  it("uses https for the site and every profile link", () => {
    expect(new URL(siteConfig.url).protocol).toBe("https:");
    for (const link of socialLinks) {
      const url = new URL(link.url);
      expect(["https:", "mailto:"], link.name).toContain(url.protocol);
    }
  });

  it("lists the same email address everywhere", () => {
    const mail = socialLinks.find((l) => l.icon === "Mail");
    expect(mail?.url).toBe(`mailto:${heroContent.email}`);
  });

  it("has a nav item for each page that exists", () => {
    for (const item of navItems) {
      expect(item.href.startsWith("/"), item.label).toBe(true);
      expect(fs.existsSync(path.join(root, "app", item.href, "page.tsx")), `app${item.href}/page.tsx`).toBe(true);
    }
  });

  it("has a non-empty tech stack with no duplicate skills", () => {
    const all = techStack.flatMap((c) => c.skills.map((s) => s.name));
    expect(all.length).toBeGreaterThan(0);
    expect(new Set(all).size).toBe(all.length);
  });
});
