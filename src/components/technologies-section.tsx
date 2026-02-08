import type { IconType } from "react-icons";
import { FiCode } from "react-icons/fi";
import {
  SiAmazon,
  SiCss3,
  SiDjango,
  SiDocker,
  SiFigma,
  SiGraphql,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSass,
  SiSanity,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from "react-icons/si";

type Technology = {
  name: string;
  Icon: IconType;
  accentClass: string;
};

const TECHNOLOGIES: Technology[] = [
  { name: "HTML5", Icon: SiHtml5, accentClass: "text-orange-500" },
  { name: "CSS3", Icon: SiCss3, accentClass: "text-blue-500" },
  { name: "JavaScript", Icon: SiJavascript, accentClass: "text-amber-400" },
  { name: "TypeScript", Icon: SiTypescript, accentClass: "text-blue-500" },
  { name: "React", Icon: SiReact, accentClass: "text-sky-400" },
  { name: "Next.js", Icon: SiNextdotjs, accentClass: "text-text/90" },
  { name: "NestJS", Icon: SiNestjs, accentClass: "text-rose-500" },
  { name: "Tailwind", Icon: SiTailwindcss, accentClass: "text-cyan-400" },
  { name: "Sanity CMS", Icon: SiSanity, accentClass: "text-red-500" },
  { name: "Sass", Icon: SiSass, accentClass: "text-pink-400" },
  { name: "Node.js", Icon: SiNodedotjs, accentClass: "text-green-500" },
  { name: "GraphQL", Icon: SiGraphql, accentClass: "text-pink-500" },
  { name: "Python", Icon: SiPython, accentClass: "text-yellow-400" },
  { name: "Django", Icon: SiDjango, accentClass: "text-emerald-500" },
  { name: "PostgreSQL", Icon: SiPostgresql, accentClass: "text-blue-300" },
  { name: "MySQL", Icon: SiMysql, accentClass: "text-sky-500" },
  { name: "MongoDB", Icon: SiMongodb, accentClass: "text-green-400" },
  { name: "Prisma", Icon: SiPrisma, accentClass: "text-cyan-200" },
  { name: "AWS", Icon: SiAmazon, accentClass: "text-amber-400" },
  { name: "Vercel", Icon: SiVercel, accentClass: "text-text/90" },
  { name: "Docker", Icon: SiDocker, accentClass: "text-blue-400" },
  { name: "Git", Icon: SiGit, accentClass: "text-orange-500" },
  { name: "GitHub", Icon: SiGithub, accentClass: "text-text/85" },
  { name: "Figma", Icon: SiFigma, accentClass: "text-fuchsia-400" }
];

export function TechnologiesSection() {
  return (
    <section className="shell pb-14 md:pb-20">
      <div>
        <p className="eyebrow inline-flex items-center gap-2">
          <FiCode aria-hidden className="h-3.5 w-3.5" />
          Tech stack
        </p>
        <h2 className="section-heading mt-4">
          <span className="text-accent">Technologies</span>{" "}
          <span className="text-text">I use</span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text/72 md:text-base">
          Front-end is my primary focus, but I work full stack across APIs, databases, and cloud delivery when
          products need end-to-end ownership.
        </p>

        <ul className="mt-9 grid grid-cols-3 gap-y-8 sm:grid-cols-4 md:grid-cols-6">
          {TECHNOLOGIES.map(({ name, Icon, accentClass }) => (
            <li className="group text-center" key={name}>
              <Icon className={`mx-auto h-12 w-12 transition duration-300 group-hover:scale-110 ${accentClass}`} />
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-text/74">{name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
