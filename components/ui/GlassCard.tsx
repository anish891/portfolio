"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: "purple" | "cyan" | "blue" | "none";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  glowColor = "none",
  hover = true,
  ...props
}: GlassCardProps) {
  const glowStyles = {
    purple: "hover:shadow-[0_0_30px_oklch(0.70_0.14_55/15%)]",
    cyan: "hover:shadow-[0_0_30px_oklch(0.82_0.09_70/15%)]",
    blue: "hover:shadow-[0_0_30px_oklch(0.78_0.11_62/15%)]",
    none: "",
  };

  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-500",
        hover && "hover:scale-[1.02] hover:border-primary/15",
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
