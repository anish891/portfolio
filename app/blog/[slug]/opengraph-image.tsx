import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/data";
import { ogFrame } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  // Unknown slugs get a real 404 instead of a cached generic image.
  if (!post) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    ogFrame({
      label: "Flight log",
      title: post.title,
      titleSize: post.title.length > 50 ? 60 : 72,
      footer: `${siteConfig.url.replace("https://", "")}/blog`,
    }),
    size
  );
}
