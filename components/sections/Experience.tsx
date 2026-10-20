import { experience } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";

export function Experience() {
  if (experience.length === 0) return null;
  return (
    <Section id="experience" title="Experience">
      <Timeline entries={experience} />
    </Section>
  );
}
