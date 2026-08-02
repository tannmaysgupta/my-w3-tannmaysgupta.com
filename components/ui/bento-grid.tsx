import type { ReactNode } from "react";
import type { TileSize } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * Four columns on desktop, two on tablet, one on mobile. Fixed row height above
 * the mobile breakpoint keeps the grid reading as a grid rather than a collage;
 * on mobile every tile is its natural height in a single column.
 */
export function BentoGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:auto-rows-[13rem] sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export const tileSpan: Record<TileSize, string> = {
  sm: "sm:col-span-1 sm:row-span-1",
  wide: "sm:col-span-2 sm:row-span-1",
  tall: "sm:col-span-1 sm:row-span-2",
  lg: "sm:col-span-2 sm:row-span-2",
};
