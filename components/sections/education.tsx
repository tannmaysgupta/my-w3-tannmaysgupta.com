import { certifications, education } from "@/lib/content/education";

export function EducationSection() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12">
      <div className="space-y-6">
        {education.map((item) => (
          <article key={item.school} className="rounded-xl border border-border bg-card/40 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-display text-base font-bold tracking-tight">{item.school}</h3>
              <span className="text-sm text-muted-foreground tabular-nums">{item.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.qualification}</p>
            {item.notes && (
              <ul className="mt-3 space-y-1.5">
                {item.notes.map((note) => (
                  <li
                    key={note}
                    className="relative pl-4 text-sm text-muted-foreground text-pretty before:absolute before:top-2.5 before:left-0 before:size-1 before:rounded-full before:bg-accent"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="font-display text-sm font-bold tracking-widest uppercase">Certifications</h3>
        <dl className="space-y-5">
          {certifications.map((group) => (
            <div key={group.issuer} className="border-l-2 border-accent/40 pl-4">
              <dt className="text-sm font-medium">{group.issuer}</dt>
              <dd className="mt-1.5 space-y-1">
                {group.items.map((item) => (
                  <p
                    key={`${item.name}-${item.meta}`}
                    className="flex flex-wrap gap-x-2 text-sm text-muted-foreground"
                  >
                    <span>{item.name}</span>
                    {item.meta && <span className="text-muted-foreground/70">— {item.meta}</span>}
                  </p>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
