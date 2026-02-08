import Image from "next/image";
import Link from "next/link";

import type { ProjectMeta } from "@/lib/types";

type Props = {
  project: ProjectMeta;
};

export function ProjectCard({ project }: Props) {
  return (
    <article className="panel group h-full overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_34px_90px_-52px_hsl(var(--accent)/0.58)] md:p-6">
      <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border/60">
        <Image
          alt={project.title}
          className="object-cover transition duration-700 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={project.coverImage}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-text/35 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text/70">
          {project.category}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-text/55">
        <span>{project.year}</span>
        <span>{project.role}</span>
      </div>

      <h3 className="font-display text-[2.1rem] leading-[0.95] tracking-tight">
        <Link className="link-display text-[inherit]" href={`/projects/${project.slug}`}>
          {project.title}
        </Link>
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-text/70">{project.excerpt}</p>

      <ul className="mt-5 flex flex-wrap gap-2 text-[11px] text-text/68">
        {project.techStack.slice(0, 4).map((tech) => (
          <li className="rounded-full border border-border/75 bg-bg/60 px-3 py-1" key={tech}>
            {tech}
          </li>
        ))}
      </ul>

      <Link className="link-action mt-7" href={`/projects/${project.slug}`}>
        Read case study <span aria-hidden>-&gt;</span>
      </Link>
    </article>
  );
}
