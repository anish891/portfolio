import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { ALLOWED_AI_CRAWLERS, BLOCKED_TRAINING_CRAWLERS } from "@/lib/crawlers";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // A crawler follows only the most specific group that names it, so the AI search bots
      // get their own explicit allow rather than relying on the "*" group.
      { userAgent: "*", allow: "/" },
      { userAgent: ALLOWED_AI_CRAWLERS, allow: "/" },
      { userAgent: BLOCKED_TRAINING_CRAWLERS, disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
