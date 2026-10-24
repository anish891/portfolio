import { ArrowUpRight } from "lucide-react";
import { Github, Linkedin, X } from "@/components/ui/icons";
import { Mail } from "lucide-react";
import { heroContent, projects, socialLinks } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { OrbitDiagram } from "@/components/ui/OrbitDiagram";
import { Telemetry } from "@/components/ui/Telemetry";

const socialIconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  X,
  Mail,
};

export function Hero() {
  const stats = [
    { label: "Missions", value: projects.length },
    { label: "Deployed", value: projects.filter((p) => p.deployedUrl).length },
    { label: "Log entries", value: getAllPosts().length },
  ];

  return (
    <section id="home" className="container-prose pt-10 sm:pt-14">
      <Telemetry />

      <div className="fade-up mt-10 flex items-start justify-between gap-4 sm:gap-8">
        <div className="min-w-0">
          <p className="label-mono">Crew member</p>
          <h1 className="mt-2 font-display text-[2.6rem] font-semibold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            {heroContent.name}
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-signal-ink">
            AI &amp; full-stack engineer · {heroContent.location}
          </p>
        </div>

        <figure className="shrink-0">
          <OrbitDiagram
            className="size-24 text-foreground sm:size-40"
            missions={projects.map((p) => p.title)}
          />
          <figcaption className="fig-caption hidden sm:block">
            <span className="block text-center">Fig. 00 · Missions in orbit</span>
            <ul className="mx-auto mt-1.5 w-fit space-y-0.5 normal-case tracking-normal">
              {projects.map((p, i) => (
                <li key={p.id} className="flex items-center gap-1.5">
                  <span aria-hidden className={i === 0 ? "text-signal" : "text-foreground"}>
                    {["●", "■", "◆"][i] ?? "●"}
                  </span>
                  {p.title}
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>
      </div>

      <p className="fade-up mt-8 max-w-xl leading-relaxed text-foreground/85">{heroContent.intro}</p>

      <div className="fade-up mt-6 flex items-center gap-4">
        <a
          href={`mailto:${heroContent.email}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-signal"
        >
          Get in touch
          <ArrowUpRight className="size-3.5" />
        </a>
        <span className="h-4 w-px bg-border" aria-hidden />
        {socialLinks.map((link) => {
          const Icon = socialIconMap[link.icon];
          if (!Icon) return null;
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground transition-colors hover:text-signal-ink"
            >
              <Icon className="size-4" />
            </a>
          );
        })}
      </div>

      <dl className="fade-up mt-10 grid grid-cols-3 divide-x divide-dashed divide-border border-y border-dashed border-border">
        {stats.map(({ label, value }) => (
          <div key={label} className="px-4 py-3 first:pl-0">
            <dd className="font-display text-3xl font-semibold tabular-nums leading-none">
              {String(value).padStart(2, "0")}
            </dd>
            <dt className="label-mono mt-1.5">{label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
