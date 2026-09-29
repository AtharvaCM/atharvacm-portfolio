import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBarChart2,
  FiBookOpen,
  FiBox,
  FiCode,
  FiCommand,
  FiCompass,
  FiCpu,
  FiDroplet,
  FiEdit3,
  FiFileText,
  FiGitBranch,
  FiGitCommit,
  FiGrid,
  FiHeadphones,
  FiImage,
  FiLayers,
  FiLayout,
  FiLock,
  FiMonitor,
  FiMove,
  FiPackage,
  FiPenTool,
  FiRefreshCw,
  FiSliders,
  FiTag,
  FiTarget,
  FiTerminal,
  FiTool,
  FiTrendingUp,
  FiUsers,
  FiZap
} from "react-icons/fi";
import {
  SiAmazonwebservices,
  SiApple,
  SiClaude,
  SiCommitlint,
  SiConventionalcommits,
  SiCss3,
  SiDocker,
  SiExpo,
  SiFfmpeg,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGoogleanalytics,
  SiGraphql,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiMidi,
  SiMongodb,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNx,
  SiObsidian,
  SiPostgresql,
  SiPrisma,
  SiPwa,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSanity,
  SiSemanticrelease,
  SiSocketdotio,
  SiSupabase,
  SiSwift,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVite,
  SiVitest,
  SiWebflow,
  SiZod
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

type BadgeIconDefinition = {
  color?: string;
  icon: IconType;
};

const ACCENT_COLOR = "hsl(var(--accent))";
// Black-on-white brand marks vanish on the dark chips, so they render in text colour.
const INK_COLOR = "hsl(var(--text) / 0.85)";

const BADGE_ICONS: Record<string, BadgeIconDefinition> = {
  aiagents: { icon: FiCpu, color: ACCENT_COLOR },
  analytics: { icon: SiGoogleanalytics, color: "#E37400" },
  architecture: { icon: FiBox, color: ACCENT_COLOR },
  authentication: { icon: FiLock, color: ACCENT_COLOR },
  automation: { icon: FiRefreshCw, color: ACCENT_COLOR },
  avfoundation: { icon: SiApple, color: INK_COLOR },
  awscloudfoundations: { icon: SiAmazonwebservices, color: "#FF9900" },
  blogging: { icon: FiBookOpen, color: ACCENT_COLOR },
  canvas2d: { icon: FiImage, color: ACCENT_COLOR },
  casestudies: { icon: FiFileText, color: ACCENT_COLOR },
  cicd: { icon: SiGithubactions, color: "#2088FF" },
  claudecode: { icon: SiClaude, color: "#D97757" },
  commitlint: { icon: SiCommitlint, color: "#F7B93E" },
  conventionalcommits: { icon: SiConventionalcommits, color: "#FE5196" },
  conversion: { icon: FiTrendingUp, color: ACCENT_COLOR },
  copywriting: { icon: FiEdit3, color: ACCENT_COLOR },
  coremidi: { icon: SiApple, color: INK_COLOR },
  css: { icon: SiCss3, color: "#1572B6" },
  demucs: { icon: FiSliders, color: ACCENT_COLOR },
  designsystems: { icon: FiLayers, color: ACCENT_COLOR },
  developerexperience: { icon: FiCommand, color: ACCENT_COLOR },
  developerworkflow: { icon: FiTerminal, color: ACCENT_COLOR },
  devops: { icon: FiTool, color: ACCENT_COLOR },
  docker: { icon: SiDocker, color: "#2496ED" },
  dynamicimports: { icon: FiPackage, color: ACCENT_COLOR },
  expo: { icon: SiExpo, color: INK_COLOR },
  ffmpeg: { icon: SiFfmpeg, color: "#007808" },
  framermotion: { icon: SiFramer, color: "#0055FF" },
  frontend: { icon: FiMonitor, color: ACCENT_COLOR },
  ga4: { icon: SiGoogleanalytics, color: "#E37400" },
  git: { icon: SiGit, color: "#F05032" },
  github: { icon: SiGithub, color: INK_COLOR },
  graphql: { icon: SiGraphql, color: "#E10098" },
  greensock: { icon: SiGreensock, color: "#88CE02" },
  gsap: { icon: SiGreensock, color: "#88CE02" },
  html: { icon: SiHtml5, color: "#E34F26" },
  isr: { icon: SiNextdotjs, color: INK_COLOR },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  jsonlogic: { icon: SiJson, color: INK_COLOR },
  microsoftazurefundamentals: { icon: VscAzure, color: "#0078D4" },
  monorepo: { icon: FiGrid, color: ACCENT_COLOR },
  monorepos: { icon: FiGrid, color: ACCENT_COLOR },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  motion: { icon: FiMove, color: ACCENT_COLOR },
  nestjs: { icon: SiNestjs, color: "#E0234E" },
  netlifyfunctions: { icon: SiNetlify, color: "#00C7B7" },
  nextjs: { icon: SiNextdotjs, color: INK_COLOR },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  nxmonorepos: { icon: SiNx, color: INK_COLOR },
  obsidian: { icon: SiObsidian, color: "#7C3AED" },
  performance: { icon: FiZap, color: ACCENT_COLOR },
  performanceoptimization: { icon: FiZap, color: ACCENT_COLOR },
  playwright: { icon: FiCode, color: "#2EAD33" },
  postgres: { icon: SiPostgresql, color: "#4169E1" },
  postgresql: { icon: SiPostgresql, color: "#4169E1" },
  prisma: { icon: SiPrisma, color: INK_COLOR },
  python: { icon: SiPython, color: "#3776AB" },
  react: { icon: SiReact, color: "#61DAFB" },
  react19: { icon: SiReact, color: "#61DAFB" },
  reactnative: { icon: SiReact, color: "#61DAFB" },
  reactservercomponents: { icon: SiReact, color: "#61DAFB" },
  recharts: { icon: FiBarChart2, color: ACCENT_COLOR },
  reduxtoolkit: { icon: SiRedux, color: "#764ABC" },
  redux: { icon: SiRedux, color: "#764ABC" },
  rtkquery: { icon: SiRedux, color: "#764ABC" },
  sanity: { icon: SiSanity, color: "#F03E2F" },
  schemadrivenui: { icon: FiLayout, color: ACCENT_COLOR },
  semanticrelease: { icon: SiSemanticrelease, color: "#CB3837" },
  socketio: { icon: SiSocketdotio, color: INK_COLOR },
  strategy: { icon: FiTarget, color: ACCENT_COLOR },
  stylex: { icon: FiDroplet, color: ACCENT_COLOR },
  supabase: { icon: SiSupabase, color: "#3FCF8E" },
  supabasestorage: { icon: SiSupabase, color: "#3FCF8E" },
  swift: { icon: SiSwift, color: "#F05138" },
  tailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
  tanstackquery: { icon: SiReactquery, color: "#FF4154" },
  tanstackrouter: { icon: FiCompass, color: ACCENT_COLOR },
  teamprocess: { icon: FiUsers, color: ACCENT_COLOR },
  testing: { icon: SiVitest, color: "#6E9F18" },
  turborepo: { icon: SiTurborepo, color: "#EF4444" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  ux: { icon: FiPenTool, color: ACCENT_COLOR },
  versioncontrol: { icon: FiGitCommit, color: ACCENT_COLOR },
  vite: { icon: SiVite, color: "#646CFF" },
  vitest: { icon: SiVitest, color: "#6E9F18" },
  webaudioapi: { icon: FiHeadphones, color: ACCENT_COLOR },
  webflow: { icon: SiWebflow, color: "#146EF5" },
  webmidiapi: { icon: SiMidi, color: INK_COLOR },
  webvitals: { icon: FiActivity, color: ACCENT_COLOR },
  workbox: { icon: SiPwa, color: "#5A0FC8" },
  workflow: { icon: FiGitBranch, color: ACCENT_COLOR },
  zod: { icon: SiZod, color: "#3068B7" }
};

function normalizeBadgeLabel(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function BadgeLabel({
  label,
  className = ""
}: {
  label: string;
  className?: string;
}) {
  const match = BADGE_ICONS[normalizeBadgeLabel(label)];
  const Icon = match?.icon ?? FiTag;
  const iconStyle = match?.color
    ? ({ color: match.color } as CSSProperties)
    : ({ color: "hsl(var(--text) / 0.5)" } as CSSProperties);
  const classes = ["inline-flex items-center gap-1.5", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <Icon
        aria-hidden
        className="h-3.5 w-3.5 shrink-0"
        style={iconStyle}
      />
      <span>{label}</span>
    </span>
  );
}
