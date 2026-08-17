import { afterEach, describe, expect, it, vi } from "vitest";

import type { BlogPostMeta } from "@/lib/types";

vi.mock("next/headers", () => ({
  draftMode: vi.fn(async () => ({ isEnabled: false })),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/lib/content", async () => {
  const actual = await vi.importActual<typeof import("@/lib/content")>(
    "@/lib/content"
  );
  return { ...actual, getAllBlogPosts: vi.fn() };
});

const { getAllBlogPosts } = await import("@/lib/content");
const { generateMetadata } = await import("./page");

function post(slug: string, tags: string[] = ["Git"]): BlogPostMeta {
  return {
    title: slug,
    slug,
    excerpt: "x",
    publishedAt: "2026-01-01T00:00:00.000Z",
    tags,
    featured: false,
    draft: false,
  };
}

// BLOG_PAGE_SIZE is 6, so seven posts give exactly two pages.
const sevenPosts = Array.from({ length: 7 }, (_, i) => post(`post-${i}`));

function metadataFor(searchParams: { tag?: string; page?: string }) {
  return generateMetadata({ searchParams: Promise.resolve(searchParams) });
}

describe("blog listing params", () => {
  afterEach(() => {
    vi.mocked(getAllBlogPosts).mockReset();
  });

  it("canonicalises the unfiltered listing to /blog", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(sevenPosts);

    const metadata = await metadataFor({});
    expect(metadata.alternates?.canonical).toBe("/blog");
  });

  it("keeps an in-range page as its own canonical", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(sevenPosts);

    const metadata = await metadataFor({ page: "2" });
    expect(metadata.alternates?.canonical).toBe("/blog?page=2");
    expect(metadata.title).toContain("Page 2");
  });

  it("404s past the last page instead of rendering an empty listing", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(sevenPosts);

    await expect(metadataFor({ page: "3" })).rejects.toThrow("NEXT_NOT_FOUND");
    await expect(metadataFor({ page: "500" })).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("404s on page values that are not positive integers", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(sevenPosts);

    for (const page of ["0", "-3", "abc", "1.5", "01"]) {
      await expect(metadataFor({ page })).rejects.toThrow("NEXT_NOT_FOUND");
    }
  });

  it("keeps a real tag as its own canonical", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(sevenPosts);

    const metadata = await metadataFor({ tag: "Git" });
    expect(metadata.alternates?.canonical).toBe("/blog?tag=Git");
  });

  it("404s on a tag no post carries", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue(sevenPosts);

    await expect(metadataFor({ tag: "not-a-real-tag" })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });

  it("404s past the last page of a filtered listing", async () => {
    vi.mocked(getAllBlogPosts).mockResolvedValue([
      ...sevenPosts,
      post("solo", ["Rare"]),
    ]);

    await expect(metadataFor({ tag: "Rare", page: "2" })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });
});
