import { ImageResponse } from "next/og";
import { projects } from "@/lib/data";
import { ogFrame } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  // Unknown slugs get a real 404 instead of a cached generic image.
  if (!project) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    ogFrame({
      label: "Mission",
      title: project.title,
      titleSize: 92,
      subtitle: project.description.split(". ")[0],
      footer: project.techStack.slice(0, 4).join(" · "),
    }),
    size
  );
}
