export interface LabEntry {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  /** Blog post that explains the idea, if any */
  post?: string;
}

// Newest first. Each slug needs a demo registered in components/lab/index.tsx.
export const labEntries: LabEntry[] = [
  {
    slug: "hash-chain",
    title: "Tamper-evident audit trail",
    description:
      "Edit a log entry and watch every later hash stop matching. The same idea as GraphSentinel's hash-chained audit trail.",
    date: "2026-10-20",
    post: "graphsentinel-bounded-agents",
  },
  {
    slug: "ransac",
    title: "RANSAC vs least squares",
    description:
      "Add wrong cells to a column of numbers and compare a plain fit with a RANSAC fit. This is how Unbake recovers formulas despite typos.",
    date: "2026-10-19",
    post: "unbake-formula-archaeology",
  },
  {
    slug: "welford",
    title: "Unusual flow detector",
    description:
      "Feed values to Welford's online algorithm and see which ones it flags, using only a running mean and variance.",
    date: "2026-10-18",
    post: "chaindeck-max-pain-and-signals",
  },
  {
    slug: "max-pain",
    title: "Max Pain playground",
    description:
      "Edit the open interest on each strike and watch the Max Pain strike move. Uses the same prefix-sum method as ChainDeck.",
    date: "2026-10-17",
    post: "chaindeck-max-pain-and-signals",
  },
];
