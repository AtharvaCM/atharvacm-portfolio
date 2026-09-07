import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import { TrackedLink } from "@/components/tracked-link";
import { StructuredData } from "@/components/structured-data";
import { PROJECT_CATEGORY_LABELS, SITE_NAME } from "@/lib/constants";
import { filterProjects, getAllProjects } from "@/lib/content";
import {
  buildMetadata,
  getBreadcrumbStructuredData,
  getCollectionPageStructuredData
} from "@/lib/seo";
import type { ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProjectsSearchParams = { category?: string };

function buildProjectsCanonical(params: ProjectsSearchParams) {
  return params.category
    ? `/projects?category=${encodeURIComponent(params.category)}`
    : "/projects";
}

// The category filter comes from the query string, so any value is reachable
// by a crawler. Anything that is not a category a project actually carries
// 404s instead of rendering an empty, indexable near-duplicate of /projects.
const resolveProjectsView = cache(async (params: ProjectsSearchParams) => {
  const allProjects = await getAllProjects();
  const categoryOptions = Array.from(
    new Set(allProjects.map((project) => project.category)),
  );

  if (params.category && !categoryOptions.includes(params.category as ProjectCategory)) {
    notFound();
  }

  const filtered = filterProjects(allProjects, params.category);

  return { allProjects, categoryOptions, filtered };
});

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ProjectsSearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  await resolveProjectsView(params);

  const categoryLabel =
    params.category &&
    PROJECT_CATEGORY_LABELS[
      params.category as keyof typeof PROJECT_CATEGORY_LABELS
    ];
  const titleSuffix = categoryLabel ? ` · ${categoryLabel}` : "";

  return buildMetadata({
    title: `Projects${titleSuffix} | ${SITE_NAME}`,
    description: categoryLabel
      ? `${categoryLabel} projects — production systems, scalable web applications, and independent engineering work.`
      : "Selected frontend, platform, performance, and full-stack work across production systems, scalable web applications, and independent engineering projects.",
    path: buildProjectsCanonical(params),
    keywords: [
      "Frontend Architecture",
      "Scalable Web Applications",
      "Performance Optimization",
      "Production Systems",
      ...(categoryLabel ? [categoryLabel] : []),
    ],
  });
}

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
  searchParams: Promise<ProjectsSearchParams>;
}) {
  const params = await searchParams;
  const { categoryOptions, filtered } = await resolveProjectsView(params);
  const urlParams = new URLSearchParams();
  if (params.category) {
    urlParams.set("category", params.category);
  }

  const categoryLabel =
    params.category &&
    PROJECT_CATEGORY_LABELS[
      params.category as keyof typeof PROJECT_CATEGORY_LABELS
    ];
  const listingCanonical = buildProjectsCanonical(params);

  return (
    <section className="shell py-14 md:py-20">
      <StructuredData
        data={getCollectionPageStructuredData({
          name: categoryLabel ? `Projects · ${categoryLabel}` : "Projects",
          description:
            "Selected frontend, platform, performance, and full-stack work.",
          path: listingCanonical,
          items: filtered.map((project) => ({
            name: project.title,
            path: `/projects/${project.slug}`
          }))
        })}
      />
      <StructuredData
        data={getBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" }
        ])}
      />
      <p className="eyebrow">Projects</p>
      <h1 className="mt-4 max-w-[10ch] font-display text-[clamp(2.8rem,12vw,5rem)] leading-[0.92] tracking-tight md:leading-none">
        Selected work
      </h1>
      <p className="section-copy mt-6 max-w-[39rem]">
        Production systems and independent builds where the work had to
        ship, scale, and keep working.
      </p>
      <TrackedLink
        className="link-action mt-7"
        href="/resume"
        trackingEvent="resume_click"
        trackingPayload={{ location: "projects_page" }}
      >
        View resume <span aria-hidden>-&gt;</span>
      </TrackedLink>

      <AnimatedSection>
        <div className="mt-12 space-y-8 border-t border-border/90 pt-7 md:mt-14 md:space-y-9 md:pt-8">
          <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
            <span className="basis-full text-[10px] font-semibold uppercase tracking-[0.18em] text-text/52 sm:basis-auto">
              Filter
            </span>
            <TrackedLink
              className={filterLinkClass(!params.category)}
              href={buildFilterLink(urlParams, "category")}
              trackingEvent="project_filter_select"
              trackingPayload={{
                filter_value: "all",
                location: "projects_page",
              }}
            >
              All projects
            </TrackedLink>
            {categoryOptions.map((category) => (
              <TrackedLink
                className={filterLinkClass(params.category === category)}
                href={buildFilterLink(urlParams, "category", category)}
                key={category}
                trackingEvent="project_filter_select"
                trackingPayload={{
                  filter_value: category,
                  location: "projects_page",
                }}
              >
                {PROJECT_CATEGORY_LABELS[category]}
              </TrackedLink>
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
                    location="projects_page"
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
