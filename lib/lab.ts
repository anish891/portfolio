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
    slug: "max-pain",
    title: "Max Pain playground",
    description:
      "Edit the open interest on each strike and watch the Max Pain strike move. Uses the same prefix-sum method as ChainDeck.",
    date: "2026-10-21",
    post: "chaindeck-max-pain-and-signals",
  },
];
