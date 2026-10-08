"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Rocket } from "lucide-react";
import { availability, heroContent } from "@/lib/data";

const mailto = (subject: string, body: string) =>
  `mailto:${heroContent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const options = [
  {
    icon: Briefcase,
    title: "Hiring for a role?",
    description: "Full-time positions in AI, backend or full-stack engineering.",
    cta: "Email about a role",
    href: mailto(
      "Role opportunity",
      "Hi Anish,\n\nWe have an opening I think you'd be a great fit for.\n\nCompany:\nRole:\nLocation / remote:\n"
    ),
  },
  {
    icon: Rocket,
    title: "Have a project?",
    description: "Freelance builds: web apps, AI features, dashboards and automation.",
    cta: "Start a project",
    href: mailto(
      "Freelance project",
      "Hi Anish,\n\nI'd like to talk about a project.\n\nWhat it is:\nTimeline:\nBudget range:\n"
    ),
  },
];

export function Availability() {
  return (
    <section className="section-padding pt-0 md:pt-0">
      <motion.div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gradient-to-br from-primary/25 to-cyan-400/10 blur-3xl"
        />
        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-600 dark:text-emerald-400">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available now
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {availability.headline}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {availability.description}
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground/80">
              {availability.replyTime}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {options.map(({ icon: Icon, title, description, cta, href }) => (
              <a
                key={title}
                href={href}
                className="group flex flex-col rounded-2xl border border-border/70 bg-background/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="mb-5 flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {cta}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
