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
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="container-prose flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{heroContent.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            &copy; {year} &middot; Mumbai, India
          </p>
        </div>

        <nav aria-label="Footer" className="flex items-center gap-4 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
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
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
