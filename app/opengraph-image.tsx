import { ImageResponse } from "next/og";

export const alt = "Anish Tejwani — AI Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#fafafa",
          color: "#171717",
        }}
      >
        <div style={{ fontSize: 28, color: "#737373", marginBottom: 24 }}>
          anishtejwani.dev
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
          Anish Tejwani
        </div>
        <div style={{ fontSize: 36, color: "#737373", marginTop: 20 }}>
          AI Engineer · Full-Stack Developer · Product Engineering
        </div>
      </div>
    ),
    size
  );
}
