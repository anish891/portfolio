// Pure helpers for the GitHub contribution heatmap: the date window, the shape of the data and
// date formatting. They live here, apart from the route and the component, so they can be tested.

export interface Day {
  date: string; // plain calendar day, "2026-10-23"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** GitHub's contribution levels, as numbers the heatmap's five colour steps use. */
export const LEVELS: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * First day to request from GitHub: the first Sunday within the last 364 days (UTC). The
 * heatmap draws whole weeks, and GitHub limits a request to one year, so starting on a Sunday
 * shows every day that is fetched and none are silently dropped.
 */
export function windowStart(now: Date): Date {
  const from = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 364));
  from.setUTCDate(from.getUTCDate() + ((7 - from.getUTCDay()) % 7));
  return from;
}

/**
 * The heatmap draws columns of seven days, so the list must start on a Sunday and hold at most
 * 53 weeks (371 days). Both data sources are trimmed to that shape.
 */
export function normalizeDays(days: Day[]): Day[] {
  const recent = days.slice(-371);
  const firstSunday = recent.findIndex((d) => utcDate(d.date).getUTCDay() === 0);
  return firstSunday > 0 ? recent.slice(firstSunday) : recent;
}

// Dates arrive as plain calendar days ("2026-10-23"). Read and format them in UTC so the day
// never shifts for visitors west of Greenwich (a bare date string is parsed as UTC midnight).
export const utcDate = (dateStr: string) => new Date(`${dateStr}T00:00:00Z`);

export function ordinalSuffix(day: number): "st" | "nd" | "rd" | "th" {
  if (day % 100 >= 11 && day % 100 <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/** "October 23rd" */
export function formatTooltipDate(dateStr: string): string {
  const d = utcDate(dateStr);
  const day = d.getUTCDate();
  const month = d.toLocaleString("default", { month: "long", timeZone: "UTC" });
  return `${month} ${day}${ordinalSuffix(day)}`;
}
