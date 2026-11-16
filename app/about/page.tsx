import type { Metadata } from "next";
import {
  aboutContent,
  crewProfile,
  education,
  experience,
  heroContent,
  techStack,
  type TimelineEntry,
} from "@/lib/data";
import { pageMetadata, ROLE_IN_TEXT } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs, faqPage, profilePage } from "@/lib/schema";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `About ${heroContent.name}, a software engineer in ${heroContent.location}: background, interests and the tools used.`,
  path: "/about",
});

/** Experience and education entries. Both lists are empty for now, so nothing renders yet. */
function Entries({ entries }: { entries: TimelineEntry[] }) {
  return (
    <>
      {entries.map((e) => (
        <div key={`${e.title}-${e.organization}-${e.start}`}>
          <h3>
            {e.title},{" "}
            {e.url ? (
              <a href={e.url} target="_blank" rel="noopener noreferrer">
                {e.organization}
              </a>
            ) : (
              e.organization
            )}
          </h3>
          <p className="ui muted">
            {e.start} – {e.end}
            {e.location ? ` · ${e.location}` : ""}
          </p>
          {e.highlights?.length ? (
            <ul>
              {e.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
          {e.tags?.length ? <p className="ui muted">{e.tags.join(" · ")}</p> : null}
        </div>
      ))}
    </>
  );
}

export default function AboutPage() {
  return (
    <main id="main" data-wide className="wrap flex-1 pt-12">
      <JsonLd
        data={[profilePage(), faqPage(faqs()), breadcrumbs([{ name: "About", path: "/about" }])]}
      />
      <article>
        <h1 className="page-title">About</h1>
        <div className="prose mt-8">
          <p>
            {heroContent.name} is a {ROLE_IN_TEXT} based in {heroContent.location}.
          </p>
          <p>{heroContent.intro}</p>

          <h2 id="interests">Interests</h2>
          <ul>
            {aboutContent.interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>

          <h2 id="personal">Personal</h2>
          {crewProfile.map((row) => (
            <p key={row.label}>{row.value}</p>
          ))}

          {experience.length > 0 && (
            <>
              <h2 id="experience">Experience</h2>
              <Entries entries={experience} />
            </>
          )}

          {education.length > 0 && (
            <>
              <h2 id="education">Education</h2>
              <Entries entries={education} />
            </>
          )}

          <h2 id="tech-stack">Tech stack</h2>
          <ul>
            {techStack.map((category) => (
              <li key={category.name}>
                <strong>{category.name}:</strong> {category.skills.map((s) => s.name).join(", ")}
              </li>
            ))}
          </ul>

          {/* The FAQPage JSON-LD above is built from the same list, so markup and page agree. */}
          <h2 id="questions">Questions</h2>
          {faqs().map(({ question, answer }) => (
            <div key={question}>
              <h3>{question}</h3>
              <p className="mt-2">{answer}</p>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}
