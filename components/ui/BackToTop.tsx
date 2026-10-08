"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

const RADIUS = 20;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-lg backdrop-blur-xl transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary sm:bottom-8 sm:right-8"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Ring shows how far down the page you are */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden>
            <circle cx="24" cy="24" r={RADIUS} fill="none" strokeWidth="2" className="stroke-border" />
            <motion.circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-primary"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp className="relative size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
