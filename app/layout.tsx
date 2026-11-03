import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteGraph } from "@/lib/schema";
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
    default: "Anish Tejwani — Software Engineer at TCS",
    template: "%s — Anish Tejwani",
  },
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  description:
    "Anish Tejwani is a software engineer at Tata Consultancy Services (TCS) in Mumbai, India, building full-stack and AI-powered products. Projects: GraphSentinel (security-graph agent), Unbake (spreadsheet formula recovery) and ChainDeck (option-chain analytics).",
  keywords: [
    "Anish Tejwani",
    "Anish Tejwani TCS",
    "Anish Tejwani software engineer",
    "Tata Consultancy Services",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Engineer",
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
    title: "Anish Tejwani — Software Engineer at TCS",
    description:
      "Software engineer at Tata Consultancy Services (TCS), Mumbai. GraphSentinel, Unbake and ChainDeck.",
    url: "/",
    siteName: "Anish Tejwani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Tejwani — Software Engineer at TCS",
    description:
      "Software engineer at Tata Consultancy Services (TCS), Mumbai. GraphSentinel, Unbake and ChainDeck.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <JsonLd data={siteGraph()} />
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
