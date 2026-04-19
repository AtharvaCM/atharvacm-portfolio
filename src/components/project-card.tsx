import Link from "next/link";

import { BadgeLabel } from "@/components/badge-label";
import { ProjectCoverFrame } from "@/components/project-cover-frame";
import type { ProjectMeta } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  featured?: boolean;
  project: ProjectMeta;
  summary?: string;
};

export function ProjectCard({
  className,
  featured = false,
  project,
  summary,
}: Props) {
  const coverFit =
    project.slug === "vehicle-vault-maintenance-platform" ? "contain" : "cover";
  const excerpt = summary ?? project.excerpt;

  return (
    <article
      className={cn(
        "panel group h-full overflow-hidden p-4 transition duration-200 hover:border-border/90 hover:shadow-[0_26px_56px_-40px_hsl(var(--text)/0.18)] md:p-6",
        featured && "md:p-7",
        className,
      )}
    >
      <ProjectCoverFrame
        alt={project.title}
        className="mb-5 md:mb-6"
        chromeDensity="compact"
        fit={coverFit}
        imageClassName="transition duration-500 group-hover:scale-[1.02]"
        sizes={
          featured
            ? "(min-width: 1280px) 58vw, (min-width: 768px) 90vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        }
        src={project.coverImage}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.16em] text-text/60 md:gap-3 md:text-text/52">
        <span>{project.year}</span>
        <span>{project.role}</span>
      </div>

      <h3
        className={cn(
          "max-w-[15ch] font-display text-[1.75rem] leading-[0.98] tracking-tight md:text-[2rem] md:leading-[0.95]",
          featured && "md:max-w-[17ch] md:text-[2.35rem]",
        )}
      >
        <Link
          className="link-display text-[inherit]"
          href={`/projects/${project.slug}`}
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-7 text-text/76 md:text-text/70">
        {excerpt}
      </p>

      <p className="mt-4 hidden border-t border-border/65 pt-4 text-sm leading-6 text-text/65 md:block">
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
        View project details <span aria-hidden>-&gt;</span>
      </Link>
    </article>
  );
}
