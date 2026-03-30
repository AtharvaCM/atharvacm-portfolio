import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { BadgeLabel } from "@/components/badge-label";
import { BlogCard } from "@/components/blog-card";
import { BLOG_PAGE_SIZE, SITE_NAME } from "@/lib/constants";
import { filterPostsByTag, getAllBlogPosts, getAllTags, paginatePosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Blog | ${SITE_NAME}`,
  description:
    "Writing about frontend architecture, performance, testing, and practical product engineering.",
  path: "/blog",
  keywords: [
    "Frontend Architecture",
    "Performance Optimization",
    "React",
    "Next.js"
  ]
});

function buildTagHref(tag?: string) {
  if (!tag) {
    return "/blog";
  }

  return `/blog?tag=${encodeURIComponent(tag)}`;
}

function buildPageHref(tag: string | undefined, page: number) {
  const params = new URLSearchParams();
  if (tag) {
    params.set("tag", tag);
  }
  params.set("page", String(page));
  return `/blog?${params.toString()}`;
}

export default async function BlogPage({
  searchParams
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const allPosts = await getAllBlogPosts();
  const tags = getAllTags(allPosts);
  const filtered = filterPostsByTag(allPosts, params.tag);
  const pagination = paginatePosts(filtered, Number(params.page ?? "1"));

  return (
    <section className="shell py-16 md:py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Blog</p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] tracking-tight">Insights and notes</h1>
          <p className="mt-4 max-w-2xl text-text/70">
            Notes on frontend architecture, performance, testing, and the engineering decisions behind maintainable
            product systems.
          </p>
        </div>
        <Link className="btn-secondary" href="/rss.xml">
          Subscribe via RSS
        </Link>
      </div>

      <AnimatedSection>
        <div className="mt-10 panel p-5 md:p-6">
          <div className="flex flex-wrap gap-2">
            <Link
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                !params.tag ? "border-accent bg-accent text-white" : "border-border"
              }`}
              href={buildTagHref()}
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                className={`rounded-full border px-4 py-2 text-xs tracking-[0.04em] ${
                  params.tag === tag ? "border-accent bg-accent text-white" : "border-border"
                }`}
                href={buildTagHref(tag)}
                key={tag}
              >
                <BadgeLabel label={tag} />
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pagination.posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </AnimatedSection>

      <div className="mt-10 flex items-center justify-between text-sm">
        <p className="text-text/65">
          Showing {pagination.posts.length} of {filtered.length} posts ({BLOG_PAGE_SIZE} per page)
        </p>
        <div className="flex gap-2">
          <Link
            aria-disabled={pagination.currentPage <= 1}
            className={`btn-secondary px-4 py-2 text-xs ${pagination.currentPage <= 1 ? "pointer-events-none opacity-45" : ""}`}
            href={buildPageHref(params.tag, pagination.currentPage - 1)}
          >
            Previous
          </Link>
          <Link
            aria-disabled={pagination.currentPage >= pagination.totalPages}
            className={`btn-secondary px-4 py-2 text-xs ${
              pagination.currentPage >= pagination.totalPages ? "pointer-events-none opacity-45" : ""
            }`}
            href={buildPageHref(params.tag, pagination.currentPage + 1)}
          >
            Next
          </Link>
        </div>
      </div>
    </section>
  );
}
