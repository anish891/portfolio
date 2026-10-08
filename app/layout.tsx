import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { siteConfig, heroContent, socialLinks } from "@/lib/data";
import { Providers } from "@/components/Providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anish Tejwani — AI • Full Stack • Product Engineering",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
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
    title: "Anish Tejwani — AI Engineer & Full-Stack Developer",
    description:
      "Building intelligent software systems, AI-powered applications, and scalable web platforms.",
    url: "/",
    siteName: "Anish Tejwani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anish Tejwani — AI Engineer & Full-Stack Developer",
    description:
      "Building intelligent software systems, AI-powered applications, and scalable web platforms.",
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          {children}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
