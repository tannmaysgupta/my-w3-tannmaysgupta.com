"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Replaces `motion`'s `useReducedMotion` — the only reason the shader backdrop
 * would otherwise need a 59KB animation library. Everything else on the site
 * handles reduced motion in CSS.
 *
 * Starts `false` so server and first client render agree; the effect corrects
 * it before the shader is ever mounted.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    setReduced(media.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
