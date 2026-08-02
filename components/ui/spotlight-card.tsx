"use client";

import { type MouseEvent, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A pointer-following spotlight, done with two CSS custom properties.
 *
 * Aceternity's card-spotlight pulls in three.js and @react-three/fiber for its
 * canvas reveal — roughly 600KB to light up a card on hover. This achieves the
 * visible part of that effect in a handful of lines, keeps the site's single
 * WebGL canvas reserved for the hero, and degrades to a plain card when
 * JavaScript is unavailable.
 */
export function SpotlightCard({
  className,
  children,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "article" | "li" }) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      // biome-ignore lint/suspicious/noExplicitAny: one ref shared across three tag names
      ref={ref as any}
      onMouseMove={handleMouseMove}
      className={cn("group/spotlight relative isolate overflow-hidden", className)}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklab, var(--tile-accent, var(--sage)) 22%, transparent), transparent 70%)",
        }}
      />
      {children}
    </Tag>
  );
}
