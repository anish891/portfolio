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
          background: "linear-gradient(135deg, #0b0b14 0%, #1a1238 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, color: "#22d3ee", marginBottom: 24 }}>
          anishtejwani.dev
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>
          Anish Tejwani
        </div>
        <div style={{ fontSize: 36, color: "#a1a1c0", marginTop: 20 }}>
          AI Engineer · Full-Stack Developer · Product Engineering
        </div>
      </div>
    ),
    size
  );
}
