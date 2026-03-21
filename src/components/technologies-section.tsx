import { FiCode } from "react-icons/fi";

type TechnologyGroup = {
  title: string;
  summary: string;
  items: string[];
};

const TECHNOLOGY_GROUPS: TechnologyGroup[] = [
  {
    title: "Interface systems",
    summary: "For responsive, scalable product surfaces.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Design systems"]
  },
  {
    title: "Application layer",
    summary: "For state, content, and app composition.",
    items: ["Node.js", "NestJS", "GraphQL", "Sanity CMS", "Prisma"]
  },
  {
    title: "Data workflows",
    summary: "For APIs, persistence, and backend delivery.",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Python", "Django"]
  },
  {
    title: "Delivery stack",
    summary: "For shipping, iteration, and design handoff.",
    items: ["AWS", "Docker", "Vercel", "GitHub", "Figma"]
  }
];

export function TechnologiesSection() {
  return (
    <section className="shell content-auto pb-14 md:pb-20">
      <div className="panel overflow-hidden px-6 py-8 md:px-8 md:py-9">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <FiCode aria-hidden className="h-3.5 w-3.5" />
              Tech stack
            </p>
            <h2 className="section-heading mt-4 max-w-4xl">
              <span className="text-accent">Technologies</span>{" "}
              <span className="text-text">I use</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-text/70">
            Front-end is my primary focus, but I work full stack across APIs,
            databases, and cloud delivery when products need end-to-end
            ownership.
          </p>
        </div>

        <div className="mt-8">
          {TECHNOLOGY_GROUPS.map((group, index) => (
            <article
              className={`grid gap-4 py-5 md:grid-cols-[0.26fr_0.34fr_0.4fr] md:items-start ${
                index === 0 ? "" : "border-t border-border/60"
              }`}
              key={group.title}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text/55">
                {group.title}
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-text/68">
                {group.summary}
              </p>
              <ul className="flex flex-wrap gap-2 text-[11px] text-text/70">
                {group.items.map((item) => (
                  <li
                    className="rounded-full border border-border/70 bg-surface/85 px-3 py-1.5 font-semibold tracking-[0.04em]"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
