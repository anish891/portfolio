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
  // Start on the first Sunday within the last 364 days: the heatmap draws whole weeks, and
  // GitHub limits a request to one year, so this shows every day it fetches (none are dropped).
  const from = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate() - 364));
  from.setUTCDate(from.getUTCDate() + ((7 - from.getUTCDay()) % 7));
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

// Per-instance memory cache. Next's own fetch cache cannot help here: the GitHub request body
// contains a changing timestamp, so every call would look new. This keeps repeat visitors from
// each costing a GitHub API call, and serves the last good data if GitHub is briefly unavailable.
interface Cached {
  at: number;
  contributions: Day[];
  source: "github" | "public-api";
}
let cache: Cached | null = null;
let inFlight: Promise<Cached> | null = null;

async function refresh(): Promise<Cached> {
  const token = process.env.GITHUB_TOKEN;
  let contributions: Day[];
  let source: Cached["source"] = token ? "github" : "public-api";
  try {
    contributions = normalize(token ? await fromGitHub(token) : await fromPublicApi());
  } catch (err) {
    // If the token path fails (expired token, rate limit), still show something.
    if (!token) throw err;
    console.error("[github-contributions] GitHub GraphQL failed, using the public API:", errorMessage(err));
    contributions = normalize(await fromPublicApi());
    source = "public-api";
  }
  return { at: Date.now(), contributions, source };
}

/** Messages only: error objects can carry request details, and the token must never be logged. */
function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "unknown error";
}

export async function GET() {
  const fresh = cache && Date.now() - cache.at < CACHE_SECONDS * 1000;
  try {
    if (!fresh) {
      // Share one upstream request between concurrent visitors.
      inFlight ??= refresh().finally(() => {
        inFlight = null;
      });
      cache = await inFlight;
    }
  } catch (err) {
    console.error("[github-contributions] refresh failed:", errorMessage(err));
    if (!cache) return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    // Fall through and serve the last good data.
  }
  const { contributions, source } = cache!;
  const lastYear = contributions.reduce((sum, d) => sum + d.count, 0);
  return NextResponse.json({ total: { lastYear }, contributions, source }, { headers: HEADERS });
}
