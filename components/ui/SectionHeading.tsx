"use client";

import { motion } from "framer-motion";

interface Props {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: Props) {
  const centered = align === "center";
  return (
    <motion.div
      className={`mb-12 ${centered ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span className="text-muted-foreground/60">{index}</span>
        <span className="mx-2 text-muted-foreground/40">/</span>
        {eyebrow}
      </p>
      <h2 className="section-heading">{title}</h2>
      {description && (
        <p className={`section-subheading mt-4 ${centered ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
