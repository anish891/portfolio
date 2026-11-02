import type { Metadata } from "next";
import { aboutContent, education, experience, heroContent } from "@/lib/data";
import { pageMetadata, ROLE_IN_TEXT } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs, profilePage } from "@/lib/schema";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Timeline } from "@/components/ui/Timeline";
import { Crew } from "@/components/sections/Crew";
import { TechStack } from "@/components/sections/TechStack";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `About ${heroContent.name}, an AI engineer and full-stack developer in ${heroContent.location}: background, interests and the tools used.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main" className="pb-4">
      <JsonLd data={[profilePage(), breadcrumbs([{ name: "About", path: "/about" }])]} />
      <div className="container-prose pt-14">
        <PageHeader kicker="Crew dossier" title="About" />
        <p className="mt-8 max-w-xl font-medium leading-relaxed text-foreground">
          {heroContent.name} is an {ROLE_IN_TEXT} and full-stack developer based in{" "}
          {heroContent.location}.
        </p>
        <p className="mt-3 max-w-xl leading-relaxed text-foreground/85">{heroContent.intro}</p>
        <p className="label-mono mt-4">
          Based in {heroContent.location} · {heroContent.coordinates}
        </p>
      </div>

      <Section title="Interests" kicker="checklist">
        <ul className="space-y-1.5 text-sm text-foreground/90">
          {aboutContent.interests.map((i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="font-mono text-xs text-signal-ink" aria-hidden>
                [x]
              </span>
              {i}
            </li>
          ))}
        </ul>
      </Section>

      <Crew />

      {experience.length > 0 && (
        <Section title="Service record" kicker="experience">
          <Timeline entries={experience} />
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Training" kicker="education">
          <Timeline entries={education} />
        </Section>
      )}

      <TechStack />
    </main>
  );
}
