import type { Metadata } from "next";
import { heroContent, socialLinks } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs, contactPage } from "@/lib/schema";
import { PageHeader } from "@/components/ui/PageHeader";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${heroContent.name}, a software engineer in ${heroContent.location}, by email or the contact form. ${heroContent.status}.`,
  path: "/contact",
});

export default function ContactPage() {
  const profiles = socialLinks.filter((l) => l.icon !== "Mail");
  return (
    <main id="main" className="pb-4">
      <JsonLd data={[contactPage(), breadcrumbs([{ name: "Contact", path: "/contact" }])]} />
      <div className="container-prose pt-14">
        <PageHeader kicker="Open channel" title="Contact" />
        <p className="mt-8 max-w-xl leading-relaxed text-foreground/85">
          {heroContent.name} is based in {heroContent.location}. {heroContent.status}. The quickest
          way to reach me is email, or the form below.
        </p>
        <dl className="mt-6">
          <div className="spec-row">
            <dt className="label-mono">Email</dt>
            <dd className="font-mono text-xs">
              <a
                href={`mailto:${heroContent.email}`}
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-signal"
              >
                {heroContent.email}
              </a>
            </dd>
          </div>
          <div className="spec-row">
            <dt className="label-mono">Profiles</dt>
            <dd className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
              {profiles.map((l) => (
                <a
                  key={l.name}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-border underline-offset-4 transition-colors hover:decoration-signal"
                >
                  {l.name}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <Contact />
    </main>
  );
}
