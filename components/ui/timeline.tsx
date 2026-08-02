import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TimelineEntry = {
  /** Rendered in the sticky left rail on desktop, inline on mobile. */
  label: ReactNode;
  content: ReactNode;
  key: string;
};

/**
 * Adapted from Aceternity's timeline. The scroll-tracked beam is the good idea
 * and is kept; the demo heading, the `pt-40` rhythm (unworkable at nine
 * entries) and the purple/blue gradient are not.
 *
 * The original tracked scroll with `useScroll`/`useTransform` plus a
 * ResizeObserver to measure rail height. This version does the same thing with
 * a CSS view-timeline, which needs no measurement, no client JS and no
 * `motion` — so the component stays a server component. See `.timeline-beam`
 * in styles.css.
 */
export function Timeline({ data, className }: { data: TimelineEntry[]; className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <div className="timeline-rail relative">
        {data.map((item) => (
          <div key={item.key} className="flex justify-start pt-8 sm:pt-12 md:gap-8">
            <div className="sticky top-24 z-20 hidden shrink-0 self-start md:block md:w-44">
              <div className="pl-16 text-sm font-medium text-muted-foreground tabular-nums">
                {item.label}
              </div>
            </div>

            <div className="relative w-full pl-16 md:pl-0">
              <div className="mb-3 text-sm font-medium text-muted-foreground tabular-nums md:hidden">
                {item.label}
              </div>
              {item.content}
            </div>
          </div>
        ))}

        {/* Static rail, with the progress beam layered over it. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-6 w-px overflow-hidden bg-gradient-to-b from-transparent via-border to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
        >
          <div className="timeline-beam absolute inset-0 w-px rounded-full bg-gradient-to-b from-accent via-accent/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
