import { afterEach, describe, expect, it, vi } from "vitest";

import { SITE_URL } from "@/lib/constants";
import type { BlogPostMeta, ProjectMeta } from "@/lib/types";

vi.mock("@/lib/content", () => ({
  getAllBlogPosts: vi.fn(),
  getAllProjects: vi.fn(),
}));

const { getAllBlogPosts, getAllProjects } = await import("@/lib/content");
const sitemap = (await import("./sitemap")).default;

const projects: ProjectMeta[] = [
  {
    title: "Alpha",
    slug: "alpha",
    excerpt: "x",
    context: "x",
    problem: "x",
    contribution: "x",
    impact: "x",
    metricHighlights: ["x"],
    coverImage: "/img.png",
    year: 2024,
    role: "r",
    services: ["s"],
    techStack: ["t"],
    category: "platform",
    outcomes: ["o"],
    featured: true,
  },
];

const posts: BlogPostMeta[] = [
  {
    title: "Post",
    slug: "post",
    excerpt: "x",
    publishedAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-02-15T00:00:00.000Z",
    tags: ["react"],
    featured: false,
    draft: false,
  },
];

describe("sitemap", () => {
  afterEach(() => {
    vi.mocked(getAllBlogPosts).mockReset();
    vi.mocked(getAllProjects).mockReset();
  });

  it("includes all static pages, projects, and posts", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(posts);
    vi.mocked(getAllProjects).mockResolvedValue(projects);

    const result = await sitemap();
    const urls = result.map((entry) => entry.url);

    expect(urls).toContain(`${SITE_URL}`);
    expect(urls).toContain(`${SITE_URL}/projects`);
    expect(urls).toContain(`${SITE_URL}/blog`);
    expect(urls).toContain(`${SITE_URL}/about`);
    expect(urls).toContain(`${SITE_URL}/contact`);
    expect(urls).toContain(`${SITE_URL}/now`);
    expect(urls).toContain(`${SITE_URL}/privacy`);
    expect(urls).toContain(`${SITE_URL}/terms`);
    expect(urls).toContain(`${SITE_URL}/projects/alpha`);
    expect(urls).toContain(`${SITE_URL}/blog/post`);
  });

  it("uses updatedAt for post lastModified when present", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(posts);
    vi.mocked(getAllProjects).mockResolvedValue([]);

    const result = await sitemap();
    const post = result.find((entry) => entry.url.endsWith("/blog/post"));
    expect(post?.lastModified).toEqual(new Date("2026-02-15T00:00:00.000Z"));
  });

  it("sets homepage priority to 1", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue([]);
    vi.mocked(getAllProjects).mockResolvedValue([]);

    const result = await sitemap();
    const root = result.find((entry) => entry.url === SITE_URL);
    expect(root?.priority).toBe(1);
  });

  it("emits images on entries whose coverImage is a safe raster", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue([
      {
        ...posts[0]!,
        slug: "with-image",
        coverImage: "/images/blog/cover.jpg",
      },
      {
        ...posts[0]!,
        slug: "no-image",
        coverImage: undefined,
      },
    ]);
    vi.mocked(getAllProjects).mockResolvedValue([
      { ...projects[0]!, slug: "svg-project", coverImage: "/i.svg" },
      { ...projects[0]!, slug: "png-project", coverImage: "/i.png" },
    ]);

    const result = await sitemap();
    const withImage = result.find((e) => e.url.endsWith("/blog/with-image"));
    const withoutImage = result.find((e) => e.url.endsWith("/blog/no-image"));
    const svgProject = result.find((e) => e.url.endsWith("/svg-project"));
    const pngProject = result.find((e) => e.url.endsWith("/png-project"));

    expect(withImage?.images).toEqual([
      `${SITE_URL}/images/blog/cover.jpg`,
    ]);
    expect(withoutImage?.images).toBeUndefined();
    expect(svgProject?.images).toBeUndefined();
    expect(pngProject?.images).toEqual([`${SITE_URL}/i.png`]);
  });

  it("returns only static pages when no content", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue([]);
    vi.mocked(getAllProjects).mockResolvedValue([]);

    const result = await sitemap();
    expect(result).toHaveLength(9);
  });
});
