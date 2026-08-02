import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatPostDate, getAllPosts } from "@/lib/posts";

export function WritingTeaser() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground">
        Notes on insurance, product and AI are on the way.{" "}
        <Link
          href="/writing"
          className="underline decoration-accent decoration-2 underline-offset-4"
        >
          The index lives here
        </Link>{" "}
        when there is something to read.
      </p>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex flex-col gap-1 py-5 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="font-display text-base font-bold tracking-tight group-hover:text-accent">
                {post.title}
              </span>
              <time
                dateTime={post.date}
                className="shrink-0 text-sm text-muted-foreground tabular-nums"
              >
                {formatPostDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/writing"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline decoration-accent decoration-2 underline-offset-4"
      >
        All writing
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
