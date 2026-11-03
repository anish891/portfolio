import { aboutContent, heroContent, projects, siteConfig, socialLinks } from "@/lib/data";
import { BIO } from "@/lib/seo";
import type { Post } from "@/lib/blog";

const summary = () =>
  `${BIO} ${heroContent.intro}`;

const profileLinks = () =>
  socialLinks.filter((l) => l.icon !== "Mail").map((l) => `- [${l.name}](${l.url})`);

/** Short index for AI assistants, following the llms.txt convention (https://llmstxt.org). */
export function llmsTxt(posts: Pick<Post, "slug" | "title" | "description">[]): string {
  return [
    `# ${heroContent.name}`,
    "",
    `> ${summary()}`,
    "",
    `Contact: ${heroContent.email}. Status: ${heroContent.status}.`,
    "",
    "## Projects",
    ...projects.map(
      (p) => `- [${p.title}](${siteConfig.url}/projects/${p.id}): ${p.description}`
    ),
    "",
    "## Writing",
    ...posts.map((p) => `- [${p.title}](${siteConfig.url}/blog/${p.slug}): ${p.description}`),
    "",
    "## Pages",
    `- [About](${siteConfig.url}/about): background, interests and tools`,
    `- [All projects](${siteConfig.url}/projects)`,
    `- [Blog](${siteConfig.url}/blog), with an [RSS feed](${siteConfig.url}/feed.xml)`,
    "",
    "## Profiles",
    ...profileLinks(),
    "",
    "## Optional",
    `- [Full text of the projects and posts](${siteConfig.url}/llms-full.txt)`,
    "",
  ].join("\n");
}

/** The same index with the full project write-ups and post list, for assistants that want the detail. */
export function llmsFullTxt(posts: Pick<Post, "slug" | "title" | "description" | "date">[]): string {
  const projectSections = projects.flatMap((p) => [
    `## ${p.title}`,
    "",
    `URL: ${siteConfig.url}/projects/${p.id}`,
    ...(p.deployedUrl ? [`Live: ${p.deployedUrl}`] : []),
    ...(p.githubUrl ? [`Source: ${p.githubUrl}`] : []),
    `Stack: ${p.techStack.join(", ")}`,
    "",
    p.longDescription,
    "",
    "Features:",
    ...p.features.map((f) => `- ${f}`),
    "",
  ]);

  return [
    `# ${heroContent.name}`,
    "",
    `> ${summary()}`,
    "",
    `Contact: ${heroContent.email}. Status: ${heroContent.status}.`,
    `Interests: ${aboutContent.interests.join(", ")}.`,
    "",
    "# Projects",
    "",
    ...projectSections,
    "# Writing",
    "",
    ...posts.map(
      (p) => `- ${p.date}: [${p.title}](${siteConfig.url}/blog/${p.slug}): ${p.description}`
    ),
    "",
    "# Profiles",
    "",
    ...profileLinks(),
    "",
  ].join("\n");
}
