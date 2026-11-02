import { heroContent, projects, siteConfig, techStack } from "@/lib/data";
import { ROLE_IN_TEXT } from "@/lib/seo";

export interface Faq {
  question: string;
  answer: string;
}

const list = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/**
 * Questions people ask about the site owner. Every answer is assembled from the same data the rest
 * of the site renders, so the FAQ cannot drift from the projects, stack and contact details.
 */
export function faqs(): Faq[] {
  const name = heroContent.name;
  return [
    {
      question: `Who is ${name}?`,
      answer: `${name} is an ${ROLE_IN_TEXT} and full-stack developer based in ${heroContent.location}. He builds tools that find the signal in messy data: option chains, spreadsheets and security graphs.`,
    },
    {
      question: `What has ${name} built?`,
      answer: `${list(
        projects.map((p) => p.title)
      )}. ${projects.map((p) => `${p.title}: ${p.description}`).join(" ")} Each has a case study on the projects page.`,
    },
    {
      question: `Is ${name} available for work?`,
      answer: `Yes. He is open to full-time roles and freelance work. The quickest way to reach him is ${heroContent.email}.`,
    },
    {
      question: `What technologies does ${name} work with?`,
      answer: techStack
        .map((c) => `${c.name}: ${c.skills.map((s) => s.name).join(", ")}.`)
        .join(" "),
    },
    {
      question: `Where can I see ${name}'s code and writing?`,
      answer: `His code is on GitHub at ${siteConfig.githubUrl.replace("https://", "")}. Write-ups on how each project works are on the blog, which also has an RSS feed.`,
    },
    {
      question: `What does ${name} do outside of engineering?`,
      answer:
        "He plays sports hard and gets hurt more often than he should, drinks a lot of tea, and likes making things by hand. The blog has posts on each.",
    },
  ];
}
