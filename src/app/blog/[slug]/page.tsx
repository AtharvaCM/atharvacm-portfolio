import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleProgress } from "@/components/article-progress";
import {
  ArticleTocDesktop,
  ArticleTocMobile,
} from "@/components/article-toc";
import { BadgeLabel } from "@/components/badge-label";
import { BlogCard } from "@/components/blog-card";
import { MdxRenderer } from "@/components/mdx-renderer";
import { StructuredData } from "@/components/structured-data";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogSlugs,
  getRelatedPosts,
  isPublishedBlogPost
} from "@/lib/content";
import { extractMarkdownHeadings as extractArticleHeadings } from "@/lib/markdown";
import { SITE_NAME } from "@/lib/constants";
import {
  buildMetadata,
  getArticleStructuredData,
  getBreadcrumbStructuredData,
  absoluteUrl
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug, { includeUnpublished: isEnabled });

  if (!post) {
    return {};
  }

  const isUnpublished = !isPublishedBlogPost(post);

  return buildMetadata({
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage ?? `/blog/${post.slug}/opengraph-image`,
    imageAlt: post.coverImageAlt,
    keywords: post.tags,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    noIndex: isUnpublished
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { isEnabled } = await draftMode();
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug, { includeUnpublished: isEnabled }),
    getAllBlogPosts({ includeUnpublished: isEnabled })
  ]);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(allPosts, post.slug);
  const isPreviewingUnpublished = isEnabled && !isPublishedBlogPost(post);
  const headings = extractArticleHeadings(post.content);
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);

  return (
    <article className="shell py-16 md:py-20">
      <ArticleProgress />
      <StructuredData data={getArticleStructuredData(post)} />
      <StructuredData
        data={getBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />
      <p className="eyebrow">Article</p>
      {isPreviewingUnpublished ? (
        <p className="mt-4 text-sm uppercase tracking-[0.16em] text-accent">
          Previewing {post.draft ? "draft" : "scheduled"} post
        </p>
      ) : null}
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.45rem,6.2vw,5.35rem)] leading-[0.94] tracking-[-0.055em]">
        {post.title}
      </h1>
      <p className="mt-5 text-sm uppercase tracking-[0.15em] text-text/58">
        {formatDate(post.publishedAt)} • {post.readingTime ?? 1} min read
      </p>
      <p className="mt-7 max-w-3xl border-l border-accent/45 pl-5 text-[1.05rem] leading-8 text-text/74 md:text-[1.18rem] md:leading-9">
        {post.excerpt}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2 text-xs">
        {post.tags.map((tag) => (
          <li className="tag-chip bg-bg/60 text-xs" key={tag}>
            <BadgeLabel label={tag} />
          </li>
        ))}
      </ul>

      <div className="mx-auto max-w-[1160px]">
        {post.coverImage && post.showCoverImageInPost !== false ? (
          <figure className="mt-10 overflow-hidden rounded-[0.45rem] border border-border/70 bg-panel/40 shadow-[0_24px_70px_-52px_hsl(var(--text)/0.32)] md:mt-12">
            <Image
              alt={post.coverImageAlt ?? ""}
              className="aspect-[3/2] w-full object-cover"
              height={1024}
              priority
              sizes="(min-width: 1280px) 1160px, calc(100vw - 2rem)"
              src={post.coverImage}
              width={1536}
            />
          </figure>
        ) : null}

        <ArticleTocMobile
          headings={headings}
          title={post.title}
          url={articleUrl}
        />

        <div className="mt-12 lg:grid lg:grid-cols-[minmax(0,70ch)_20rem] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,72ch)_20.5rem] xl:gap-16">
          <div className="min-w-0">
            <div className="article-prose">
              <MdxRenderer source={post.content} />
            </div>
          </div>
          <ArticleTocDesktop
            headings={headings}
            title={post.title}
            url={articleUrl}
          />
        </div>
      </div>

      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-tight">Related posts</h2>
          <Link className="btn-secondary" href="/blog">
            View all
          </Link>
        </div>
        {related.length === 0 ? (
          <p className="text-sm text-text/65">No related posts available yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.slug} location="blog_related" post={item} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
