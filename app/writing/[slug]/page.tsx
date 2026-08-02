import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatPostDate, getAllPosts, getPost } from "@/lib/posts";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Next 16: `params` is a Promise in every route entry point.
export async function generateMetadata(props: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Not found", pathname: `/writing/${slug}` });

  return buildMetadata({
    title: post.title,
    description: post.description,
    pathname: `/writing/${post.slug}`,
  });
}

export default async function WritingPostPage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/writing"
        className="text-sm text-muted-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-foreground"
      >
        ← Writing
      </Link>

      <header className="mt-8 mb-10">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <time dateTime={post.date} className="tabular-nums">
            {formatPostDate(post.date)}
          </time>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-neutral max-w-none font-serif prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:decoration-accent prose-a:decoration-2 prose-a:underline-offset-4 prose-hr:border-border dark:prose-invert">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
