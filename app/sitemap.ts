import type { MetadataRoute } from "next";
import { projects, siteConfig } from "@/lib/data";
import { getAllPosts, getAllTags, getPostsForTag } from "@/lib/blog";

// lastModified is only set where the date is known: a post's own date, or the newest post on a
// listing page. Pages whose content lives in code have no tracked date, and a made-up one
// (such as the build time) would tell crawlers the page changed when it did not.
export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();
  const posts = allPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.date,
  }));
  const projectPages = projects.map((p) => ({ url: `${siteConfig.url}/projects/${p.id}` }));
  return [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/blog`, lastModified: allPosts[0]?.date },
    { url: `${siteConfig.url}/projects` },
    { url: `${siteConfig.url}/about` },
    ...getAllTags().map(({ tag }) => ({
      url: `${siteConfig.url}/blog/tag/${encodeURIComponent(tag)}`,
      lastModified: getPostsForTag(tag)[0]?.date,
    })),
    ...projectPages,
    ...posts,
  ];
}
