import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteGraph } from "@/lib/schema";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Both are variable fonts, self-hosted by next/font with size-adjusted fallbacks (no layout shift).
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anish Tejwani — Software Engineer in Mumbai",
    template: "%s — Anish Tejwani",
  },
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  description:
    "Anish Tejwani is a software engineer in Mumbai, India, building full-stack and AI-powered products. Projects: GraphSentinel (security-graph agent), Unbake (spreadsheet formula recovery) and ChainDeck (option-chain analytics). Open to full-time roles and freelance work.",
  keywords: [
    "Anish Tejwani",
    "Anish Tejwani software engineer",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "Portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "LangChain",
    "Machine Learning",
  ],
  authors: [{ name: "Anish Tejwani" }],
  creator: "Anish Tejwani",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Anish Tejwani — Software Engineer in Mumbai",
    description:
      "Software engineer in Mumbai. GraphSentinel, Unbake and ChainDeck.",
    url: "/",
    siteName: "Anish Tejwani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Tejwani — Software Engineer in Mumbai",
    description:
      "Software engineer in Mumbai. GraphSentinel, Unbake and ChainDeck.",
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
      className={`${sourceSerif.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint: resolves the theme (saved choice, else the system setting)
            to a .light or .dark class, so there is no flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=null;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="dark"&&t!=="light")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.add(t)})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd data={siteGraph()} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
