import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import { PROJECT_CATEGORY_LABELS, SITE_NAME } from "@/lib/constants";
import { filterProjects, getAllProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

function filterLinkClass(active: boolean) {
  return cn(
    "rounded-full border px-3.5 py-2 text-[0.68rem] uppercase tracking-[0.12em] transition duration-200 md:px-4 md:text-xs",
    active
      ? "border-accent/35 bg-accent/10 text-accent"
      : "border-text/14 bg-transparent text-text/64 hover:border-text/28 hover:bg-text/[0.03] hover:text-text"
  );
}

const PROJECT_LISTING_COPY: Record<string, string> = {
  "cash-cove-finance-cockpit":
    "A personal finance workspace with import flows, automation hooks, offline queueing, and reporting.",
  "vehicle-vault-maintenance-platform":
    "A full-stack vehicle maintenance product with ownership workflows, reminders, attachments, and delivery coverage.",
  "eauction-platform":
    "A real-time auction build covering live bidding, auth, backend services, and containerized deployment.",
};

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
    <section className="shell py-14 md:py-20">
      <p className="eyebrow">Projects</p>
      <h1 className="mt-4 max-w-[10ch] font-display text-[clamp(2.8rem,12vw,5rem)] leading-[0.92] tracking-tight md:leading-none">
        Selected work
      </h1>
      <p className="section-copy mt-6 max-w-[39rem]">
        Production systems, product surfaces, and independent builds where
        architecture, performance, and delivery quality mattered.
      </p>
      <Link className="link-action mt-7" href="/resume">
        View resume <span aria-hidden>-&gt;</span>
      </Link>

      <AnimatedSection>
        <div className="mt-12 space-y-8 border-t border-border/90 pt-7 md:mt-14 md:space-y-9 md:pt-8">
          <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
            <span className="basis-full text-[10px] font-semibold uppercase tracking-[0.18em] text-text/52 sm:basis-auto">
              Filter
            </span>
            <Link
              className={filterLinkClass(!params.category)}
              href={buildFilterLink(urlParams, "category")}
            >
              All projects
            </Link>
            {categoryOptions.map((category) => (
              <Link
                className={filterLinkClass(params.category === category)}
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
            <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {filtered.map((project, index) => {
                const featured = !params.category && index === 0;

                return (
                  <ProjectCard
                    className={
                      featured ? "md:col-span-2 xl:col-span-2" : undefined
                    }
                    featured={featured}
                    key={project.slug}
                    project={project}
                    summary={PROJECT_LISTING_COPY[project.slug]}
                  />
                );
              })}
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
