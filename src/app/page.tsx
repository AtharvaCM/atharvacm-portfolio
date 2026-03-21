import Link from "next/link";
import { FiBookOpen, FiBriefcase, FiFolder } from "react-icons/fi";

import { AnimatedSection } from "@/components/animated-section";
import { BlogCard } from "@/components/blog-card";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { TechnologiesSection } from "@/components/technologies-section";
import { getAllBlogPosts, getAllProjects } from "@/lib/content";

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getAllProjects(),
    getAllBlogPosts(),
  ]);
  const showHowIDeliverSection = false;

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <Hero />

      <AnimatedSection>
        <section className="shell pb-14 md:pb-20">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow inline-flex items-center gap-2">
                <FiFolder aria-hidden className="h-3.5 w-3.5" />
                Selected Work
              </p>
              <h2 className="section-heading mt-4">Featured Projects</h2>
              <p className="mt-3 max-w-xl text-sm text-text/68">
                Every card highlights product context, what I delivered, and why
                the outcome mattered.
              </p>
            </div>
            <Link
              className="btn-secondary hidden md:inline-flex"
              href="/projects"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      {showHowIDeliverSection ? (
        <AnimatedSection>
          <section className="shell pb-14 md:pb-20">
            <div className="panel px-6 py-8 md:px-8 md:py-10">
              <p className="eyebrow">How I Work</p>
              <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 className="section-heading">How I deliver in teams</h2>
                <p className="max-w-lg text-sm leading-relaxed text-text/68">
                  I combine product thinking, design sensitivity, and
                  engineering rigor from kickoff to release.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <article className="rounded-2xl border border-border/65 bg-surface/75 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-text/55">
                    01 Product Context
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text/70">
                    Align on user goals, constraints, and product priorities
                    before implementation.
                  </p>
                </article>
                <article className="rounded-2xl border border-border/65 bg-surface/75 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-text/55">
                    02 System Design
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text/70">
                    Build scalable component architecture with clear interaction
                    and visual hierarchy.
                  </p>
                </article>
                <article className="rounded-2xl border border-border/65 bg-surface/75 p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-text/55">
                    03 Engineering Delivery
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text/70">
                    Ship robust front-end code, tune performance, and support
                    iterative product growth.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </AnimatedSection>
      ) : null}

      <AnimatedSection>
        <TechnologiesSection />
      </AnimatedSection>

      <AnimatedSection>
        <section className="shell pb-14 md:pb-20">
          <div className="mb-9 flex items-end justify-between gap-4">
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

          <div className="grid gap-6 md:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </AnimatedSection>

      <section className="shell pb-20 pt-8">
        <div className="panel relative overflow-hidden p-8 md:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/14 blur-lg" />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
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
            <div className="rounded-2xl border border-border/65 bg-surface/72 p-5 text-sm text-text/70">
              <p className="text-xs uppercase tracking-[0.14em] text-text/55">
                What to expect
              </p>
              <ul className="mt-4 space-y-3">
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
