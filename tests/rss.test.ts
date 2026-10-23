import { afterEach, describe, expect, it, vi } from "vitest";

const posts = [
  { slug: "newest", title: 'Ampersands & <angle> "quotes"', description: "Fish & chips <b>bold</b>", date: "2026-10-23", tags: [], readingMinutes: 2, content: "", draft: false },
  { slug: "older", title: "Plain title", description: "Plain description", date: "2026-10-01", tags: [], readingMinutes: 1, content: "", draft: false },
];

async function feed(list = posts) {
  vi.resetModules();
  vi.doMock("@/lib/blog", () => ({ getAllPosts: () => list }));
  const { GET } = await import("@/app/feed.xml/route");
  const res = GET();
  return { res, xml: await res.text() };
}

afterEach(() => vi.doUnmock("@/lib/blog"));

describe("RSS feed", () => {
  it("is served as XML and declares the Atom namespace", async () => {
    const { res, xml } = await feed();
    expect(res.headers.get("content-type")).toContain("application/xml");
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
  });

  it("has the channel elements feed validators recommend", async () => {
    const { xml } = await feed();
    expect(xml).toMatch(/<atom:link href="https:\/\/[^"]+\/feed\.xml" rel="self" type="application\/rss\+xml" \/>/);
    expect(xml).toContain("<language>en</language>");
    // the newest post's date, not the build time
    expect(xml).toContain(`<lastBuildDate>${new Date("2026-10-23").toUTCString()}</lastBuildDate>`);
  });

  it("has one item per post with a permalink guid and an RFC 822 date", async () => {
    const { xml } = await feed();
    expect((xml.match(/<item>/g) ?? []).length).toBe(posts.length);
    expect((xml.match(/<\/item>/g) ?? []).length).toBe(posts.length);
    expect(xml).toMatch(/<guid isPermaLink="true">https:\/\/[^<]+\/blog\/newest<\/guid>/);
    expect(xml).toMatch(/<pubDate>[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} GMT<\/pubDate>/);
  });

  it("escapes characters that would break the XML", async () => {
    const { xml } = await feed();
    expect(xml).toContain("Ampersands &amp; &lt;angle&gt; &quot;quotes&quot;");
    expect(xml).toContain("Fish &amp; chips &lt;b&gt;bold&lt;/b&gt;");
    expect(xml).not.toContain("<angle>");
    expect(xml).not.toContain("<b>bold");
  });

  it("omits lastBuildDate when there are no posts, and is still a valid channel", async () => {
    const { xml } = await feed([]);
    expect(xml).not.toContain("lastBuildDate");
    expect(xml).not.toContain("<item>");
    expect(xml).toContain("</channel>");
  });
});
