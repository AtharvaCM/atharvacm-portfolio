import Link from "next/link";
import { FiBookOpen, FiBriefcase, FiFolder, FiStar } from "react-icons/fi";

import { AnimatedSection } from "@/components/animated-section";
import { BadgeLabel } from "@/components/badge-label";
import { Hero } from "@/components/hero";
import { ProjectCoverFrame } from "@/components/project-cover-frame";
import { TechnologiesSection } from "@/components/technologies-section";
import { getAllBlogPosts, getAllProjects } from "@/lib/content";
import { PROJECT_CATEGORY_LABELS, RESUME_URL } from "@/lib/constants";
import {
  AVAILABILITY_NOTE,
  BEST_FIT_NOTE,
  HOME_IMPACT_ITEMS,
  QUICK_SNAPSHOT_ITEMS
} from "@/lib/profile-content";
import { HOME_DESCRIPTION, HOME_TITLE, buildMetadata } from "@/lib/seo";
import type { BlogPostMeta, ProjectMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  keywords: [
    "Senior Frontend Engineer",
    "Frontend Developer",
    "Full-Stack Engineer",
    "React Developer",
    "Next.js Developer"
  ]
});

const HIRING_FIT_AREAS = [
  "Senior Frontend",
  "Frontend Platform",
  "Product Engineering",
  "Frontend-Focused Full-Stack"
] as const;

function FeaturedProjectStory({ project }: { project: ProjectMeta }) {
  const coverFit = project.slug === "vehicle-vault-maintenance-platform" ? "contain" : "cover";

  return (
    <article className="panel group overflow-hidden p-4 md:p-5">
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
        <ProjectCoverFrame
          alt={project.title}
          className="min-h-[18rem] lg:min-h-full"
          fit={coverFit}
          imageClassName="transition duration-500 group-hover:scale-[1.02]"
          sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 48vw, 100vw"
          src={project.coverImage}
        >
          <span className="meta-chip">{PROJECT_CATEGORY_LABELS[project.category]}</span>
        </ProjectCoverFrame>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-text/52">
            <span className="meta-chip">{project.year}</span>
            <span className="meta-chip">{project.role}</span>
          </div>
          <h3 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,3.6vw,3.35rem)] leading-[0.94] tracking-tight">
            <Link
              className="transition duration-300 hover:text-accent"
              href={`/projects/${project.slug}`}
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-4 section-copy max-w-[36rem] md:text-base">
            {project.excerpt}
          </p>

          <dl className="mt-6 grid gap-4">
            <div className="rounded-[1.15rem] border border-border/65 bg-[hsl(var(--surface-soft)/0.68)] p-4">
              <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">
                Scope
              </dt>
              <dd className="mt-2 text-sm leading-6 text-text/70">
                {project.context}
              </dd>
            </div>
            <div className="rounded-[1.15rem] border border-border/65 bg-[hsl(var(--surface-soft)/0.68)] p-4">
              <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">
                Impact
              </dt>
              <dd className="mt-2 text-sm leading-6 text-text/70">
                {project.impact}
              </dd>
            </div>
          </dl>

          <div className="mt-6 rounded-[1.15rem] border border-border/65 bg-[hsl(var(--surface-soft)/0.64)] p-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">
              Highlights
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-text/72">
              {project.metricHighlights.slice(0, 3).map((item) => (
                <li className="flex gap-3" key={item}>
                  <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-accent/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 text-[11px] text-text/70">
            {project.techStack.slice(0, 5).map((tech) => (
              <li className="tag-chip font-semibold tracking-[0.04em]" key={tech}>
                <BadgeLabel label={tech} />
              </li>
            ))}
          </ul>

          <Link className="link-action mt-8" href={`/projects/${project.slug}`}>
            View project details
          </Link>
        </div>
      </div>
    </article>
  );
}

function CompactProjectStory({ project }: { project: ProjectMeta }) {
  return (
    <article className="panel h-full p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="meta-chip">{PROJECT_CATEGORY_LABELS[project.category]}</span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-text/52">
          {project.year} · {project.role}
        </span>
      </div>

      <h3 className="mt-4 max-w-[15ch] font-display text-[2rem] leading-[0.95] tracking-tight">
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

      <p className="mt-4 border-t border-border/65 pt-4 text-sm leading-6 text-text/65">
        {project.metricHighlights[0]}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2 text-[11px] text-text/68">
        {project.techStack.slice(0, 4).map((tech) => (
          <li className="tag-chip" key={tech}>
            <BadgeLabel label={tech} />
          </li>
        ))}
      </ul>

      <Link className="link-action mt-7" href={`/projects/${project.slug}`}>
        View project details
      </Link>
    </article>
  );
}

function FeaturedArticleCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="panel h-full p-6 md:p-8">
      <div className="subtle-rule" />
      <p className="mt-5 text-[10px] uppercase tracking-[0.16em] text-text/52">
        {formatDate(post.publishedAt)} • {post.readingTime ?? 1} min read
      </p>

      <h3 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,3.8vw,3.45rem)] leading-[0.94] tracking-tight">
        <Link
          className="transition duration-300 hover:text-accent"
          href={`/blog/${post.slug}`}
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-4 section-copy max-w-[38rem] md:text-base">
        {post.excerpt}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2 text-[11px] text-text/68">
        {post.tags.map((tag) => (
          <li className="tag-chip" key={tag}>
            <BadgeLabel label={tag} />
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
      <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">
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
  const resumeHref = RESUME_URL ?? "/resume";
  const resumeTarget = RESUME_URL ? "_blank" : undefined;
  const resumeRel = RESUME_URL ? "noreferrer" : undefined;

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const [leadProject, ...secondaryProjects] = featuredProjects;
  const [leadPost, ...secondaryPosts] = latestPosts;

  return (
    <>
      <Hero />

      <section className="shell pb-16 md:pb-20">
        <div className="panel grid gap-8 p-6 md:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <FiStar aria-hidden className="h-3.5 w-3.5 text-accent/80" />
              Quick Snapshot
            </p>
            <h2 className="mt-4 max-w-[14ch] font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] tracking-tight">
              Senior frontend engineer for product teams that need scale.
            </h2>
            <p className="section-copy mt-4 max-w-[34rem]">
              {AVAILABILITY_NOTE}
            </p>
            <p className="mt-3 max-w-[34rem] text-sm leading-7 text-text/66">
              {BEST_FIT_NOTE}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="btn-primary" href={resumeHref} rel={resumeRel} target={resumeTarget}>
                Download Resume
              </Link>
              <Link className="btn-secondary" href="/contact">
                Contact Me
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.45rem] border border-border/65 bg-border/65 shadow-[0_22px_54px_-40px_hsl(var(--text)/0.16)]">
            <div className="grid gap-px md:grid-cols-2 xl:grid-cols-3">
              {QUICK_SNAPSHOT_ITEMS.map((item) => (
                <article className="bg-[hsl(var(--surface)/0.96)] p-5 md:p-6" key={item}>
                  <p className="text-sm leading-7 text-text/72">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection>
        <TechnologiesSection />
      </AnimatedSection>

      {leadProject ? (
        <AnimatedSection>
          <section className="shell content-auto pb-16 md:pb-24" id="selected-work">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow inline-flex items-center gap-2">
                  <FiFolder aria-hidden className="h-3.5 w-3.5 text-accent/80" />
                  Projects
                </p>
                <h2 className="section-heading mt-4">Selected Work</h2>
                <p className="section-copy mt-3 max-w-[38rem]">
                  A few projects that show how I work: product-minded,
                  frontend-first, and built for production.
                </p>
              </div>
              <Link className="btn-secondary hidden md:inline-flex" href="/projects">
                View all projects
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
        <section className="shell content-auto pb-16 md:pb-24">
            <div className="mb-8">
              <p className="eyebrow inline-flex items-center gap-2">
                <FiStar aria-hidden className="h-3.5 w-3.5 text-accent/80" />
                Engineering Impact
              </p>
              <h2 className="section-heading mt-4">What I&apos;ve improved</h2>
          </div>

          <div className="overflow-hidden rounded-[1.45rem] border border-border/65 bg-border/65 shadow-[0_22px_54px_-40px_hsl(var(--text)/0.16)]">
            <div className="grid gap-px md:grid-cols-2 xl:grid-cols-5">
            {HOME_IMPACT_ITEMS.map((item) => (
              <article
                className="bg-[hsl(var(--surface)/0.96)] p-5 md:p-6"
                key={item}
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-text/50">
                  Improvement
                </p>
                <p className="mt-3 text-sm leading-7 text-text/72">{item}</p>
              </article>
            ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="shell content-auto pb-16 md:pb-24">
            <div className="panel grid gap-8 p-8 md:p-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <FiBriefcase aria-hidden className="h-3.5 w-3.5 text-accent/80" />
                About
              </p>
              <h2 className="section-heading mt-4">Product-aware, and built for production.</h2>
            </div>
            <div className="flex h-full flex-col justify-end">
              <p className="section-copy max-w-[42rem] md:text-base">
                I work on frontend systems that need to hold up under real
                product pressure. That usually means improving
                maintainability, handling complexity without losing clarity,
                and shipping features that stay reliable as products and teams
                grow.
              </p>
              <Link className="btn-secondary mt-6" href="/about">
                Read more
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {leadPost ? (
        <AnimatedSection>
          <section className="shell content-auto pb-16 md:pb-24">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow inline-flex items-center gap-2">
                  <FiBookOpen aria-hidden className="h-3.5 w-3.5 text-accent/80" />
                  Writing
                </p>
                <h2 className="section-heading mt-4">Writing</h2>
                <p className="section-copy mt-3 max-w-[38rem]">
                  Notes on frontend systems, performance, debugging, and
                  production engineering.
                </p>
              </div>
              <Link className="btn-secondary hidden md:inline-flex" href="/blog">
                Read notes
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

      <section className="shell content-auto pb-20 pt-2 md:pb-24">
        <div className="panel overflow-hidden p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <FiBriefcase aria-hidden className="h-3.5 w-3.5 text-accent/80" />
                Hiring
              </p>
              <h2 className="section-heading mt-3 max-w-3xl">
                Open to senior frontend and full-stack roles.
              </h2>
              <p className="section-copy mt-5 max-w-[36rem]">
                If you&apos;re building a serious product and need someone who
                can own frontend systems, improve delivery quality, and work
                comfortably across product and engineering constraints,
                let&apos;s talk.
              </p>
              <p className="mt-4 text-sm leading-7 text-text/66">
                {AVAILABILITY_NOTE}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="btn-primary" href="/contact">
                  Contact me
                </Link>
                <Link className="btn-secondary" href={resumeHref} rel={resumeRel} target={resumeTarget}>
                  Download Resume
                </Link>
              </div>
            </div>

            <div className="rounded-[1.2rem] border border-border/65 bg-[hsl(var(--surface-soft)/0.66)] p-5 md:p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-text/52">Best fit</p>
              <p className="mt-4 text-sm leading-7 text-text/70">
                Teams building complex web products where frontend quality,
                performance, and clean engineering all matter.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {HIRING_FIT_AREAS.map((item) => (
                  <li className="tag-chip" key={item}>
                    <BadgeLabel label={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
