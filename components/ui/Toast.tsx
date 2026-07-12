"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md max-w-sm w-full select-none ${
        type === "success"
          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
          : "bg-rose-500/10 border-rose-500/25 text-rose-400"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 className="size-5 shrink-0" />
      ) : (
        <AlertCircle className="size-5 shrink-0" />
      )}
      <p className="text-sm font-medium leading-normal flex-1 text-foreground">
        {message}
      </p>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="size-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto w-full">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
