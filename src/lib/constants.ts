export const SITE_NAME = "Atharva CM";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
] as const;

export const PROJECT_CATEGORIES = ["web", "mobile", "ai", "branding", "other"] as const;

export const OPPORTUNITY_TYPES = [
  "Full-time product engineer role",
  "Senior front-end engineer role",
  "UI engineer role",
  "Platform/front-end architecture role",
  "Speaking/collaboration invite",
  "General networking"
] as const;

export const COMPANY_CONTEXTS = [
  "Startup (0-50)",
  "Growth stage (50-500)",
  "Enterprise (500+)",
  "Agency/consultancy",
  "Individual outreach"
] as const;

export const CONNECT_TIMELINES = ["ASAP", "This month", "Next quarter", "Future pipeline", "Flexible"] as const;

export const BLOG_PAGE_SIZE = 6;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "X", href: "https://x.com/" }
] as const;
