"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks, heroContent } from "@/lib/data";
import {
  Mail,
  Send,
  Loader2,
  Copy,
  Check,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { ToastContainer, ToastType } from "@/components/ui/Toast";

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
};

const topics = ["Full-time role", "Freelance project", "Just saying hi"] as const;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState<(typeof topics)[number]>(topics[0]);
  const [isSending, setIsSending] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(heroContent.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast("Couldn't copy. Please select the email manually.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    setIsSending(true);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // Honeypot: bots fill hidden fields, humans don't
    if (formData.get("botcheck")) {
      setIsSending(false);
      return;
    }

    if (!accessKey && process.env.NODE_ENV === "production") {
      addToast("The contact form isn't configured. Please email me directly.", "error");
      setIsSending(false);
      return;
    }

    if (!accessKey) {
      // Simulate delay for realistic UX testing
      await new Promise((resolve) => setTimeout(resolve, 800));

      addToast("Local test successful! To send real emails, please define NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your .env.local file.", "success");
      form.reset();
      setSent(true);
      setIsSending(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          message: message,
          from_name: "Portfolio Contact Form",
          subject: `[${topic}] New Portfolio Message from ${name}`,
          topic,
        }),
      });

      const data = await response.json();

      if (data.success) {
        form.reset();
        setSent(true);
      } else {
        addToast(data.message || "Something went wrong. Please try again.", "error");
      }
    } catch {
      addToast("Network error. Please check your connection and try again.", "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <section id="contact" className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            index="03"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s work <span className="gradient-text">together</span>
              </>
            }
            description="Got a project idea, a role, or just want to say hi? Send a message and I'll reply within a day or two."
          />

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Direct contact */}
            <motion.div
              className="space-y-4 lg:col-span-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="rounded-3xl border border-border/70 bg-card p-6">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                  Email
                </p>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${heroContent.email}`}
                    className="min-w-0 truncate text-base font-semibold text-foreground transition-colors hover:text-primary sm:text-lg"
                  >
                    {heroContent.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                  </button>
                </div>

                <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <MapPin className="size-4 text-primary" />
                    {heroContent.location}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Clock className="size-4 text-primary" />
                    Usually replies within 24–48 hours
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-3">
                {socialLinks
                  .filter((l) => l.icon !== "Mail")
                  .map((link) => {
                    const Icon = iconMap[link.icon] || Mail;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-primary/5"
                      >
                        <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">
                            {link.name}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {link.url.replace(/^https?:\/\//, "")}
                          </span>
                        </span>
                      </a>
                    );
                  })}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
                {sent ? (
                  <motion.div
                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <CheckCircle2 className="size-7" />
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">Message sent</h3>
                    <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                      Thanks for reaching out. I&apos;ll get back to you soon.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 cursor-pointer rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      type="text"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />
                    <fieldset>
                      <legend className="mb-2 text-sm font-medium text-foreground">
                        What&apos;s this about?
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {topics.map((t) => (
                          <label key={t} className="cursor-pointer">
                            <input
                              type="radio"
                              name="topic"
                              value={t}
                              checked={topic === t}
                              onChange={() => setTopic(t)}
                              className="peer sr-only"
                            />
                            <span className="inline-block rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/40 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:font-medium peer-checked:text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-primary">
                              {t}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
                          Name
                        </label>
                        <Input
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          required
                          disabled={isSending}
                          className="h-11 rounded-xl border-border bg-background px-3.5 text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
                          Email
                        </label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@company.com"
                          required
                          disabled={isSending}
                          className="h-11 rounded-xl border-border bg-background px-3.5 text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                        Message
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell me about your project, role or idea…"
                        rows={6}
                        required
                        disabled={isSending}
                        className="min-h-40 resize-none rounded-xl border-border bg-background px-3.5 py-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary/50 focus-visible:ring-primary/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSending}
                      className="h-12 w-full cursor-pointer rounded-xl border-0 bg-gradient-to-r from-primary to-cyan-400 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:opacity-95 dark:text-black"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 size-4" />
                          Send message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
