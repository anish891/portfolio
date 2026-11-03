import { describe, expect, it } from "vitest";
import { faqs } from "@/lib/faq";
import { faqPage } from "@/lib/schema";
import { heroContent, projects, techStack } from "@/lib/data";

describe("faqs", () => {
  const items = faqs();
  const answerTo = (start: string) => items.find((i) => i.question.startsWith(start))!.answer;

  it("has unique, non-empty questions and answers", () => {
    expect(new Set(items.map((i) => i.question)).size).toBe(items.length);
    for (const i of items) {
      expect(i.question.trim().length).toBeGreaterThan(5);
      expect(i.answer.trim().length).toBeGreaterThan(20);
    }
  });

  it("names every project and the contact address from the site data", () => {
    const built = answerTo("What has");
    for (const p of projects) expect(built).toContain(p.title);
    expect(answerTo("Is Anish Tejwani available")).toContain(heroContent.email);
  });

  it("lists every skill from the tech stack", () => {
    const stack = answerTo("What technologies");
    for (const c of techStack) for (const s of c.skills) expect(stack).toContain(s.name);
  });

  it("keeps the AI capitals and the location", () => {
    expect(answerTo("Who is")).toContain("a software engineer");
    expect(answerTo("Who is")).toContain(heroContent.location);
  });
});

describe("faqPage", () => {
  it("turns each item into a Question with an accepted Answer, in order", () => {
    const items = faqs();
    const page = faqPage(items);
    expect(page["@type"]).toBe("FAQPage");
    expect(page.mainEntity).toHaveLength(items.length);
    expect(page.mainEntity.map((q) => q.name)).toEqual(items.map((i) => i.question));
    expect(page.mainEntity[0].acceptedAnswer).toEqual({ "@type": "Answer", text: items[0].answer });
  });
});
