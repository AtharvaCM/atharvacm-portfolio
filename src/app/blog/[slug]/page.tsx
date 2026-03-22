import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleProgress } from "@/components/article-progress";
import { BlogCard } from "@/components/blog-card";
import { MdxRenderer } from "@/components/mdx-renderer";
import { StructuredData } from "@/components/structured-data";
import { getAllBlogPosts, getBlogPostBySlug, getBlogSlugs, getRelatedPosts } from "@/lib/content";
import { SITE_NAME } from "@/lib/constants";
import { buildMetadata, getArticleStructuredData } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return buildMetadata({
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage,
    keywords: post.tags,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getAllBlogPosts()]);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(allPosts, post.slug);

  return (
    <article className="shell py-16 md:py-20">
      <ArticleProgress />
      <StructuredData data={getArticleStructuredData(post)} />
      <p className="eyebrow">Article</p>
      <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,5.7vw,4.8rem)] tracking-tight">{post.title}</h1>
      <p className="mt-5 text-sm uppercase tracking-[0.15em] text-text/55">
        {formatDate(post.publishedAt)} • {post.readingTime ?? 1} min read
      </p>
      <p className="mt-6 max-w-2xl text-text/72">{post.excerpt}</p>

      <ul className="mt-6 flex flex-wrap gap-2 text-xs">
        {post.tags.map((tag) => (
          <li className="rounded-full border border-border bg-bg/60 px-3 py-1" key={tag}>
            {tag}
          </li>
        ))}
      </ul>

      <div className="prose prose-neutral mt-12 max-w-none prose-a:text-accent prose-headings:font-display prose-headings:tracking-tight">
        <MdxRenderer source={post.content} />
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
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
