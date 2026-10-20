import type { Metadata } from "next";
import { aboutContent, education, experience, heroContent } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { TechStack } from "@/components/sections/TechStack";

export const metadata: Metadata = {
  title: "About",
  description: `About ${heroContent.name}: background, interests and the tools I work with.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" className="pb-4">
      <div className="container-prose pt-16">
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
        <p className="mt-6 leading-relaxed text-foreground/85">{heroContent.intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">Based in {heroContent.location}.</p>
      </div>

      <Section title="Interests">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/85">
          {aboutContent.interests.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Section>

      {experience.length > 0 && (
        <Section title="Experience">
          <Timeline entries={experience} />
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          <Timeline entries={education} />
        </Section>
      )}

      <TechStack />
    </main>
  );
}
