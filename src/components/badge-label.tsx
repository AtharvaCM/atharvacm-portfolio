import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  FiActivity,
  FiBookOpen,
  FiBox,
  FiCode,
  FiEdit3,
  FiFileText,
  FiGitBranch,
  FiGrid,
  FiLayers,
  FiMonitor,
  FiMove,
  FiPenTool,
  FiRefreshCw,
  FiTag,
  FiTarget,
  FiTool,
  FiTrendingUp,
  FiUsers,
  FiZap
} from "react-icons/fi";
import {
  SiCommitlint,
  SiConventionalcommits,
  SiCss3,
  SiDocker,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiGoogleanalytics,
  SiGraphql,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSanity,
  SiSemanticrelease,
  SiSocketdotio,
  SiTypescript,
  SiVitest,
  SiWebflow,
  SiZod
} from "react-icons/si";

type BadgeIconDefinition = {
  color?: string;
  icon: IconType;
};

const ACCENT_COLOR = "hsl(var(--accent))";

const BADGE_ICONS: Record<string, BadgeIconDefinition> = {
  analytics: { icon: SiGoogleanalytics, color: "#E37400" },
  architecture: { icon: FiBox, color: ACCENT_COLOR },
  automation: { icon: FiRefreshCw, color: ACCENT_COLOR },
  blogging: { icon: FiBookOpen, color: ACCENT_COLOR },
  casestudies: { icon: FiFileText, color: ACCENT_COLOR },
  cicd: { icon: SiGithubactions, color: "#2088FF" },
  commitlint: { icon: SiCommitlint, color: "#F7B93E" },
  conventionalcommits: { icon: SiConventionalcommits, color: "#FE5196" },
  conversion: { icon: FiTrendingUp, color: ACCENT_COLOR },
  copywriting: { icon: FiEdit3, color: ACCENT_COLOR },
  css: { icon: SiCss3, color: "#1572B6" },
  designsystems: { icon: FiLayers, color: ACCENT_COLOR },
  devops: { icon: FiTool, color: ACCENT_COLOR },
  docker: { icon: SiDocker, color: "#2496ED" },
  framermotion: { icon: SiFramer, color: "#0055FF" },
  frontend: { icon: FiMonitor, color: ACCENT_COLOR },
  ga4: { icon: SiGoogleanalytics, color: "#E37400" },
  git: { icon: SiGit, color: "#F05032" },
  graphql: { icon: SiGraphql, color: "#E10098" },
  greensock: { icon: SiGreensock, color: "#88CE02" },
  gsap: { icon: SiGreensock, color: "#88CE02" },
  html: { icon: SiHtml5, color: "#E34F26" },
  isr: { icon: SiNextdotjs, color: "#111111" },
  javascript: { icon: SiJavascript, color: "#F7DF1E" },
  monorepos: { icon: FiGrid, color: ACCENT_COLOR },
  mongodb: { icon: SiMongodb, color: "#47A248" },
  motion: { icon: FiMove, color: ACCENT_COLOR },
  nextjs: { icon: SiNextdotjs, color: "#111111" },
  nodejs: { icon: SiNodedotjs, color: "#5FA04E" },
  performance: { icon: FiZap, color: ACCENT_COLOR },
  playwright: { icon: FiCode, color: "#2EAD33" },
  react: { icon: SiReact, color: "#61DAFB" },
  reduxtoolkit: { icon: SiRedux, color: "#764ABC" },
  redux: { icon: SiRedux, color: "#764ABC" },
  rtkquery: { icon: SiRedux, color: "#764ABC" },
  sanity: { icon: SiSanity, color: "#F03E2F" },
  semanticrelease: { icon: SiSemanticrelease, color: "#CB3837" },
  socketio: { icon: SiSocketdotio, color: "#010101" },
  strategy: { icon: FiTarget, color: ACCENT_COLOR },
  teamprocess: { icon: FiUsers, color: ACCENT_COLOR },
  testing: { icon: SiVitest, color: "#6E9F18" },
  typescript: { icon: SiTypescript, color: "#3178C6" },
  ux: { icon: FiPenTool, color: ACCENT_COLOR },
  webflow: { icon: SiWebflow, color: "#146EF5" },
  webvitals: { icon: FiActivity, color: ACCENT_COLOR },
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
