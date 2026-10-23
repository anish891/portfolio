import { afterEach, describe, expect, it } from "vitest";
import {
  LEVELS,
  formatTooltipDate,
  normalizeDays,
  ordinalSuffix,
  windowStart,
  type Day,
} from "@/lib/contributions";

const DAY_MS = 24 * 60 * 60 * 1000;

function daysEndingOn(todayIso: string, count: number): Day[] {
  const end = new Date(`${todayIso}T00:00:00Z`).getTime();
  return Array.from({ length: count }, (_, i) => ({
    date: new Date(end - (count - 1 - i) * DAY_MS).toISOString().slice(0, 10),
    count: i % 5,
    level: (i % 5) as Day["level"],
  }));
}

describe("windowStart", () => {
  it("is always a Sunday, between 357 and 364 days back, for every date across a year", () => {
    for (let k = 0; k < 400; k++) {
      // vary the time of day too, because the route calls it with the current time
      const now = new Date(Date.UTC(2026, 0, 1) + k * DAY_MS + (k % 24) * 3_600_000);
      const from = windowStart(now);
      const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
      const daysBack = (startOfToday - from.getTime()) / DAY_MS;
      expect(from.getUTCDay()).toBe(0);
      expect(daysBack).toBeLessThanOrEqual(364);
      expect(daysBack).toBeGreaterThanOrEqual(358);
      // GitHub rejects a range longer than one year
      expect(now.getTime() - from.getTime()).toBeLessThanOrEqual(365 * DAY_MS);
    }
  });
});

describe("normalizeDays", () => {
  it("starts on a Sunday, keeps the latest day and never exceeds 53 weeks", () => {
    for (let k = 0; k < 400; k += 7) {
      const today = new Date(Date.UTC(2026, 0, 1) + k * DAY_MS).toISOString().slice(0, 10);
      const out = normalizeDays(daysEndingOn(today, 380));
      expect(new Date(`${out[0].date}T00:00:00Z`).getUTCDay()).toBe(0);
      expect(out[out.length - 1].date).toBe(today);
      expect(out.length).toBeLessThanOrEqual(371);
    }
  });

  it("leaves data that already starts on a Sunday untouched", () => {
    const sundayStart = daysEndingOn("2026-10-24", 364); // 2025-10-26 is a Sunday
    expect(new Date(`${sundayStart[0].date}T00:00:00Z`).getUTCDay()).toBe(0);
    expect(normalizeDays(sundayStart)).toEqual(sundayStart);
  });

  it("copes with empty input", () => {
    expect(normalizeDays([])).toEqual([]);
  });
});

describe("LEVELS", () => {
  it("maps GitHub's quartile names onto the five heatmap steps", () => {
    expect(LEVELS).toEqual({
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    });
  });
});

describe("ordinalSuffix", () => {
  it("agrees with Intl.PluralRules for every day of a month and beyond", () => {
    const rules = new Intl.PluralRules("en", { type: "ordinal" });
    const names = { one: "st", two: "nd", few: "rd", other: "th" } as const;
    for (let d = 1; d <= 120; d++) {
      expect(ordinalSuffix(d), `day ${d}`).toBe(names[rules.select(d) as keyof typeof names]);
    }
  });
});

describe("formatTooltipDate", () => {
  const original = process.env.TZ;
  afterEach(() => {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  });

  it.each([
    "UTC",
    "Asia/Kolkata",
    "Europe/London",
    "America/New_York",
    "America/Los_Angeles",
    "Pacific/Honolulu",
    "Pacific/Auckland",
  ])("shows the same calendar day in %s (never shifts by a day)", (tz) => {
    process.env.TZ = tz;
    expect(formatTooltipDate("2026-10-23")).toBe("October 23rd");
    expect(formatTooltipDate("2026-01-01")).toBe("January 1st");
    expect(formatTooltipDate("2026-03-12")).toBe("March 12th");
  });
});
