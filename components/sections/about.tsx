import { profile } from "@/lib/content/profile";

export function AboutSection() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
          <h2 className="font-display text-sm font-bold tracking-widest text-muted-foreground uppercase">
            In a nutshell
          </h2>

          <div className="space-y-5">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed text-pretty">
                {paragraph}
              </p>
            ))}

            <ul className="flex flex-wrap gap-x-2 gap-y-2 pt-3">
              {profile.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
