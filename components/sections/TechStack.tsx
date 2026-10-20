import { techStack } from "@/lib/data";
import { Section } from "@/components/ui/Section";

export function TechStack() {
  return (
    <Section id="tech" title="Stack">
      <dl className="space-y-3">
        {techStack.map((category) => (
          <div
            key={category.name}
            className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4"
          >
            <dt className="text-sm text-muted-foreground">{category.name}</dt>
            <dd className="text-sm text-foreground/90">
              {category.skills.map((s) => s.name).join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
