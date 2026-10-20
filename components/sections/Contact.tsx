"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ToastContainer, ToastType } from "@/components/ui/Toast";

export function Contact() {
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
    } catch {
      addToast("Network error. Please check your connection and try again.", "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Section id="contact" title="Contact">
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          Got a project idea or just want to say hi? Send a note and I&apos;ll reply
          soon.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <Input id="contact-name" name="name" required disabled={isSending} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                disabled={isSending}
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <Textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              disabled={isSending}
              className="resize-none"
            />
          </div>
          <Button type="submit" disabled={isSending} className="cursor-pointer">
            {isSending ? (
              <>
                <Loader2 className="mr-1.5 size-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </form>
      </Section>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
