import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MdxRenderer } from "@/components/mdx-renderer";
import { getAllProjects, getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { SITE_NAME } from "@/lib/constants";
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

  return {
    title: `${project.title} - ${SITE_NAME}`,
    description: project.excerpt
  };
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

  return (
    <article className="shell py-16 md:py-20">
      <p className="eyebrow">Case Study</p>
      <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.4rem,6vw,5rem)] tracking-tight">{project.title}</h1>
      <p className="mt-6 max-w-3xl text-text/72">{project.excerpt}</p>

      <div className="panel mt-8 overflow-hidden p-3">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            alt={project.title}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            src={project.coverImage}
          />
        </div>
      </div>

      <dl className="mt-8 grid gap-4 text-sm text-text/72 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-text/55">Year</dt>
          <dd className="mt-2">{project.year}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-text/55">Role</dt>
          <dd className="mt-2">{project.role}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-text/55">Services</dt>
          <dd className="mt-2">{project.services.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-text/55">Tech</dt>
          <dd className="mt-2">{project.techStack.join(", ")}</dd>
        </div>
      </dl>

      <section className="panel mt-10 p-6 md:p-7">
        <h2 className="text-sm uppercase tracking-[0.15em] text-text/60">Project snapshot</h2>
        <dl className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-text/55">Context</dt>
            <dd className="mt-2 text-sm leading-relaxed text-text/74">{project.context}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-text/55">Problem</dt>
            <dd className="mt-2 text-sm leading-relaxed text-text/74">{project.problem}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-text/55">What I did</dt>
            <dd className="mt-2 text-sm leading-relaxed text-text/74">{project.contribution}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-text/55">Why it mattered</dt>
            <dd className="mt-2 text-sm leading-relaxed text-text/74">{project.impact}</dd>
          </div>
        </dl>

        <div className="mt-6 rounded-2xl border border-border/65 bg-surface/70 p-5">
          <h3 className="text-xs uppercase tracking-[0.14em] text-text/58">Metric highlights</h3>
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
        <h2 className="text-sm uppercase tracking-[0.15em] text-text/60">Outcomes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-text/75">
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
        </div>
      </div>

      {showNavigation ? (
        <nav className={`mt-10 grid gap-4 ${navLayoutClass}`} aria-label="Case study navigation">
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
