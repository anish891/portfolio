import { describe, expect, it } from "vitest";
import { pageMetadata, ROLE } from "@/lib/seo";

describe("pageMetadata", () => {
  const base = { title: "About", description: "d", path: "/about" };

  it("gives the page its own canonical and og:url, not the home page's", () => {
    const m = pageMetadata(base);
    expect(m.alternates?.canonical).toBe("/about");
    expect(m.openGraph?.url).toBe("/about");
  });

  it("repeats the site name in social titles, since the title template does not apply there", () => {
    const m = pageMetadata(base);
    expect(m.openGraph?.title).toBe("About — Anish Tejwani");
    expect(m.twitter?.title).toBe("About — Anish Tejwani");
  });

  it("marks articles with the publish date, author and tags", () => {
    const m = pageMetadata({ ...base, article: { publishedTime: "2026-10-23", tags: ["ai", "nifty"] } });
    expect(m.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-10-23",
      authors: ["Anish Tejwani"],
      tags: ["ai", "nifty"],
    });
  });

  it("is a plain website page without article fields otherwise", () => {
    const og = pageMetadata(base).openGraph as Record<string, unknown>;
    expect(og.type).toBe("website");
    expect(og).not.toHaveProperty("publishedTime");
  });

  it("only adds the RSS alternate when asked", () => {
    expect(pageMetadata(base).alternates?.types).toBeUndefined();
    expect(pageMetadata({ ...base, feed: true }).alternates?.types).toEqual({
      "application/rss+xml": "/feed.xml",
    });
  });

  it("uses one role phrase", () => {
    expect(ROLE).toBe("AI Engineer");
  });
});

describe("pageMetadata share image", () => {
  const base = { title: "About", description: "d", path: "/about" };

  it("adds the shared card to pages that have no card of their own", () => {
    const m = pageMetadata(base);
    expect(m.openGraph).toMatchObject({ images: [{ url: "/opengraph-image", width: 1200, height: 630 }] });
    expect(m.twitter).toMatchObject({ images: ["/opengraph-image"] });
  });

  it("leaves pages with their own opengraph-image file alone", () => {
    const m = pageMetadata({ ...base, ownImage: true });
    expect(m.openGraph).not.toHaveProperty("images");
    expect(m.twitter).not.toHaveProperty("images");
  });
});
