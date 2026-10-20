import { ArrowUpRight, MapPin } from "lucide-react";
import { Github, Linkedin, X } from "@/components/ui/icons";
import { Mail } from "lucide-react";
import { heroContent, nowContent, socialLinks } from "@/lib/data";

const socialIconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  X,
  Mail,
};

export function Hero() {
  return (
    <section id="home" className="container-prose pt-20 sm:pt-28">
      <div className="fade-up">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {heroContent.name}
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {heroContent.location}
        </p>

        <p className="mt-6 leading-relaxed text-foreground/85">{heroContent.intro}</p>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          <span className="label-mono mr-2">{nowContent.label}</span>
          {nowContent.text}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={`mailto:${heroContent.email}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
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
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
