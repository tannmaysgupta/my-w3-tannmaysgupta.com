import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { contact, profile } from "@/lib/content/profile";
import { ShaderBackdrop } from "./shader-backdrop";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden">
      <ShaderBackdrop />

      <div className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8">
        <p className="mb-6 text-sm tracking-widest text-muted-foreground uppercase">
          {profile.role} · {profile.company}
        </p>

        <h1 className="max-w-3xl font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl">
          I build software for the{" "}
          <PointerHighlight
            rectangleClassName="border-accent/70 rounded-lg"
            pointerClassName="text-accent"
            containerClassName="inline-block"
          >
            <span className="relative z-10 px-1">people who move insurance</span>
          </PointerHighlight>
          .
        </h1>

        <p className="mt-6 max-w-xl font-serif text-lg text-muted-foreground italic sm:text-xl">
          {profile.subline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            See the work
            <ArrowDown className="size-4" aria-hidden />
          </Link>
          <a
            href={contact.mailto}
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
