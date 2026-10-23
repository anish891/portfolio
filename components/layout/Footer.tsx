import Link from "next/link";
import { Mail } from "lucide-react";
import { Github, Linkedin, X } from "@/components/ui/icons";
import { socialLinks, navItems, heroContent } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  X,
  Mail,
};

export function Footer() {
  const now = new Date();
  const rev = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;

  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-prose py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold uppercase tracking-[0.08em]">
              {heroContent.name}
            </p>
            <p className="label-mono mt-1">Mumbai, India · {heroContent.coordinates}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label-mono transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" className="label-mono transition-colors hover:text-foreground">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon] ?? Mail;
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
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-dashed border-border pt-4">
          <p className="label-mono">End of document · Rev {rev}</p>
          <span className="h-px flex-1 bg-border" aria-hidden />
          <a href="#main" className="label-mono transition-colors hover:text-foreground">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
