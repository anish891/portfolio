"use client";

import { useEffect, useRef, useCallback } from "react";
import Typed from "typed.js";

interface UseTypingEffectOptions {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
}

export function useTypingEffect({
  strings,
  typeSpeed = 80,
  backSpeed = 50,
  backDelay = 1500,
  loop = true,
  showCursor = true,
  cursorChar = "|",
}: UseTypingEffectOptions) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<Typed | null>(null);

  const destroy = useCallback(() => {
    typedRef.current?.destroy();
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;

    typedRef.current = new Typed(elementRef.current, {
      strings,
      typeSpeed,
      backSpeed,
      backDelay,
      loop,
      showCursor,
      cursorChar,
    });

    return () => {
      typedRef.current?.destroy();
    };
  }, [strings, typeSpeed, backSpeed, backDelay, loop, showCursor, cursorChar]);

  return { elementRef, destroy };
}
