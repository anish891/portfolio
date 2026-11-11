import { describe, expect, it } from "vitest";
import { blogPosting, breadcrumbs, PERSON_ID, profilePage, siteGraph, softwareApplication, softwareSourceCode, WEBSITE_ID } from "@/lib/schema";
import { projects, siteConfig } from "@/lib/data";

describe("siteGraph", () => {
  const graph = siteGraph()["@graph"];
  const person = graph.find((n) => n["@type"] === "Person") as Record<string, unknown>;
  const site = graph.find((n) => n["@type"] === "WebSite") as Record<string, unknown>;

  it("defines the person once with a stable id and every profile in sameAs", () => {
    expect(person["@id"]).toBe(PERSON_ID);
    expect(person.sameAs).toEqual(expect.arrayContaining([siteConfig.githubUrl, siteConfig.xUrl, siteConfig.linkedinUrl]));
    expect(person.jobTitle).toContain("Software Engineer");
  });

  it("never lists the email address as a sameAs profile", () => {
    expect((person.sameAs as string[]).some((u) => u.startsWith("mailto:"))).toBe(false);
  });

  it("defines the website with the person as publisher", () => {
    expect(site["@id"]).toBe(WEBSITE_ID);
    expect(site.publisher).toEqual({ "@id": PERSON_ID });
  });
});

describe("page schema", () => {
  it("profile page points at the person instead of redefining it", () => {
    expect(profilePage().mainEntity).toEqual({ "@id": PERSON_ID });
  });

  it("breadcrumbs start at Home and are numbered with absolute urls", () => {
    const list = breadcrumbs([{ name: "Blog", path: "/blog" }, { name: "Post", path: "/blog/x" }]).itemListElement;
    expect(list.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(list[0]).toMatchObject({ name: "Home", item: siteConfig.url });
    expect(list[2].item).toBe(`${siteConfig.url}/blog/x`);
  });

  it("project schema carries the repo, stack and author reference", () => {
    const p = projects.find((x) => x.githubUrl)!;
    const s = softwareSourceCode(p) as Record<string, unknown>;
    expect(s["@type"]).toBe("SoftwareSourceCode");
    expect(s.codeRepository).toBe(p.githubUrl);
    expect(s.keywords).toBe(p.techStack.join(", "));
    expect(s.author).toEqual({ "@id": PERSON_ID });
  });

  it("omits repository and live-site fields a project does not have", () => {
    const p = { ...projects[0], githubUrl: undefined, deployedUrl: undefined };
    const s = softwareSourceCode(p);
    expect(s).not.toHaveProperty("codeRepository");
    expect(s).not.toHaveProperty("sameAs");
  });

  it("app schema points at the live url and is skipped for projects that are not deployed", () => {
    const p = projects.find((x) => x.deployedUrl)!;
    expect(softwareApplication(p)).toMatchObject({
      "@type": "SoftwareApplication",
      url: p.deployedUrl,
      author: { "@id": PERSON_ID },
    });
    expect(softwareApplication({ ...p, deployedUrl: undefined })).toBeNull();
  });

  it("blog posting has dates, author, publisher and an absolute url", () => {
    const b = blogPosting({ slug: "tea", title: "T", description: "D", date: "2026-10-23", tags: ["a", "b"] }) as Record<string, unknown>;
    expect(b).toMatchObject({
      "@type": "BlogPosting",
      url: `${siteConfig.url}/blog/tea`,
      datePublished: "2026-10-23",
      dateModified: "2026-10-23",
      keywords: "a, b",
      author: { "@id": PERSON_ID },
      publisher: { "@id": PERSON_ID },
    });
  });
});
