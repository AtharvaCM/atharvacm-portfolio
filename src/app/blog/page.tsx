import type { Metadata } from "next";
import { draftMode } from "next/headers";
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
  const { isEnabled } = await draftMode();
  const allPosts = await getAllBlogPosts({ includeUnpublished: isEnabled });
  const tags = getAllTags(allPosts);
  const filtered = filterPostsByTag(allPosts, params.tag);
  const pagination = paginatePosts(filtered, Number(params.page ?? "1"));
  const hasPosts = allPosts.length > 0;

  return (
    <section className="shell py-12 md:py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Blog</p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,12vw,5rem)] leading-none tracking-tight">Insights and notes</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-text/74 md:text-base">
            Writing about engineering decisions, product systems, performance, and the practical tradeoffs behind
            real-world software.
          </p>
          {isEnabled ? (
            <p className="mt-3 text-sm text-accent">Preview mode includes drafts and scheduled posts.</p>
          ) : null}
        </div>
        {hasPosts ? (
          <Link className="btn-secondary" href="/rss.xml">
            Subscribe via RSS
          </Link>
        ) : null}
      </div>

      {hasPosts ? (
        <>
          <AnimatedSection>
            <div className="mt-8 panel p-4 md:mt-10 md:p-6">
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
            <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {pagination.posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-8 flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between md:mt-10">
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
        </>
      ) : (
        <AnimatedSection>
          <div className="mt-10 max-w-2xl border-t border-border pt-7 md:mt-14 md:pt-8">
            <p className="eyebrow">Coming soon</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] tracking-tight">
              The blog is on the way.
            </h2>
            <p className="mt-5 text-sm leading-7 text-text/74 md:text-base">
              I’m still putting the first few posts together. For now, the projects page is the best place to see how I
              think through product and engineering work.
            </p>
            <div className="mt-8">
              <Link className="btn-primary" href="/projects">
                View projects
              </Link>
            </div>
          </div>
        </AnimatedSection>
      )}
    </section>
  );
}
