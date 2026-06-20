import { githubUsername } from "./data";

const BASE_URL = "https://github-readme-stats.vercel.app/api";
const STREAK_URL = "https://github-readme-streak-stats.herokuapp.com";

const theme = {
  bg_color: "0d1117",
  title_color: "a78bfa",
  text_color: "c9d1d9",
  icon_color: "a78bfa",
  border_color: "1f2937",
  ring_color: "a78bfa",
  fire: "a78bfa",
  currStreakLabel: "c9d1d9",
  sideLabels: "c9d1d9",
  sideNums: "a78bfa",
  currStreakNum: "a78bfa",
  dates: "6b7280",
};

export function getGitHubStatsUrl(): string {
  const params = new URLSearchParams({
    username: githubUsername,
    show_icons: "true",
    theme: "transparent",
    bg_color: theme.bg_color,
    title_color: theme.title_color,
    text_color: theme.text_color,
    icon_color: theme.icon_color,
    border_color: theme.border_color,
    hide_border: "false",
    border_radius: "12",
    count_private: "true",
  });
  return `${BASE_URL}?${params.toString()}`;
}

export function getTopLanguagesUrl(): string {
  const params = new URLSearchParams({
    username: githubUsername,
    layout: "compact",
    theme: "transparent",
    bg_color: theme.bg_color,
    title_color: theme.title_color,
    text_color: theme.text_color,
    icon_color: theme.icon_color,
    border_color: theme.border_color,
    hide_border: "false",
    border_radius: "12",
    langs_count: "8",
  });
  return `${BASE_URL}/top-langs?${params.toString()}`;
}

export function getStreakStatsUrl(): string {
  const params = new URLSearchParams({
    user: githubUsername,
    theme: "transparent",
    background: theme.bg_color,
    ring: theme.ring_color,
    fire: theme.fire,
    currStreakLabel: theme.currStreakLabel,
    sideLabels: theme.sideLabels,
    sideNums: theme.sideNums,
    currStreakNum: theme.currStreakNum,
    dates: theme.dates,
    border: theme.border_color,
    hide_border: "false",
    border_radius: "12",
  });
  return `${STREAK_URL}?${params.toString()}`;
}

export function getContributionGraphUrl(): string {
  return `https://ghchart.rshah.org/a78bfa/${githubUsername}`;
}
