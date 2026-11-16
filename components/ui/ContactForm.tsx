"use client";

import { useState } from "react";

type Status = { message: string; type: "success" | "error" };

export function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  // Shown inline under the form and announced to screen readers.
  const [status, setStatus] = useState<Status | null>(null);

  const report = (message: string, type: Status["type"]) => setStatus({ message, type });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    // The name ends up in the email subject: collapse any line breaks or tabs and cap the length.
    const subjectName = name.replace(/\s+/g, " ").trim().slice(0, 100);

    setIsSending(true);
    setStatus(null);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    // Honeypot: bots fill hidden fields, humans don't
    if (formData.get("botcheck")) {
      setIsSending(false);
      return;
    }

    if (!accessKey && process.env.NODE_ENV === "production") {
      report("The contact form isn't configured. Please email me directly.", "error");
      setIsSending(false);
      return;
    }

    if (!accessKey) {
      // Simulate delay for realistic UX testing
      await new Promise((resolve) => setTimeout(resolve, 800));

      report("Local test successful! To send real emails, please define NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your .env.local file.", "success");
      form.reset();
      setIsSending(false);
      return;
    }

    // Don't leave the button disabled forever if the service never answers.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        signal: controller.signal,
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
          subject: `New Portfolio Message from ${subjectName}`,
        }),
      });

      // An error page (for example a 429 or 5xx) is not JSON, so don't let parsing failures
      // look like a network problem.
      let data: { success?: boolean; message?: string } | null = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (data?.success) {
        report("Message sent successfully! I will get back to you soon.", "success");
        form.reset();
      } else if (!data && !response.ok) {
        report(
          `The message service returned an error (${response.status}). Please try again later or email me directly.`,
          "error"
        );
      } else {
        report(data?.message || "Something went wrong. Please try again.", "error");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        report("The request timed out. Please try again or email me directly.", "error");
      } else {
        report("Network error. Please check your connection and try again.", "error");
      }
    } finally {
      clearTimeout(timeout);
      setIsSending(false);
    }
  };

  return (
    <div>
      <p className="mb-6">
        Got a project idea or just want to say hi? Send a note and I&apos;ll reply soon.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              disabled={isSending}
            />
          </div>
          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              disabled={isSending}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            disabled={isSending}
          />
        </div>
        <button type="submit" disabled={isSending} className="button">
          {isSending ? "Sending..." : "Send message"}
        </button>
        <div role="status" aria-live="polite">
          {status && (
            <p className="form-status" data-type={status.type}>
              {status.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
