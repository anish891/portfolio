import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fafafa",
          color: "#171717",
        }}
      >
        <div style={{ fontSize: 28, color: "#737373" }}>
          {`${siteConfig.url.replace("https://", "")}/blog`}
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.1 }}>
          {post?.title ?? "Blog"}
        </div>
        <div style={{ fontSize: 30, color: "#737373" }}>Anish Tejwani</div>
      </div>
    ),
    size
  );
}
