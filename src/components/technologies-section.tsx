import { FiBriefcase, FiCode, FiGrid, FiZap } from "react-icons/fi";

import { HERO_BADGES, HOME_FOCUS_AREAS } from "@/lib/profile-content";

const FOCUS_ICONS = [FiGrid, FiZap, FiBriefcase];

export function TechnologiesSection() {
  return (
    <section className="shell content-auto pb-16 md:pb-24">
      <div className="max-w-[42rem]">
        <div>
          <p className="eyebrow inline-flex items-center gap-2">
            <FiCode aria-hidden className="h-3.5 w-3.5 text-accent/80" />
            Focus
          </p>
          <h2 className="section-heading mt-4 max-w-4xl">What I focus on</h2>
        </div>
        <p className="section-copy mt-4 max-w-[38rem]">
          I work at the intersection of frontend architecture, product
          engineering, and performance. My experience spans high-traffic
          consumer platforms, internal tools, reporting systems, and
          data-heavy dashboards.
        </p>
      </div>

      <div className="panel mt-8 overflow-hidden">
        <div className="grid md:grid-cols-3 md:divide-x md:divide-border/65">
          {HOME_FOCUS_AREAS.map((group, index) => {
            const Icon = FOCUS_ICONS[index] ?? FiCode;

            return (
              <article
                className={`p-6 md:p-8 ${index > 0 ? "border-t border-border/65 md:border-t-0" : ""}`}
                key={group.title}
              >
                <p className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-text/52">
                  <Icon aria-hidden className="h-3.5 w-3.5 text-accent/75" />
                  Focus area
                </p>
                <h3 className="mt-3 font-display text-[1.95rem] leading-[0.98] tracking-tight text-text">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-text/70">
                  {group.copy}
                </p>
              </article>
            );
          })}
        </div>

        <div className="border-t border-border/65 px-6 py-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <p className="max-w-[32rem] text-sm leading-7 text-text/68">
              Frontend is my strongest area, but I work full stack when the
              product needs end-to-end ownership across APIs, content systems,
              testing, and deployment.
            </p>
            <ul className="flex flex-wrap gap-2 text-[11px] text-text/70">
              {HERO_BADGES.map((item) => (
                <li className="tag-chip font-semibold tracking-[0.04em]" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
