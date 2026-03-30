import Link from "next/link";

import { BadgeLabel } from "@/components/badge-label";
import type { BlogPostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Props = {
  post: BlogPostMeta;
};

export function BlogCard({ post }: Props) {
  return (
    <article className="panel flex h-full flex-col p-5 transition duration-200 hover:border-border/90 hover:shadow-[0_24px_48px_-38px_hsl(var(--text)/0.16)] md:p-6">
      <div className="subtle-rule" />
      <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-text/52">
        {formatDate(post.publishedAt)} • {post.readingTime ?? 1} min read
      </p>

      <h3 className="mt-4 max-w-[15ch] font-display text-[1.95rem] leading-[0.95] tracking-tight">
        <Link className="link-display text-[inherit]" href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-7 text-text/70">{post.excerpt}</p>

      <ul className="mt-5 flex flex-wrap gap-2 text-[11px] text-text/68">
        {post.tags.map((tag) => (
          <li className="tag-chip" key={tag}>
            <BadgeLabel label={tag} />
          </li>
        ))}
      </ul>

      <Link className="link-action mt-auto pt-7" href={`/blog/${post.slug}`}>
        Read article <span aria-hidden>-&gt;</span>
      </Link>
    </article>
  );
}
