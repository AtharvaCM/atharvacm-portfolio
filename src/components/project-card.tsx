import Image from "next/image";
import Link from "next/link";

import { PROJECT_CATEGORY_LABELS } from "@/lib/constants";
import type { ProjectMeta } from "@/lib/types";

type Props = {
  project: ProjectMeta;
};

export function ProjectCard({ project }: Props) {
  return (
    <article className="panel group h-full overflow-hidden p-5 transition duration-200 hover:border-border/90 hover:shadow-[0_26px_56px_-40px_hsl(var(--text)/0.18)] md:p-6">
      <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-[1.2rem] border border-border/65 bg-[hsl(var(--surface-soft)/0.72)]">
        <Image
          alt={project.title}
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={project.coverImage}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-text/22 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <span className="meta-chip">
          {PROJECT_CATEGORY_LABELS[project.category]}
          </span>
        </div>
      </div>

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
            {tech}
          </li>
        ))}
      </ul>

      <Link className="link-action mt-7" href={`/projects/${project.slug}`}>
        View project details <span aria-hidden>-&gt;</span>
      </Link>
    </article>
  );
}
