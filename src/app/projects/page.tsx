import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import { PROJECT_CATEGORY_LABELS, SITE_NAME } from "@/lib/constants";
import { filterProjects, getAllProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `Projects | ${SITE_NAME}`,
  description:
    "Selected frontend, platform, performance, and full-stack work across production systems, scalable web applications, and independent engineering projects.",
  path: "/projects",
  keywords: [
    "Frontend Architecture",
    "Scalable Web Applications",
    "Performance Optimization",
    "Production Systems",
  ],
});

function buildFilterLink(params: URLSearchParams, key: string, value?: string) {
  const next = new URLSearchParams(params);

  if (!value) {
    next.delete(key);
  } else {
    next.set(key, value);
  }

  const query = next.toString();
  return query ? `/projects?${query}` : "/projects";
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const allProjects = await getAllProjects();
  const categoryOptions = Array.from(
    new Set(allProjects.map((project) => project.category)),
  );

  const filtered = filterProjects(allProjects, params.category);
  const urlParams = new URLSearchParams();
  if (params.category) {
    urlParams.set("category", params.category);
  }

  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">Projects</p>
      <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] tracking-tight">
        Projects
      </h1>
      <p className="section-copy max-w-[42rem]">
        A selection of work across product engineering, frontend architecture,
        performance optimization, and full-stack application development.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link className="btn-primary" href="/contact">
          Contact me
        </Link>
        <Link className="btn-secondary" href="/about">
          About how I work
        </Link>
        <Link className="btn-secondary" href="/resume">
          View resume
        </Link>
      </div>

      <AnimatedSection>
        <div className="mt-12 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text/52">
              Browse by
            </span>
            <Link
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                !params.category
                  ? "border-accent/35 bg-accent/10 text-accent"
                  : "border-text/14 bg-[hsl(var(--surface-soft))/0.48] text-text/72 hover:border-text/22 hover:text-text"
              }`}
              href={buildFilterLink(urlParams, "category")}
            >
              All projects
            </Link>
            {categoryOptions.map((category) => (
              <Link
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                  params.category === category
                    ? "border-accent/35 bg-accent/10 text-accent"
                    : "border-text/14 bg-[hsl(var(--surface-soft))/0.48] text-text/72 hover:border-text/22 hover:text-text"
                }`}
                href={buildFilterLink(urlParams, "category", category)}
                key={category}
              >
                {PROJECT_CATEGORY_LABELS[category]}
              </Link>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-text/70">
              No projects match the active filters.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
