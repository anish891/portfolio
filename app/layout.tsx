import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
