import { crewProfile } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function Crew() {
  return (
    <Section id="crew" title="Crew profile" kicker="self-reported">
      <dl>
        {crewProfile.map((row) => (
          <div key={row.label} className="spec-row">
            <dt className="label-mono pt-0.5">{row.label}</dt>
            <dd className="text-sm text-foreground/90">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
