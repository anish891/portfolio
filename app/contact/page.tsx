import type { Metadata } from "next";
import { heroContent, socialLinks } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbs, contactPage } from "@/lib/schema";
import { ContactForm } from "@/components/ui/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${heroContent.name}, a software engineer in ${heroContent.location}, by email or the contact form. ${heroContent.status}.`,
  path: "/contact",
});

export default function ContactPage() {
  const profiles = socialLinks.filter((l) => l.icon !== "Mail");
  return (
    <main id="main" className="wrap flex-1 pt-12">
      <JsonLd data={[contactPage(), breadcrumbs([{ name: "Contact", path: "/contact" }])]} />
      <h1 className="page-title">Contact</h1>
      <p className="mt-6">
        {heroContent.name} is based in {heroContent.location}. {heroContent.status}. The quickest
        way to reach me is email, or the form below.
      </p>
      <dl className="ui mt-6 space-y-1">
        <div className="flex gap-3">
          <dt className="muted w-16 shrink-0">Email</dt>
          <dd className="min-w-0">
            <a href={`mailto:${heroContent.email}`} className="inline-block py-0.5">
              {heroContent.email}
            </a>
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="muted w-16 shrink-0">Profiles</dt>
          <dd>
            <ul className="dots flex flex-wrap">
              {profiles.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-0.5"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <section aria-labelledby="form-label" className="mt-12">
        <h2 id="form-label" className="label mb-5">
          Contact form
        </h2>
        <ContactForm />
      </section>
    </main>
  );
}
