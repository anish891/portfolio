import type { Metadata } from "next";
import { heroContent } from "@/lib/data";

export const SITE_NAME = heroContent.name;

/** The one phrase used for the role everywhere: titles, descriptions and share cards. */
export const ROLE = "Software Engineer";

/** The same role inside a sentence ("an AI engineer"): the acronym keeps its capitals. */
export const ROLE_IN_TEXT = "software engineer";

const { location } = heroContent;

/** The one-sentence answer to "who is Anish Tejwani?", reused by the schema, llms.txt, FAQ and meta tags. */
export const BIO = `${SITE_NAME} is a ${ROLE_IN_TEXT} in ${location}, building full-stack and AI-powered products.`;

interface PageMeta {
  /** Page title without the site suffix; the root layout template adds " — Anish Tejwani". */
  title: string;
  description: string;
  /** Path starting with "/", resolved against metadataBase. */
  path: string;
  /** "article" adds the publish date, author and tags. */
  article?: { publishedTime: string; tags: string[] };
  /** Extra alternates, e.g. the RSS feed link. */
  feed?: boolean;
  /** True when the page's own route has an opengraph-image file, so no shared card is added. */
  ownImage?: boolean;
}

const SHARE_CARD = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE_NAME} · ${ROLE}` }];

/**
 * Metadata for an inner page. Next.js replaces `openGraph` and `twitter` as a whole when a page
 * sets them, so each page has to repeat url and siteName; without that, pages inherit the home
 * page's og:url, which points search and social previews at the wrong address.
 */
export function pageMetadata({ title, description, path, article, feed, ownImage }: PageMeta): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      ...(feed ? { types: { "application/rss+xml": "/feed.xml" } } : {}),
    },
    openGraph: {
      type: article ? "article" : "website",
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title: fullTitle,
      description,
      ...(ownImage ? {} : { images: SHARE_CARD }),
      ...(article
        ? { publishedTime: article.publishedTime, authors: [SITE_NAME], tags: article.tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ownImage ? {} : { images: SHARE_CARD.map((i) => i.url) }),
    },
  };
}
