import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The numbered "01." chips carried over from the resume — the strongest visual
 * link between the PDF people already know and this site.
 */
export function Section({
  id,
  number,
  title,
  description,
  children,
  className,
}: {
  id?: string;
  number: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="mb-10 flex items-start gap-4">
          <span className="section-chip mt-0.5" aria-hidden>
            {number}
          </span>
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight uppercase sm:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="mt-2 max-w-2xl text-muted-foreground text-pretty">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
