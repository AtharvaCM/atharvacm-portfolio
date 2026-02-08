import type { MetadataRoute } from "next";

import { getAllBlogPosts, getAllProjects } from "@/lib/content";
import { SITE_URL } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getAllBlogPosts(), getAllProjects()]);

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/resume",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(`${project.year}-01-01`),
    changeFrequency: "monthly",
    priority: 0.8
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticPages, ...projectPages, ...postPages];
}
