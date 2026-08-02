import { contact, profile, socials } from "@/lib/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 print:hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="space-y-1">
          <p className="font-display text-sm font-bold">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            {profile.role}, {profile.company} · {profile.location}
          </p>
          <a
            href={contact.mailto}
            className="inline-block text-sm text-muted-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-foreground"
          >
            {contact.email}
          </a>
        </div>

        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
