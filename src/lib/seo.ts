import type { Metadata } from "next";

import {
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_URL
} from "@/lib/constants";
import { PROFILE_NAME } from "@/lib/profile-content";
import type { BlogPostMeta, Project } from "@/lib/types";

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
};

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
  modifiedTime
}: MetadataInput): Metadata {
  const imageUrl = absoluteUrl(image);
  const resolvedKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords]));

  return {
    title,
    description,
    keywords: resolvedKeywords,
    alternates: {
      canonical: path
    },
    authors: [{ name: PROFILE_NAME, url: SITE_URL }],
    creator: PROFILE_NAME,
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
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
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
    image: absoluteUrl(project.coverImage),
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
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.coverImage ?? DEFAULT_OG_IMAGE_PATH),
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
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "en-US"
  };
}
