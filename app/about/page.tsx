import type { Metadata } from "next";
import { aboutContent, education, experience, heroContent } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/ui/PageHeader";
import { Timeline } from "@/components/ui/Timeline";
import { Crew } from "@/components/sections/Crew";
import { TechStack } from "@/components/sections/TechStack";

export const metadata: Metadata = {
  title: "About",
  description: `About ${heroContent.name}: background, interests and the tools I work with.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" className="pb-4">
      <div className="container-prose pt-14">
        <PageHeader kicker="Crew dossier" title="About" />
        <p className="mt-8 max-w-xl leading-relaxed text-foreground/85">{heroContent.intro}</p>
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
