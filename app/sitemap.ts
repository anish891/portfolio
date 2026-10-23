import type { MetadataRoute } from "next";
import { projects, siteConfig } from "@/lib/data";
import { getAllPosts, getAllTags } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  const projectPages = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteConfig.url}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/about`, changeFrequency: "yearly", priority: 0.5 },
    ...getAllTags().map(({ tag }) => ({
      url: `${siteConfig.url}/blog/tag/${encodeURIComponent(tag)}`,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    })),
    ...projectPages,
    ...posts,
  ];
}
