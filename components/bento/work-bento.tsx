import { ArrowUpRight } from "lucide-react";
import { BentoGrid, tileSpan } from "@/components/ui/bento-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { projects } from "@/lib/content/projects";
import type { Project } from "@/lib/content/types";
import { cn } from "@/lib/utils";

function Tile({ project }: { project: Project }) {
  const isVaatun = project.accent === "vaatun";

  return (
    <SpotlightCard
      as="article"
      className={cn(
        "flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-colors",
        "focus-within:border-accent/60 hover:border-accent/60",
        tileSpan[project.size],
      )}
      style={isVaatun ? ({ "--tile-accent": "var(--vaatun)" } as React.CSSProperties) : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={cn(
            "text-[0.6875rem] font-medium tracking-widest uppercase",
            isVaatun ? "text-vaatun" : "text-muted-foreground",
          )}
        >
          {project.eyebrow}
        </p>
        {project.href && (
          <ArrowUpRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/spotlight:-translate-y-0.5 group-hover/spotlight:translate-x-0.5"
            aria-hidden
          />
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-display text-lg font-extrabold tracking-tight text-balance">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              // Stretched link: the whole tile is the target, the heading keeps
              // the semantics.
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground text-pretty">{project.blurb}</p>

        {project.detail && (
          <div
            className={cn(
              "grid transition-all duration-300 ease-out",
              // Always open where there is no hover to reveal it (touch).
              "grid-rows-[1fr] opacity-100",
              // Where hover exists, collapse until hovered or keyboard-focused.
              "[@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0",
              "group-hover/spotlight:grid-rows-[1fr] group-hover/spotlight:opacity-100",
              "group-focus-within/spotlight:grid-rows-[1fr] group-focus-within/spotlight:opacity-100",
            )}
          >
            <div className="overflow-hidden">
              <p className="pt-2 text-sm text-muted-foreground/90 text-pretty">{project.detail}</p>
            </div>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

export function WorkBento() {
  return (
    <BentoGrid>
      {projects.map((project) => (
        <Tile key={project.id} project={project} />
      ))}
    </BentoGrid>
  );
}
