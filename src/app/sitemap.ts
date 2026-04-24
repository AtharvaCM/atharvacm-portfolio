import type { MetadataRoute } from "next";

import { getAllBlogPosts, getAllProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

const SAFE_IMAGE_EXT = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

function resolveImage(image?: string) {
  if (!image) {
    return undefined;
  }
  const lower = image.toLowerCase();
  if (!SAFE_IMAGE_EXT.some((ext) => lower.endsWith(ext))) {
    return undefined;
  }
  if (image.startsWith("http")) {
    return image;
  }
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/now", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getAllBlogPosts(), getAllProjects()]);

  const latestPostDate = posts.reduce<Date>((acc, post) => {
    const current = new Date(post.updatedAt ?? post.publishedAt);
    return current > acc ? current : acc;
  }, new Date(0));
  const latestProjectDate = projects.reduce<Date>((acc, project) => {
    const current = new Date(`${project.year}-01-01`);
    return current > acc ? current : acc;
  }, new Date(0));
  const homeLastMod =
    latestPostDate > latestProjectDate ? latestPostDate : latestProjectDate;
  const homeSafeDate = homeLastMod.getTime() > 0 ? homeLastMod : new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => {
    let lastModified: Date;
    if (page.path === "" || page.path === "/blog" || page.path === "/projects") {
      lastModified = homeSafeDate;
    } else {
      lastModified = new Date("2025-01-01T00:00:00.000Z");
    }

    return {
      url: `${SITE_URL}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority
    };
  });

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => {
    const image = resolveImage(project.coverImage);
    return {
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date(`${project.year}-01-01`),
      changeFrequency: "monthly",
      priority: 0.8,
      ...(image ? { images: [image] } : {})
    };
  });

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const image = resolveImage(post.coverImage);
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
      ...(image ? { images: [image] } : {})
    };
  });

  return [...staticPages, ...projectPages, ...postPages];
}
