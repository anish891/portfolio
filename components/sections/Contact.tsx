"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { socialLinks } from "@/lib/data";
import {
  Mail,
  Send,
  Download,
  CheckCircle,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
};

export function Contact() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Open mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.open(
      `mailto:anishtejwani@gmail.com?subject=${subject}&body=${body}`
    );

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    form.reset();
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading mb-4">
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Amazing</span>
          </h2>
          <p className="section-subheading mx-auto">
            Got a project idea or just want to say hi? I&apos;d love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Contact Form */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard glowColor="purple" hover={false}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-primary/5 border-primary/10 focus:border-primary/40 placeholder:text-muted-foreground/50 text-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-primary/5 border-primary/10 focus:border-primary/40 placeholder:text-muted-foreground/50 text-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-foreground mb-1.5 block"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project or just say hello..."
                    rows={4}
                    required
                    className="bg-primary/5 border-primary/10 focus:border-primary/40 placeholder:text-muted-foreground/50 resize-none text-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[oklch(0.70_0.14_55)] to-[oklch(0.82_0.09_70)] text-white border-0 h-10 text-sm font-semibold cursor-pointer shadow-sm shadow-primary/20 hover:opacity-90 transition-opacity"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="size-4 mr-1.5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="size-4 mr-1.5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Social Links */}
            <GlassCard hover={false}>
              <h3 className="font-semibold text-foreground text-sm mb-4">
                Connect
              </h3>
              <div className="space-y-2.5">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon] || Mail;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary/5 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {link.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {link.url.replace(/^(https?:\/\/|mailto:)/, "")}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </GlassCard>

            {/* Resume Download */}
            <GlassCard hover={false}>
              <h3 className="font-semibold text-foreground text-sm mb-3">
                Resume
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Download my latest resume for a complete overview.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-primary/15 bg-primary/5 hover:bg-primary/10 text-primary font-semibold cursor-pointer transition-colors"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="size-3.5 mr-1.5" />
                  Download Resume
                </a>
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
