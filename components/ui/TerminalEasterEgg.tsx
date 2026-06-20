"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  about     — Who is Anish?
  skills    — Technical skills
  contact   — Get in touch
  projects  — Featured projects
  clear     — Clear terminal
  exit      — Close terminal`,

  about: `
  ╭─────────────────────────────────╮
  │  Anish Tejwani                  │
  │  AI Engineer & Full-Stack Dev   │
  │  Mumbai, India                  │
  ╰─────────────────────────────────╯

  Computer Engineer passionate about building
  intelligent software systems and AI-powered
  applications.`,

  skills: `
  Languages:  Java • Python • TypeScript • JavaScript
  Frontend:   React • Next.js • Tailwind
  Backend:    Node.js • Express • REST APIs
  AI & ML:    LangChain • AI Agents • LLM Integration
  Mobile:     Flutter
  Databases:  SQL • Firebase`,

  contact: `
  📧 Email:    anishtejwani@gmail.com
  🔗 GitHub:   github.com/anishtejwani
  💼 LinkedIn: linkedin.com/in/anishtejwani`,

  projects: `
  1. AI Trading System
     Real-time trading engine with deep learning
  2. Image Analysis Platform
     Computer vision + OCR intelligence
  3. Notes Application
     Cross-platform Flutter + Firebase app`,
};

export function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<
    { type: "input" | "output"; text: string }[]
  >([
    {
      type: "output",
      text: '🎉 You found the secret terminal! Type "help" for available commands.',
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const konamiIndex = useRef(0);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    setHistory((prev) => [...prev, { type: "input", text: `$ ${cmd}` }]);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "exit") {
      setIsOpen(false);
      setHistory([
        {
          type: "output",
          text: '🎉 You found the secret terminal! Type "help" for available commands.',
        },
      ]);
      return;
    }

    const output = COMMANDS[trimmed];
    if (output) {
      setHistory((prev) => [...prev, { type: "output", text: output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          text: `Command not found: ${trimmed}. Type "help" for available commands.`,
        },
      ]);
    }
  }, []);

  // Listen for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return;

      if (e.code === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_CODE.length) {
          setIsOpen(true);
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Auto-scroll and focus
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Terminal window */}
          <motion.div
            className="relative w-full max-w-2xl rounded-xl border border-white/10 terminal-bg shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="size-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  />
                  <div className="size-3 rounded-full bg-yellow-500/80" />
                  <div className="size-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  anish@portfolio ~ %
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="p-4 h-80 overflow-y-auto font-mono text-sm space-y-1"
            >
              {history.map((entry, i) => (
                <div
                  key={i}
                  className={
                    entry.type === "input"
                      ? "terminal-text font-semibold"
                      : "text-muted-foreground"
                  }
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {entry.text}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="terminal-text">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent terminal-text outline-none border-none text-sm caret-[oklch(0.8_0.18_150)]"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
