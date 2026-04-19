import { getMeaningfulExternalUrl } from "./utils";
import { PROFILE_NAME } from "./profile-content";

export const SITE_NAME = PROFILE_NAME;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atharvacm.dev";
const DEFAULT_RESUME_URL = "/files/atharva-mahamuni-resume.pdf";
const configuredResumeUrl = getMeaningfulExternalUrl(process.env.NEXT_PUBLIC_RESUME_URL);
export const RESUME_URL =
  configuredResumeUrl?.endsWith("/resume.pdf")
    ? DEFAULT_RESUME_URL
    : configuredResumeUrl ?? DEFAULT_RESUME_URL;
export const LINKEDIN_URL = getMeaningfulExternalUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL);
export const GITHUB_URL = getMeaningfulExternalUrl(process.env.NEXT_PUBLIC_GITHUB_URL);

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const PROJECT_CATEGORIES = ["platform", "frontend", "full-stack", "performance", "other"] as const;

export const PROJECT_CATEGORY_LABELS = {
  platform: "Platform",
  frontend: "Frontend",
  "full-stack": "Full-Stack",
  performance: "Performance",
  other: "Other"
} as const;

export const BLOG_PAGE_SIZE = 6;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "X", href: getMeaningfulExternalUrl(process.env.NEXT_PUBLIC_X_URL) }
].filter((item): item is { label: string; href: string } => Boolean(item.href));
