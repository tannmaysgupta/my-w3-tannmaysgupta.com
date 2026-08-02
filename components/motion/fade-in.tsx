import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's one scroll-reveal primitive — a CSS class, not a JavaScript
 * animation library. It stays a server component, ships no JS, and runs off the
 * main thread via `animation-timeline: view()`.
 *
 * Where scroll-driven animations are unsupported, or the user prefers reduced
 * motion, the content is simply visible. The `.reveal` rule in styles.css only
 * ever adds an entrance; it never hides anything that might stay hidden.
 */
export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
