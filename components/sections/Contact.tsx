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
  Loader2,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { ToastContainer, ToastType } from "@/components/ui/Toast";

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Mail,
};

export function Contact() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [isSending, setIsSending] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
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

    if (!accessKey) {
      console.warn("WARNING: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not defined in environment variables.");
      
      // Simulate delay for realistic UX testing
      await new Promise((resolve) => setTimeout(resolve, 800));

      addToast("Local test successful! To send real emails, please define NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your .env.local file.", "success");
      form.reset();
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
          subject: `New Portfolio Message from ${name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        addToast("Message sent successfully! I will get back to you soon.", "success");
        form.reset();
      } else {
        addToast(data.message || "Something went wrong. Please try again.", "error");
      }
    } catch (err) {
      addToast("Network error. Please check your connection and try again.", "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
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
                      disabled={isSending}
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
                      disabled={isSending}
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
                      disabled={isSending}
                      className="bg-primary/5 border-primary/10 focus:border-primary/40 placeholder:text-muted-foreground/50 resize-none text-foreground"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[oklch(0.70_0.14_55)] to-[oklch(0.82_0.09_70)] text-white border-0 h-10 text-sm font-semibold cursor-pointer shadow-sm shadow-primary/20 hover:opacity-90 transition-opacity"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="size-4 mr-1.5 animate-spin" />
                        Sending...
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


          </motion.div>
        </div>
      </div>
    </section>
    <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
