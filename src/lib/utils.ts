import clsx, { type ClassValue } from "clsx";

const PLACEHOLDER_HOSTS = new Set(["example.com", "www.example.com"]);
const ROOT_PROFILE_HOSTS = new Set([
  "github.com",
  "www.github.com",
  "linkedin.com",
  "www.linkedin.com",
  "x.com",
  "twitter.com",
  "www.twitter.com"
]);

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

export function slugifyTag(tag: string) {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function getMeaningfulExternalUrl(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed === "#") {
    return undefined;
  }

  try {
    const url = new URL(trimmed);

    if (!["http:", "https:"].includes(url.protocol)) {
      return undefined;
    }

    const hostname = url.hostname.toLowerCase();
    const pathname = url.pathname.replace(/\/+$/, "") || "/";

    if (PLACEHOLDER_HOSTS.has(hostname)) {
      return undefined;
    }

    if (ROOT_PROFILE_HOSTS.has(hostname) && pathname === "/") {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}

export function getMeaningfulEmail(value?: string | null) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed || !trimmed.includes("@")) {
    return undefined;
  }

  const [, domain = ""] = trimmed.split("@");

  if (domain.toLowerCase() === "example.com") {
    return undefined;
  }

  return trimmed;
}

export function getMailtoHref(value?: string | null) {
  const email = getMeaningfulEmail(value);
  return email ? `mailto:${email}` : undefined;
}
