import Link from "next/link";

import { BadgeLabel } from "@/components/badge-label";
import { ProjectCoverFrame } from "@/components/project-cover-frame";
import type { ProjectMeta } from "@/lib/types";

type Props = {
  project: ProjectMeta;
};

export function ProjectCard({ project }: Props) {
  const coverFit = project.slug === "vehicle-vault-maintenance-platform" ? "contain" : "cover";

  return (
    <article className="panel group h-full overflow-hidden p-5 transition duration-200 hover:border-border/90 hover:shadow-[0_26px_56px_-40px_hsl(var(--text)/0.18)] md:p-6">
      <ProjectCoverFrame
        alt={project.title}
        className="mb-6"
        chromeDensity="compact"
        fit={coverFit}
        imageClassName="transition duration-500 group-hover:scale-[1.02]"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        src={project.coverImage}
      />

      <div className="mb-4 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-text/52">
        <span>{project.year}</span>
        <span>{project.role}</span>
      </div>

      <h3 className="max-w-[15ch] font-display text-[2rem] leading-[0.95] tracking-tight">
        <Link className="link-display text-[inherit]" href={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-7 text-text/70">{project.excerpt}</p>

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
        View project details <span aria-hidden>-&gt;</span>
      </Link>
    </article>
  );
}
