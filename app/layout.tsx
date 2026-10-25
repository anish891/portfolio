import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, heroContent, socialLinks } from "@/lib/data";
import { Providers } from "@/components/Providers";
import { serializeJsonLd } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/blog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RouteScan } from "@/components/ui/RouteScan";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-plex-condensed",
  subsets: ["latin"],
  // The display face is only ever used at semibold (checked across every page).
  weight: ["600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  // Labels and code are only ever regular weight.
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anish Tejwani — AI • Full Stack • Product Engineering",
    template: "%s — Anish Tejwani",
  },
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  description:
    "Personal portfolio of Anish Tejwani — AI Engineer, Full-Stack Developer, and Builder. Building intelligent software systems, AI-powered applications, and scalable web platforms.",
  keywords: [
    "Anish Tejwani",
    "AI Engineer",
    "Full-Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "LangChain",
    "Machine Learning",
    "Software Engineer",
  ],
  authors: [{ name: "Anish Tejwani" }],
  creator: "Anish Tejwani",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Anish Tejwani · AI Agents Engineer",
    description: "Building AI agents in Mumbai. GraphSentinel, Unbake, ChainDeck.",
    url: "/",
    siteName: "Anish Tejwani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Tejwani · AI Agents Engineer",
    description: "Building AI agents in Mumbai. GraphSentinel, Unbake, ChainDeck.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: heroContent.name,
  url: siteConfig.url,
  email: `mailto:${heroContent.email}`,
  jobTitle: "AI Engineer & Full-Stack Developer",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  sameAs: socialLinks.filter((l) => l.icon !== "Mail").map((l) => l.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script: applies saved theme class before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.classList.add("dark");else if(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>
          <RouteScan />
          <Navbar posts={getAllPosts().map(({ slug, title, description, tags }) => ({ slug, title, description, tags }))} />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
