"use client";

import { useState } from "react";

/** Copies the text of the <pre> that sits next to it inside a .code-block wrapper. */
export function CopyButton() {
  const [copied, setCopied] = useState(false);

  const copy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const pre = e.currentTarget.closest(".code-block")?.querySelector("pre");
    if (!pre) return;
    try {
      await navigator.clipboard.writeText(pre.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button type="button" onClick={copy} className="copy-button" aria-label="Copy code">
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
