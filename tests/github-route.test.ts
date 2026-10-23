import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const NOW = new Date("2026-10-24T10:00:00Z");
const DAY_MS = 24 * 60 * 60 * 1000;
const SECRET = "ghp_SUPER_SECRET_TOKEN_VALUE_1234567890";

/** The public scraper's shape: ~370 days ending today. */
function publicApiBody() {
  const contributions = Array.from({ length: 370 }, (_, i) => ({
    date: new Date(NOW.getTime() - (369 - i) * DAY_MS).toISOString().slice(0, 10),
    count: i % 4,
    level: i % 4,
  }));
  return { total: { lastYear: 0 }, contributions };
}

/** GitHub GraphQL's shape: weeks of days, with level names. */
function graphQlBody(from: string) {
  const start = new Date(from);
  const days = [];
  for (let d = start.getTime(); d <= NOW.getTime(); d += DAY_MS) {
    days.push({ date: new Date(d).toISOString().slice(0, 10), contributionCount: 2, contributionLevel: "FIRST_QUARTILE" });
  }
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push({ contributionDays: days.slice(i, i + 7) });
  return { data: { user: { contributionsCollection: { contributionCalendar: { weeks } } } } };
}

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

async function loadRoute() {
  vi.resetModules();
  return (await import("@/app/api/github-contributions/route")).GET;
}

let fetchMock: ReturnType<typeof vi.fn>;
let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.useRealTimers();
});

describe("GET /api/github-contributions without a token", () => {
  it("uses the public service and returns the heatmap's data shape", async () => {
    fetchMock.mockImplementation(async () => json(publicApiBody()));
    const GET = await loadRoute();
    const res = await GET();
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.source).toBe("public-api");
    expect(Object.keys(body).sort()).toEqual(["contributions", "source", "total"]);
    expect(new Date(`${body.contributions[0].date}T00:00:00Z`).getUTCDay()).toBe(0); // starts on a Sunday
    expect(body.contributions.at(-1).date).toBe("2026-10-24");
    expect(body.total.lastYear).toBe(body.contributions.reduce((s: number, d: { count: number }) => s + d.count, 0));
    expect(res.headers.get("cache-control")).toBe("public, max-age=0, s-maxage=300, stale-while-revalidate=600");
  });
});

describe("GET /api/github-contributions with a token", () => {
  beforeEach(() => vi.stubEnv("GITHUB_TOKEN", SECRET));

  it("asks GitHub for a whole-week window and maps the levels", async () => {
    fetchMock.mockImplementation(async (_url: string, init: RequestInit) =>
      json(graphQlBody(JSON.parse(String(init.body)).variables.from))
    );
    const GET = await loadRoute();
    const body = await (await GET()).json();

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.github.com/graphql");
    expect((init.headers as Record<string, string>).Authorization).toBe(`Bearer ${SECRET}`);
    const { from, to } = JSON.parse(init.body).variables;
    expect(new Date(from).getUTCDay()).toBe(0); // a Sunday
    expect(new Date(to).getTime() - new Date(from).getTime()).toBeLessThanOrEqual(365 * DAY_MS);

    expect(body.source).toBe("github");
    expect(body.contributions[0].level).toBe(1);
    expect(body.contributions[0].count).toBe(2);
    expect(body.contributions.at(-1).date).toBe("2026-10-24");
  });

  it("falls back to the public service if GitHub rejects the token, without logging the token", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.includes("api.github.com") ? json({ message: "Bad credentials" }, 401) : json(publicApiBody())
    );
    const GET = await loadRoute();
    const body = await (await GET()).json();
    expect(body.source).toBe("public-api");
    expect(errorSpy).toHaveBeenCalled();
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain(SECRET);
    expect(JSON.stringify(errorSpy.mock.calls)).toContain("401");
  });

  it("falls back when GitHub answers 200 but with an unexpected body", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.includes("api.github.com") ? json({ errors: [{ message: "boom" }] }) : json(publicApiBody())
    );
    const GET = await loadRoute();
    expect((await (await GET()).json()).source).toBe("public-api");
  });
});

describe("caching", () => {
  it("calls the upstream service once for repeat visitors within five minutes", async () => {
    fetchMock.mockImplementation(async () => json(publicApiBody()));
    const GET = await loadRoute();
    await GET();
    vi.setSystemTime(new Date(NOW.getTime() + 4 * 60 * 1000));
    await GET();
    await GET();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("refreshes once the five minutes are up", async () => {
    fetchMock.mockImplementation(async () => json(publicApiBody()));
    const GET = await loadRoute();
    await GET();
    vi.setSystemTime(new Date(NOW.getTime() + 5 * 60 * 1000 + 1000));
    await GET();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("shares one upstream request between simultaneous visitors", async () => {
    fetchMock.mockImplementation(async () => json(publicApiBody()));
    const GET = await loadRoute();
    const responses = await Promise.all([GET(), GET(), GET(), GET(), GET()]);
    expect(responses.every((r) => r.status === 200)).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("keeps serving the last good data if a later refresh fails", async () => {
    fetchMock.mockImplementationOnce(async () => json(publicApiBody()));
    const GET = await loadRoute();
    const first = await (await GET()).json();
    vi.setSystemTime(new Date(NOW.getTime() + 10 * 60 * 1000));
    fetchMock.mockImplementation(async () => {
      throw new Error("network down");
    });
    const res = await GET();
    expect(res.status).toBe(200);
    expect((await res.json()).contributions).toEqual(first.contributions);
    expect(errorSpy).toHaveBeenCalled();
  });

  it("returns 502 when there is nothing to show and the service is down", async () => {
    fetchMock.mockImplementation(async () => json({}, 500));
    const GET = await loadRoute();
    const res = await GET();
    expect(res.status).toBe(502);
    expect(await res.json()).toEqual({ error: "Failed to fetch" });
  });

  it("recovers on the next request after a failure with an empty cache", async () => {
    fetchMock.mockImplementationOnce(async () => json({}, 500));
    const GET = await loadRoute();
    expect((await GET()).status).toBe(502);
    fetchMock.mockImplementation(async () => json(publicApiBody()));
    expect((await GET()).status).toBe(200);
  });
});
