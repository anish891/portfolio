"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, heroContent } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="wrap ui pt-6 sm:pt-10">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line pb-4">
        <Link href="/" className="py-1 text-[15px] font-semibold text-text hover:text-text">
          {heroContent.name}
        </Link>

        <div className="flex items-center gap-x-3">
          <nav aria-label="Main">
            <ul className="flex flex-wrap items-center gap-x-4">
              {navItems.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-block py-1.5 ${active ? "text-text" : "text-muted"} hover:text-text`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
