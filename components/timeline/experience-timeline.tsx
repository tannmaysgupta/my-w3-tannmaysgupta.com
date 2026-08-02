import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { experience } from "@/lib/content/experience";
import type { Role } from "@/lib/content/types";
import { formatDuration, formatMonth, formatRange, monthsBetween } from "@/lib/dates";

/** Tenure across every role at one organisation, e.g. "3 yrs". */
function orgDuration(roles: Role[], now: string): string {
  const starts = roles.map((role) => role.start).sort();
  const ends = roles.map((role) => role.end ?? now).sort();
  return formatDuration(monthsBetween(starts[0], ends[ends.length - 1]));
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
      {children}
    </span>
  );
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4 className="font-display text-base font-bold tracking-tight">{role.title}</h4>
        <span className="text-sm text-muted-foreground tabular-nums">
          {formatRange(role.start, role.end)}
        </span>
      </div>

      {(role.employment || role.mode || role.modeNote) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {role.employment && <Badge>{role.employment}</Badge>}
          {role.mode && (
            <Badge>{role.modeNote ? `${role.mode} — ${role.modeNote}` : role.mode}</Badge>
          )}
        </div>
      )}

      {role.summary && (
        <p className="mt-3 text-sm text-muted-foreground text-pretty">{role.summary}</p>
      )}

      {role.highlights && (
        <ul className="mt-3 space-y-1.5">
          {role.highlights.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-4 text-sm text-muted-foreground text-pretty before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-accent"
            >
              {highlight}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ExperienceTimeline() {
  // Present-day tenure is computed at build time — the site rebuilds often
  // enough that "1 yr 6 mos" stays honest without any client-side clock.
  const now = new Date().toISOString().slice(0, 7);

  const entries: TimelineEntry[] = experience.map((org) => {
    const latest = org.roles[0];
    return {
      key: org.org,
      label: (
        <span>
          {formatMonth(latest.start)}
          {latest.end === null && " — now"}
        </span>
      ),
      content: (
        <article className="rounded-xl border border-border bg-card/40 p-5 sm:p-6">
          <header className="mb-4 border-b border-border/70 pb-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {org.orgUrl ? (
                <a
                  href={org.orgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg font-extrabold tracking-tight underline decoration-accent decoration-2 underline-offset-4"
                >
                  {org.org}
                </a>
              ) : (
                <h3 className="font-display text-lg font-extrabold tracking-tight">{org.org}</h3>
              )}
              <span className="text-sm text-muted-foreground">{orgDuration(org.roles, now)}</span>
            </div>
            {org.location && <p className="mt-1 text-sm text-muted-foreground">{org.location}</p>}
          </header>

          <div className="space-y-6">
            {org.roles.map((role) => (
              <RoleBlock key={`${org.org}-${role.title}`} role={role} />
            ))}
          </div>
        </article>
      ),
    };
  });

  return <Timeline data={entries} />;
}
