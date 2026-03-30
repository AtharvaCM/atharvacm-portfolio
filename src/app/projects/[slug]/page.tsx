import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MdxRenderer } from "@/components/mdx-renderer";
import { ProjectCoverFrame } from "@/components/project-cover-frame";
import { StructuredData } from "@/components/structured-data";
import {
  PROJECT_CATEGORY_LABELS,
  SITE_NAME
} from "@/lib/constants";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectSlugs
} from "@/lib/content";
import { buildMetadata, getProjectStructuredData } from "@/lib/seo";
import { getMeaningfulExternalUrl } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return buildMetadata({
    title: `${project.title} | ${SITE_NAME}`,
    description: project.excerpt,
    path: `/projects/${project.slug}`,
    image: project.coverImage,
    keywords: [...project.techStack, "Frontend Architecture", "Production Systems"]
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getAllProjects()]);

  if (!project) {
    notFound();
  }

  const currentIndex = allProjects.findIndex((item) => item.slug === project.slug);
  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  const showNavigation = Boolean(previous || next);
  const navLayoutClass = previous && next ? "md:grid-cols-2" : "md:grid-cols-1";
  const liveUrl = getMeaningfulExternalUrl(project.liveUrl);
  const repoUrl = getMeaningfulExternalUrl(project.repoUrl);
  const coverFit = project.slug === "vehicle-vault-maintenance-platform" ? "contain" : "cover";

  return (
    <article className="shell py-16 md:py-20">
      <StructuredData data={getProjectStructuredData(project)} />
      <p className="eyebrow">{PROJECT_CATEGORY_LABELS[project.category]} Project</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.4rem,6vw,5rem)] tracking-tight">{project.title}</h1>
      <p className="section-copy mt-6 max-w-[46rem] md:text-base">{project.excerpt}</p>

      <div className="panel mt-8 overflow-hidden p-3">
        <ProjectCoverFrame
          alt={project.title}
          fit={coverFit}
          imageClassName="scale-[1.01]"
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          src={project.coverImage}
        />
      </div>

      <div className="mt-8 overflow-hidden rounded-[1.45rem] border border-border/65 bg-border/65 shadow-[0_22px_54px_-40px_hsl(var(--text)/0.16)]">
        <dl className="grid gap-px text-sm text-text/72 sm:grid-cols-2 md:grid-cols-4">
          <div className="bg-[hsl(var(--surface)/0.96)] p-5">
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">Year</dt>
            <dd className="mt-2">{project.year}</dd>
          </div>
          <div className="bg-[hsl(var(--surface)/0.96)] p-5">
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">Role</dt>
            <dd className="mt-2">{project.role}</dd>
          </div>
          <div className="bg-[hsl(var(--surface)/0.96)] p-5">
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">Focus</dt>
            <dd className="mt-2">{project.services.join(", ")}</dd>
          </div>
          <div className="bg-[hsl(var(--surface)/0.96)] p-5">
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">Tech</dt>
            <dd className="mt-2">{project.techStack.join(", ")}</dd>
          </div>
        </dl>
      </div>

      <section className="panel mt-10 p-6 md:p-7">
        <h2 className="text-[10px] uppercase tracking-[0.16em] text-text/52">Project overview</h2>
        <dl className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">Scope</dt>
            <dd className="mt-2 text-sm leading-7 text-text/74">{project.context}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">Problem</dt>
            <dd className="mt-2 text-sm leading-7 text-text/74">{project.problem}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">What I did</dt>
            <dd className="mt-2 text-sm leading-7 text-text/74">{project.contribution}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.16em] text-text/52">Impact</dt>
            <dd className="mt-2 text-sm leading-7 text-text/74">{project.impact}</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-[1.2rem] border border-border/65 bg-[hsl(var(--surface-soft)/0.68)] p-5">
          <h3 className="text-[10px] uppercase tracking-[0.16em] text-text/52">Key outcomes</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-text/74">
            {project.metricHighlights.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="prose prose-neutral mt-12 max-w-none prose-a:text-accent prose-headings:font-display prose-headings:tracking-tight">
        <MdxRenderer source={project.content} />
      </div>

      <div className="panel mt-10 p-6">
        <h2 className="text-[10px] uppercase tracking-[0.16em] text-text/52">Outcomes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-text/75">
          {project.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {liveUrl ? (
            <Link className="btn-primary" href={liveUrl} rel="noreferrer" target="_blank">
              Visit live
            </Link>
          ) : null}
          {repoUrl ? (
            <Link className="btn-secondary" href={repoUrl} rel="noreferrer" target="_blank">
              View repo
            </Link>
          ) : null}
          <Link className="btn-secondary" href="/about">
            About how I work
          </Link>
          <Link className="btn-secondary" href="/contact">
            Contact me
          </Link>
        </div>
      </div>

      {showNavigation ? (
        <nav className={`mt-10 grid gap-4 ${navLayoutClass}`} aria-label="Project navigation">
          {previous ? (
            <div className="panel p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-text/55">Previous</p>
              <Link className="link-display mt-2 text-2xl" href={`/projects/${previous.slug}`}>
                {previous.title}
              </Link>
            </div>
          ) : null}

          {next ? (
            <div className="panel p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-text/55">Next</p>
              <Link className="link-display mt-2 text-2xl" href={`/projects/${next.slug}`}>
                {next.title}
              </Link>
            </div>
          ) : null}
        </nav>
      ) : null}
    </article>
  );
}
