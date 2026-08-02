import type { Metadata } from "next";
import { PrintButton } from "@/components/resume/print-button";
import { certifications, education } from "@/lib/content/education";
import { experience } from "@/lib/content/experience";
import { contact, profile, socials } from "@/lib/content/profile";
import { formatRange } from "@/lib/dates";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Résumé",
  description: `${profile.name} — ${profile.role} at ${profile.company}. Full résumé.`,
  pathname: "/resume",
});

/**
 * Deliberately omits home address, date of birth and phone number, all of which
 * appear on the PDF handed to employers. They do not belong on a public page
 * that search engines index and cannot be made to forget.
 */
export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20 print:max-w-none print:py-0">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {profile.role}, {profile.company} · {profile.location}
          </p>
          <p className="mt-2 text-sm">
            <a
              href={contact.mailto}
              className="underline decoration-accent decoration-2 underline-offset-4"
            >
              {contact.email}
            </a>
            <span className="hidden print:inline"> · tannmaysgupta.com</span>
          </p>
        </div>
        <PrintButton />
      </header>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-sm font-bold tracking-widest uppercase">Profile</h2>
        <div className="space-y-3">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-sm font-bold tracking-widest uppercase">
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((org) => (
            <article key={org.org} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-display text-base font-bold tracking-tight">{org.org}</h3>
                {org.location && (
                  <span className="text-sm text-muted-foreground">{org.location}</span>
                )}
              </div>

              {org.roles.map((role) => (
                <div key={role.title} className="mt-2.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <p className="text-sm font-medium">
                      {role.title}
                      {role.employment && (
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          · {role.employment}
                        </span>
                      )}
                      {role.mode && (
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          · {role.modeNote ? `${role.mode} (${role.modeNote})` : role.mode}
                        </span>
                      )}
                    </p>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {formatRange(role.start, role.end)}
                    </span>
                  </div>

                  {role.summary && (
                    <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
                      {role.summary}
                    </p>
                  )}

                  {role.highlights && (
                    <ul className="mt-1.5 space-y-1">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="relative pl-4 text-sm text-muted-foreground text-pretty before:absolute before:top-2 before:left-0 before:size-1 before:rounded-full before:bg-accent"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 break-inside-avoid">
        <h2 className="mb-4 font-display text-sm font-bold tracking-widest uppercase">Education</h2>
        <div className="space-y-4">
          {education.map((item) => (
            <div key={item.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-sm font-medium">{item.school}</h3>
                <span className="text-sm text-muted-foreground tabular-nums">{item.period}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.qualification}</p>
              {item.notes && (
                <ul className="mt-1 space-y-0.5">
                  {item.notes.map((note) => (
                    <li
                      key={note}
                      className="relative pl-4 text-sm text-muted-foreground text-pretty before:absolute before:top-2 before:left-0 before:size-1 before:rounded-full before:bg-accent"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 break-inside-avoid">
        <h2 className="mb-4 font-display text-sm font-bold tracking-widest uppercase">
          Certifications
        </h2>
        <div className="space-y-3">
          {certifications.map((group) => (
            <div key={group.issuer}>
              <p className="text-sm font-medium">{group.issuer}</p>
              <ul className="mt-0.5">
                {group.items.map((item) => (
                  <li key={`${item.name}-${item.meta}`} className="text-sm text-muted-foreground">
                    {item.name}
                    {item.meta && ` — ${item.meta}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="break-inside-avoid">
        <h2 className="mb-4 font-display text-sm font-bold tracking-widest uppercase">Skills</h2>
        <p className="text-sm text-muted-foreground">{profile.skills.join(" · ")}</p>

        <h2 className="mt-8 mb-4 font-display text-sm font-bold tracking-widest uppercase">
          Elsewhere
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {socials.map((social) => (
            <li key={social.label} className="text-sm text-muted-foreground">
              <a href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
