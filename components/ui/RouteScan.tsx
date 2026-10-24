"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** A thin line that sweeps across the top of the screen when the route changes. */
export function RouteScan() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    setRunKey((k) => k + 1);
  }, [pathname]);

  if (runKey === 0) return null;
  return (
    <div
      key={runKey}
      aria-hidden
      className="route-scan pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 bg-signal"
    />
  );
}
