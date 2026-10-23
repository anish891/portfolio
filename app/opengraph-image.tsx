import { ImageResponse } from "next/og";
import { ogFrame } from "@/lib/og";

export const alt = "Anish Tejwani — AI Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    ogFrame({
      label: "Flight manual",
      title: "Anish Tejwani",
      titleSize: 104,
      subtitle: "AI engineer and full-stack developer. Tools that find the signal in messy data.",
      byline: "anishtejwani.dev",
      footer: "Mumbai · 19.08°N 72.88°E",
    }),
    size
  );
}
