import type { Metadata } from "next";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description: "Notes on insurance, product and AI — by Tannmay S Gupta.",
  pathname: "/writing",
});

export default function WritingIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="mb-12">
        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Writing</h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          Notes on insurance, product and AI — mostly where the three overlap.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">
          Nothing published yet. There are drafts;{" "}
          <Link
            href="/#contact"
            className="underline decoration-accent decoration-2 underline-offset-4"
          >
            say hello
          </Link>{" "}
          if you want to argue with one early.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                className="group block py-6 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="font-display text-lg font-bold tracking-tight group-hover:text-accent">
                    {post.title}
                    {post.draft && (
                      <span className="ml-2 rounded-full border border-border px-2 py-0.5 align-middle text-[0.625rem] tracking-wide text-muted-foreground uppercase">
                        Draft
                      </span>
                    )}
                  </h2>
                  <time
                    dateTime={post.date}
                    className="shrink-0 text-sm text-muted-foreground tabular-nums"
                  >
                    {formatPostDate(post.date)}
                  </time>
                </div>
                {post.description && (
                  <p className="mt-2 text-muted-foreground text-pretty">{post.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
