import type { Metadata } from "next";

import {
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_URL
} from "@/lib/constants";
import { PROFILE_NAME } from "@/lib/profile-content";
import type { BlogPostMeta, Project } from "@/lib/types";

const TWITTER_HANDLE = process.env.NEXT_PUBLIC_X_HANDLE;

function getVerificationMeta(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;

  if (!google && !bing && !yandex) {
    return undefined;
  }

  const other: Record<string, string> = {};
  if (bing) {
    other["msvalidate.01"] = bing;
  }

  return {
    google,
    yandex,
    ...(Object.keys(other).length > 0 ? { other } : {})
  };
}

export function getRootVerification() {
  return getVerificationMeta();
}

export const HOME_TITLE = `${SITE_NAME} | Senior Frontend Engineer`;
export const HOME_DESCRIPTION =
  "Senior frontend-focused full-stack engineer building scalable React, Next.js, and TypeScript systems. Experienced in frontend architecture, performance optimization, and production-grade applications.";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

const DEFAULT_KEYWORDS = [
  "Senior Frontend Engineer",
  "Frontend Developer",
  "Full-Stack Engineer",
  "React Developer",
  "Next.js Developer",
  "TypeScript",
  "Frontend Architecture",
  "Scalable Web Applications",
  "Performance Optimization",
  "GraphQL",
  "Monorepo",
  "Production Systems"
];

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

const SAFE_OG_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
const DYNAMIC_OG_ROUTE_SUFFIXES = ["/opengraph-image", "/twitter-image"];

function pickSafeOgImage(candidate: string) {
  const lower = candidate.toLowerCase();
  if (DYNAMIC_OG_ROUTE_SUFFIXES.some((suffix) => lower.endsWith(suffix))) {
    return candidate;
  }
  const isSafe = SAFE_OG_IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
  return isSafe ? candidate : DEFAULT_OG_IMAGE_PATH;
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE_PATH,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false
}: MetadataInput): Metadata {
  const safeImage = pickSafeOgImage(image);
  const imageUrl = absoluteUrl(safeImage);
  const resolvedKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords]));

  return {
    title,
    description,
    keywords: resolvedKeywords,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": [
          { url: absoluteUrl("/rss.xml"), title: `${SITE_NAME} blog feed` }
        ]
      }
    },
    authors: [{ name: PROFILE_NAME, url: SITE_URL }],
    creator: PROFILE_NAME,
    publisher: PROFILE_NAME,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      publishedTime,
      modifiedTime,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE
    }
  };
}

export function getProfilePageStructuredData({
  description,
  path
}: {
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    name: `About ${PROFILE_NAME}`,
    description,
    mainEntity: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: SITE_URL,
      jobTitle: "Senior Frontend Engineer",
      sameAs: [LINKEDIN_URL, GITHUB_URL].filter(
        (value): value is string => Boolean(value)
      )
    }
  };
}

export function getCollectionPageStructuredData({
  name,
  description,
  path,
  items
}: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path)
      }))
    }
  };
}

export function getBreadcrumbStructuredData(
  trail: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path)
    }))
  };
}

export function getSiteStructuredData() {
  const sameAs = [LINKEDIN_URL, GITHUB_URL].filter(
    (value): value is string => Boolean(value)
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        inLanguage: "en-US"
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}#person`,
        name: PROFILE_NAME,
        url: SITE_URL,
        jobTitle: "Senior Frontend Engineer",
        description: HOME_DESCRIPTION,
        sameAs,
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Frontend Architecture",
          "Performance Optimization",
          "GraphQL",
          "Monorepo",
          "Production Systems"
        ],
        worksFor: {
          "@type": "Organization",
          name: "Sprih"
        }
      }
    ]
  };
}

export function getProjectStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: [
      {
        "@type": "ImageObject",
        url: absoluteUrl(pickSafeOgImage(project.coverImage)),
        width: 1200,
        height: 630
      }
    ],
    creator: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: SITE_URL
    },
    author: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: SITE_URL
    },
    dateCreated: `${project.year}-01-01`,
    inLanguage: "en-US",
    keywords: [
      ...project.techStack,
      project.category,
      "Frontend Architecture",
      "Scalable Web Applications",
      "Production Systems"
    ],
    about: [
      project.context,
      project.problem,
      project.impact
    ]
  };
}

export function getArticleStructuredData(post: BlogPostMeta) {
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const imageSource = post.coverImage ?? DEFAULT_OG_IMAGE_PATH;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    image: [
      {
        "@type": "ImageObject",
        url: absoluteUrl(pickSafeOgImage(imageSource)),
        width: 1200,
        height: 630
      }
    ],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: SITE_URL
    },
    publisher: {
      "@type": "Person",
      name: PROFILE_NAME,
      url: SITE_URL
    },
    keywords: post.tags,
    articleSection: post.tags[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl
    },
    inLanguage: "en-US"
  };
}
