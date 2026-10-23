import { GitHubHeatmap } from "@/components/ui/GitHubHeatmap";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/data";

export function Activity() {
  return (
    <Section title="Commit log"
      kicker="github activity">
      <GitHubHeatmap username={siteConfig.githubUsername} />
    </Section>
  );
}
