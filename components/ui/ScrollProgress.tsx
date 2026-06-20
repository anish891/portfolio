"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.72 0.17 280), oklch(0.75 0.15 200), oklch(0.65 0.2 260))",
        scaleX: progress,
        transformOrigin: "left",
      }}
    />
  );
}
