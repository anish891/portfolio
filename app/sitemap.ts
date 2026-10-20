import type { MetadataRoute } from "next";
import { labEntries } from "@/lib/lab";
import { projects, siteConfig } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

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
    { url: `${siteConfig.url}/lab`, changeFrequency: "monthly", priority: 0.5 },
    ...labEntries.map((e) => ({
      url: `${siteConfig.url}/lab/${e.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
    ...projectPages,
    ...posts,
  ];
}
