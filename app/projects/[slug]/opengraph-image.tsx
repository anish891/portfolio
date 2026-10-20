import { ImageResponse } from "next/og";
import { projects, siteConfig } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
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
          {`${siteConfig.url.replace("https://", "")}/projects`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
            {project?.title ?? "Project"}
          </div>
          <div style={{ fontSize: 32, color: "#737373", marginTop: 20, lineHeight: 1.3 }}>
            {project?.description.split(". ")[0]}
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#737373" }}>
          {project?.techStack.join(" · ")}
        </div>
      </div>
    ),
    size
  );
}
