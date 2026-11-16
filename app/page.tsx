import Link from "next/link";
import { heroContent, projects, socialLinks } from "@/lib/data";
import { getAllPosts, getPostsForProject } from "@/lib/blog";
import { ProjectWriteUps } from "@/components/ui/ProjectLinks";
import { ROLE } from "@/lib/seo";
import { PostList } from "@/components/ui/PostList";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <main id="main" className="wrap flex-1 pt-12">
      <section>
        <h1 className="page-title">{heroContent.name}</h1>
        <p className="ui muted mt-2">
          {ROLE} · {heroContent.location}
        </p>
        <p className="mt-6">{heroContent.intro}</p>
      </section>

      {/* Same wording as "What I am working on" in the about-me post, minus its opening clause. */}
      <section aria-labelledby="now" className="mt-12">
        <h2 id="now" className="label mb-5">
          Now
        </h2>
        <p>
          <Link href="/projects/chaindeck">ChainDeck</Link>, a live analytics dashboard for NIFTY
          options. Before that came <Link href="/projects/unbake">Unbake</Link>, which recovers
          spreadsheet formulas from plain values, and{" "}
          <Link href="/projects/graph-sentinel">GraphSentinel</Link>, an investigation agent for
          security alerts.
        </p>
      </section>

      <section aria-labelledby="projects" className="mt-12">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 id="projects" className="label">
            Projects
          </h2>
          <Link href="/projects" className="ui">
            All projects →
          </Link>
        </div>
        <ul className="space-y-6">
          {projects.map((project) => (
            <li key={project.id}>
              <h3 className="text-[19px]">
                <Link href={`/projects/${project.id}`}>{project.title}</Link>
              </h3>
              <p className="mt-1">{project.description}</p>
              <p className="ui muted mt-1.5">{project.techStack.join(" · ")}</p>
              <div className="mt-1">
                <ProjectWriteUps posts={getPostsForProject(project.id)} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="writing" className="mt-12">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="writing" className="label">
              Writing
            </h2>
            <Link href="/blog" className="ui">
              All writing →
            </Link>
          </div>
          <PostList posts={posts} />
        </section>
      )}

      <section aria-labelledby="contact" className="mt-12">
        <h2 id="contact" className="label mb-5">
          Contact
        </h2>
        <p>
          Got a project idea or just want to say hi? Send a note and I&apos;ll reply soon.
        </p>
        <ul className="ui dots mt-3 flex flex-wrap">
          <li>
            <a href={`mailto:${heroContent.email}`} className="inline-block py-1">
              Get in touch
            </a>
          </li>
          <li>
            <Link href="/contact" className="inline-block py-1">
              Contact form
            </Link>
          </li>
          {socialLinks
            .filter((link) => link.icon !== "Mail")
            .map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1"
                >
                  {link.name}
                </a>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
