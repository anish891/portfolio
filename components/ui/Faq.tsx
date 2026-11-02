import { faqs } from "@/lib/faq";
import { Section } from "@/components/ui/Section";

/** Visible FAQ. The FAQPage JSON-LD is built from the same list, so markup and page always agree. */
export function Faq() {
  return (
    <Section title="Questions" kicker="faq">
      <dl className="space-y-6">
        {faqs().map(({ question, answer }) => (
          <div key={question}>
            <dt className="font-medium text-foreground">{question}</dt>
            <dd className="mt-1.5 max-w-xl text-sm leading-relaxed text-foreground/85">{answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
