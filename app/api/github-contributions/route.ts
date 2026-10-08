import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/data";

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${siteConfig.githubUsername}?y=last`,
      {
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
