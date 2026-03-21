import Image from "next/image";
import Link from "next/link";
import { FiBookOpen, FiBriefcase, FiFolder } from "react-icons/fi";

import { AnimatedSection } from "@/components/animated-section";
import { Hero } from "@/components/hero";
import { TechnologiesSection } from "@/components/technologies-section";
import { getAllBlogPosts, getAllProjects } from "@/lib/content";
import type { BlogPostMeta, ProjectMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function FeaturedProjectStory({ project }: { project: ProjectMeta }) {
  return (
    <article className="panel group overflow-hidden p-4 md:p-5">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[20rem] overflow-hidden rounded-[1.6rem] border border-border/60">
          <Image
            alt={project.title}
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            fill
            priority
            sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 48vw, 100vw"
            src={project.coverImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-text/65 via-text/8 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-text/70">
            {project.category}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.14em] text-text/55">
            {project.year} · {project.role}
          </p>
          <h3 className="mt-4 font-display text-[clamp(2.4rem,4.3vw,4.6rem)] leading-[0.92] tracking-tight">
            <Link
              className="transition duration-300 hover:text-accent"
              href={`/projects/${project.slug}`}
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-text/70 md:text-base">
            {project.excerpt}
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.4rem] border border-border/60 bg-surface/70 p-4">
              <dt className="text-[10px] uppercase tracking-[0.16em] text-text/55">
                Context
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-text/70">
                {project.context}
              </dd>
            </div>
            <div className="rounded-[1.4rem] border border-border/60 bg-surface/70 p-4">
              <dt className="text-[10px] uppercase tracking-[0.16em] text-text/55">
                Why it mattered
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-text/70">
                {project.impact}
              </dd>
            </div>
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2 text-[11px] text-text/70">
            {project.techStack.slice(0, 5).map((tech) => (
              <li
                className="rounded-full border border-border/70 bg-bg/58 px-3 py-1.5 font-semibold tracking-[0.04em]"
                key={tech}
              >
                {tech}
              </li>
            ))}
          </ul>

          <Link className="link-action mt-8" href={`/projects/${project.slug}`}>
            Read case study
          </Link>
        </div>
      </div>
    </article>
  );
}

function CompactProjectStory({ project }: { project: ProjectMeta }) {
  return (
    <article className="panel h-full p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-text/55">
        <span>{project.year}</span>
        <span>{project.role}</span>
      </div>

      <h3 className="mt-4 font-display text-[2.15rem] leading-[0.94] tracking-tight">
        <Link
          className="transition duration-300 hover:text-accent"
          href={`/projects/${project.slug}`}
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-text/70">
        {project.excerpt}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2 text-[11px] text-text/68">
        {project.techStack.slice(0, 4).map((tech) => (
          <li
            className="rounded-full border border-border/75 bg-bg/60 px-3 py-1"
            key={tech}
          >
            {tech}
          </li>
        ))}
      </ul>

      <Link className="link-action mt-7" href={`/projects/${project.slug}`}>
        Read case study
      </Link>
    </article>
  );
}

function FeaturedArticleCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="panel h-full p-6 md:p-8">
      <div className="subtle-rule" />
      <p className="mt-5 text-[11px] uppercase tracking-[0.15em] text-text/55">
        {formatDate(post.publishedAt)} • {post.readingTime ?? 1} min read
      </p>

      <h3 className="mt-4 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.92] tracking-tight">
        <Link
          className="transition duration-300 hover:text-accent"
          href={`/blog/${post.slug}`}
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text/70 md:text-base">
        {post.excerpt}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2 text-[11px] text-text/68">
        {post.tags.map((tag) => (
          <li
            className="rounded-full border border-border/75 bg-bg/60 px-3 py-1.5"
            key={tag}
          >
            {tag}
          </li>
        ))}
      </ul>

      <Link className="link-action mt-8" href={`/blog/${post.slug}`}>
        Read article
      </Link>
    </article>
  );
}

function CompactArticleCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="panel h-full p-5 md:p-6">
      <p className="text-[11px] uppercase tracking-[0.14em] text-text/55">
        {formatDate(post.publishedAt)} • {post.readingTime ?? 1} min read
      </p>
      <h3 className="mt-4 font-display text-[2rem] leading-[0.95] tracking-tight">
        <Link
          className="transition duration-300 hover:text-accent"
          href={`/blog/${post.slug}`}
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-text/70">{post.excerpt}</p>
      <Link className="link-action mt-6" href={`/blog/${post.slug}`}>
        Read article
      </Link>
    </article>
  );
}

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getAllProjects(),
    getAllBlogPosts()
  ]);

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const [leadProject, ...secondaryProjects] = featuredProjects;
  const [leadPost, ...secondaryPosts] = latestPosts;

  return (
    <>
      <Hero />

      {leadProject ? (
        <AnimatedSection>
          <section className="shell content-auto pb-14 md:pb-20">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow inline-flex items-center gap-2">
                  <FiFolder aria-hidden className="h-3.5 w-3.5" />
                  Selected Work
                </p>
                <h2 className="section-heading mt-4">Featured Projects</h2>
                <p className="mt-3 max-w-xl text-sm text-text/68">
                  Every card highlights product context, what I delivered, and
                  why the outcome mattered.
                </p>
              </div>
              <Link className="btn-secondary hidden md:inline-flex" href="/projects">
                View all
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
              <FeaturedProjectStory project={leadProject} />

              <div className="grid gap-6">
                {secondaryProjects.map((project) => (
                  <CompactProjectStory key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      ) : null}

      <AnimatedSection>
        <TechnologiesSection />
      </AnimatedSection>

      {leadPost ? (
        <AnimatedSection>
          <section className="shell content-auto pb-14 md:pb-20">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow inline-flex items-center gap-2">
                  <FiBookOpen aria-hidden className="h-3.5 w-3.5" />
                  Writing
                </p>
                <h2 className="section-heading mt-4">Latest insights</h2>
                <p className="mt-3 max-w-xl text-sm text-text/68">
                  Notes on front-end architecture, design systems, and practical
                  product engineering.
                </p>
              </div>
              <Link className="btn-secondary hidden md:inline-flex" href="/blog">
                Read blog
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
              <FeaturedArticleCard post={leadPost} />

              <div className="grid gap-4">
                {secondaryPosts.map((post) => (
                  <CompactArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      ) : null}

      <section className="shell content-auto pb-20 pt-4">
        <div className="panel relative overflow-hidden p-8 md:p-12">
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/14 blur-2xl" />
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <FiBriefcase aria-hidden className="h-3.5 w-3.5" />
                Career
              </p>
              <h2 className="section-heading mt-3 max-w-3xl">
                Open to senior front-end and product engineering roles.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-text/72">
                If you&apos;re building a serious product and need someone who
                cares about code quality and delivery, let&apos;s talk.
              </p>
              <Link className="btn-primary mt-8" href="/contact">
                Contact me
              </Link>
            </div>

            <div className="rounded-[1.6rem] border border-border/65 bg-surface/72 p-5 text-sm text-text/70">
              <p className="text-[11px] uppercase tracking-[0.16em] text-text/55">
                What to expect
              </p>
              <ul className="mt-4 space-y-3 leading-relaxed">
                <li>Short intro conversation.</li>
                <li>Discussion on role scope and team needs.</li>
                <li>Share resume details and relevant project deep-dives.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
