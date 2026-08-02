import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60svh] w-full max-w-3xl flex-col justify-center px-5 py-24 sm:px-8">
      <p className="section-chip mb-6" aria-hidden>
        404
      </p>
      <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        This one doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground text-pretty">
        Which is unusual — there aren&apos;t many pages here to begin with.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
        <Link
          href="/writing"
          className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          Writing
        </Link>
      </div>
    </div>
  );
}
