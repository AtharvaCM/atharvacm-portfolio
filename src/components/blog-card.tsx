import Link from "next/link";

import type { BlogPostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Props = {
  post: BlogPostMeta;
};

export function BlogCard({ post }: Props) {
  return (
    <article className="panel flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/45 md:p-6">
      <div className="subtle-rule" />
      <p className="mt-5 text-[11px] uppercase tracking-[0.15em] text-text/55">
        {formatDate(post.publishedAt)} • {post.readingTime ?? 1} min read
      </p>

      <h3 className="mt-4 font-display text-[2rem] leading-[0.95] tracking-tight">
        <Link className="link-display text-[inherit]" href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-text/70">{post.excerpt}</p>

      <ul className="mt-5 flex flex-wrap gap-2 text-[11px] text-text/68">
        {post.tags.map((tag) => (
          <li className="rounded-full border border-border/75 bg-bg/60 px-3 py-1" key={tag}>
            {tag}
          </li>
        ))}
      </ul>

      <Link className="link-action mt-auto pt-7" href={`/blog/${post.slug}`}>
        Read article <span aria-hidden>-&gt;</span>
      </Link>
    </article>
  );
}
