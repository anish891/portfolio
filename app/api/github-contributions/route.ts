import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/data";

// Fresh data for a few minutes at most. Browsers revalidate; the CDN may serve a stale copy
// briefly while it refreshes in the background.
const CACHE_SECONDS = 300;
const HEADERS = {
  "Cache-Control": `public, max-age=0, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`,
};

const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Straight from GitHub's GraphQL API: accurate to within minutes. Needs GITHUB_TOKEN. */
async function fromGitHub(token: string): Promise<Day[]> {
  const to = new Date();
  const from = new Date(to.getTime() - 365 * 24 * 60 * 60 * 1000);
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks { contributionDays { date contributionCount contributionLevel } }
            }
          }
        }
      }`,
      variables: { login: siteConfig.githubUsername, from: from.toISOString(), to: to.toISOString() },
    }),
    next: { revalidate: CACHE_SECONDS },
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) throw new Error("Unexpected GitHub response");
  return weeks.flatMap((w: { contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }> }) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
      level: LEVELS[d.contributionLevel] ?? 0,
    }))
  );
}

/**
 * The heatmap draws columns of seven days, so the list must start on a Sunday and hold at most
 * 53 weeks. Both sources are trimmed to that shape here.
 */
function normalize(days: Day[]): Day[] {
  const recent = days.slice(-371);
  const firstSunday = recent.findIndex(
    (d) => new Date(`${d.date}T00:00:00Z`).getUTCDay() === 0
  );
  return firstSunday > 0 ? recent.slice(firstSunday) : recent;
}

/** Fallback with no token: a public scraper that can lag GitHub by up to an hour. */
async function fromPublicApi(): Promise<Day[]> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${siteConfig.githubUsername}?y=last`,
    { next: { revalidate: CACHE_SECONDS } }
  );
  if (!res.ok) throw new Error(`Public API ${res.status}`);
  const data = await res.json();
  return data.contributions as Day[];
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  try {
    let contributions: Day[];
    try {
      contributions = normalize(token ? await fromGitHub(token) : await fromPublicApi());
    } catch (err) {
      // If the token path fails (expired token, rate limit), still show something.
      if (!token) throw err;
      contributions = normalize(await fromPublicApi());
    }
    const lastYear = contributions.reduce((sum, d) => sum + d.count, 0);
    return NextResponse.json(
      { total: { lastYear }, contributions, source: token ? "github" : "public-api" },
      { headers: HEADERS }
    );
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
  }
}
