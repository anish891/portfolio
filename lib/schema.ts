import { aboutContent, heroContent, siteConfig, socialLinks, type Project } from "@/lib/data";
import { ROLE, ROLE_IN_TEXT, SITE_NAME } from "@/lib/seo";

const CONTEXT = "https://schema.org";

/** Stable ids so every page can point at the same person and site instead of redefining them. */
export const PERSON_ID = `${siteConfig.url}/#person`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const personRef = { "@id": PERSON_ID };
const abs = (path: string) => `${siteConfig.url}${path}`;

/** The person and the site, defined once in the root layout. */
export function siteGraph() {
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: heroContent.name,
        url: siteConfig.url,
        jobTitle: `${ROLE} & Full-Stack Developer`,
        description: `${heroContent.name} is an ${ROLE_IN_TEXT} and full-stack developer based in ${heroContent.location}.`,
        email: `mailto:${heroContent.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
        knowsAbout: aboutContent.interests,
        sameAs: socialLinks.filter((l) => l.icon !== "Mail").map((l) => l.url),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteConfig.url,
        name: SITE_NAME,
        inLanguage: "en",
        publisher: personRef,
      },
    ],
  };
}

/** Marks /about as the profile page of the person defined in the root layout. */
export function profilePage() {
  return {
    "@context": CONTEXT,
    "@type": "ProfilePage",
    "@id": abs("/about#profile"),
    url: abs("/about"),
    name: `About ${heroContent.name}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: personRef,
  };
}

/** FAQPage markup for the same questions the about page shows. */
export function faqPage(items: { question: string; answer: string }[]) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    "@id": abs("/about#faq"),
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** Breadcrumb trail; "Home" is added in front. */
export function breadcrumbs(trail: Crumb[]) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path === "/" ? "" : c.path) || siteConfig.url,
    })),
  };
}

export function softwareSourceCode(project: Project) {
  return {
    "@context": CONTEXT,
    "@type": "SoftwareSourceCode",
    "@id": abs(`/projects/${project.id}#code`),
    name: project.title,
    description: project.description,
    url: abs(`/projects/${project.id}`),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.deployedUrl ? { sameAs: project.deployedUrl } : {}),
    keywords: project.techStack.join(", "),
    author: personRef,
    isPartOf: { "@id": WEBSITE_ID },
  };
}

export interface PostForSchema {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export function blogPosting(post: PostForSchema) {
  const url = abs(`/blog/${post.slug}`);
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    keywords: post.tags.join(", "),
    image: `${url}/opengraph-image`,
    author: personRef,
    publisher: personRef,
    isPartOf: { "@id": WEBSITE_ID },
  };
}
