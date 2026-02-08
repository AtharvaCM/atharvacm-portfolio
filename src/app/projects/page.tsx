import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedSection } from "@/components/animated-section";
import { ProjectCard } from "@/components/project-card";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { filterProjects, getAllProjects } from "@/lib/content";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Projects - ${SITE_NAME}`,
  description: "Case studies with strategy, process, stack, and measurable outcomes."
};

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
  searchParams
}: {
  searchParams: Promise<{ category?: string; tech?: string }>;
}) {
  const params = await searchParams;
  const allProjects = await getAllProjects();
  const techOptions = Array.from(new Set(allProjects.flatMap((project) => project.techStack))).sort((a, b) =>
    a.localeCompare(b)
  );

  const filtered = filterProjects(allProjects, params.category, params.tech);
  const urlParams = new URLSearchParams();
  if (params.category) {
    urlParams.set("category", params.category);
  }
  if (params.tech) {
    urlParams.set("tech", params.tech);
  }

  return (
    <section className="shell py-16 md:py-20">
      <p className="eyebrow">Projects</p>
      <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] tracking-tight">Case studies</h1>
      <p className="mt-4 max-w-2xl text-text/70">
        Browse selected work across product sites, SaaS platforms, and interaction-heavy launches.
      </p>

      <AnimatedSection>
        <div className="mt-12 space-y-8">
          <div className="panel p-5 md:p-6">
            <h2 className="text-xs uppercase tracking-[0.16em] text-text/60">Filter by category</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                  !params.category ? "border-accent bg-accent text-white" : "border-border"
                }`}
                href={buildFilterLink(urlParams, "category")}
              >
                All
              </Link>
              {PROJECT_CATEGORIES.map((category) => (
                <Link
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                    params.category === category ? "border-accent bg-accent text-white" : "border-border"
                  }`}
                  href={buildFilterLink(urlParams, "category", category)}
                  key={category}
                >
                  {category}
                </Link>
              ))}
            </div>

            <h2 className="mt-6 text-xs uppercase tracking-[0.16em] text-text/60">Filter by tech</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                  !params.tech ? "border-accent bg-accent text-white" : "border-border"
                }`}
                href={buildFilterLink(urlParams, "tech")}
              >
                All
              </Link>
              {techOptions.map((tech) => (
                <Link
                  className={`rounded-full border px-4 py-2 text-xs tracking-[0.02em] ${
                    params.tech === tech ? "border-accent bg-accent text-white" : "border-border"
                  }`}
                  href={buildFilterLink(urlParams, "tech", tech)}
                  key={tech}
                >
                  {tech}
                </Link>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-text/70">No projects match the active filters.</p>
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
