"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const isStorageAvailable = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

        let hasVisited = true;
        if (isStorageAvailable) {
          try {
            hasVisited = !!localStorage.getItem("has_visited_anish_portfolio");
          } catch (e) {
            // Ignore security/disabled storage errors
          }
        }

        let url = "https://abacus.jasoncameron.dev/get/anishtejwani-portfolio/visits";

        if (!hasVisited && isStorageAvailable) {
          url = "https://abacus.jasoncameron.dev/hit/anishtejwani-portfolio/visits";
          try {
            localStorage.setItem("has_visited_anish_portfolio", "true");
          } catch (e) {
            // Ignore quota exceeded or private browsing errors
          }
        }

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.value === "number") {
            setCount(data.value);
          } else if (typeof data === "number") {
            setCount(data);
          }
        }
      } catch (err) {
        console.error("Error fetching visitor count:", err);
      }
    };

    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary shadow-xs">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
      </span>
      <Users className="size-3 text-primary/80" />
      <span>{count.toLocaleString()} visits</span>
    </div>
  );
}
