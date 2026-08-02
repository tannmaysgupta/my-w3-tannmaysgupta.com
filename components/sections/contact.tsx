import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { contact, profile, socials } from "@/lib/content/profile";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        {/* Aceternity's glowing-effect needs `motion` for the same visual the
            spotlight already provides, so it reuses the tile treatment. */}
        <SpotlightCard className="rounded-2xl border border-border bg-card p-8 transition-colors hover:border-accent/60 sm:p-12">
          <div className="relative">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
              Building something in insurance? I&apos;d like to hear about it.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground text-pretty">
              Brokers, intermediaries, founders and the merely curious — all welcome. I read
              everything that lands.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={contact.mailto}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
              >
                {contact.email}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <span className="text-sm text-muted-foreground">{profile.location}</span>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-border/70 pt-6">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
