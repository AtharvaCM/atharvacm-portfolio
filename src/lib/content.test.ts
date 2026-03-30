import {
  filterPostsByTag,
  filterProjects,
  getAllTags,
  isPublishedBlogPost,
  paginatePosts,
  parseBlogMdx,
  parseProjectMdx
} from "@/lib/content";

const validProjectMdx = `---
title: Test Project
slug: test-project
excerpt: Short summary
context: Test context
problem: Test problem
contribution: Test contribution
impact: Test impact
metricHighlights:
  - Test metric
coverImage: /images/projects/test.svg
year: 2025
role: Lead Engineer
services:
  - Design
techStack:
  - Next.js
category: platform
outcomes:
  - Better conversion
featured: true
---

# Content`;

const validBlogMdx = `---
title: Test Post
slug: test-post
excerpt: Example
publishedAt: 2025-01-01T00:00:00.000Z
tags:
  - Next.js
featured: false
draft: true
---

One two three four five six seven eight nine ten.`;

describe("content parsing", () => {
  it("parses valid project frontmatter", () => {
    const parsed = parseProjectMdx(validProjectMdx);
    expect(parsed.slug).toBe("test-project");
    expect(parsed.featured).toBe(true);
  });

  it("throws on invalid project frontmatter", () => {
    expect(() =>
      parseProjectMdx(`---\ntitle: Broken\nslug: broken\nyear: 2025\nfeatured: true\n---\ntext`)
    ).toThrow();
  });

  it("parses blog frontmatter and computes reading time", () => {
    const parsed = parseBlogMdx(validBlogMdx);
    expect(parsed.slug).toBe("test-post");
    expect(parsed.readingTime).toBeGreaterThanOrEqual(1);
    expect(parsed.draft).toBe(true);
  });

  it("treats draft and future posts as unpublished", () => {
    expect(
      isPublishedBlogPost({
        draft: true,
        publishedAt: "2025-01-01T00:00:00.000Z"
      })
    ).toBe(false);

    expect(
      isPublishedBlogPost(
        {
          draft: false,
          publishedAt: "2099-01-01T00:00:00.000Z"
        },
        new Date("2025-01-01T00:00:00.000Z")
      )
    ).toBe(false);
  });
});

describe("project filters", () => {
  const projects = [
    {
      title: "A",
      slug: "a",
      excerpt: "a",
      context: "context",
      problem: "problem",
      contribution: "contribution",
      impact: "impact",
      metricHighlights: ["metric"],
      coverImage: "x",
      year: 2025,
      role: "role",
      services: ["service"],
      techStack: ["Next.js"],
      category: "platform" as const,
      outcomes: ["outcome"],
      featured: true
    },
    {
      title: "B",
      slug: "b",
      excerpt: "b",
      context: "context",
      problem: "problem",
      contribution: "contribution",
      impact: "impact",
      metricHighlights: ["metric"],
      coverImage: "x",
      year: 2024,
      role: "role",
      services: ["service"],
      techStack: ["React Native"],
      category: "full-stack" as const,
      outcomes: ["outcome"],
      featured: false
    }
  ];

  it("filters by category", () => {
    expect(filterProjects(projects, "platform", undefined)).toHaveLength(1);
  });

  it("filters by tech case-insensitively", () => {
    expect(filterProjects(projects, undefined, "next.js")).toHaveLength(1);
  });
});

describe("blog discovery", () => {
  const posts = [
    {
      title: "A",
      slug: "a",
      excerpt: "a",
      publishedAt: "2025-01-01T00:00:00.000Z",
      tags: ["Next.js", "Performance"],
      featured: true,
      readingTime: 3,
      draft: false
    },
    {
      title: "B",
      slug: "b",
      excerpt: "b",
      publishedAt: "2025-01-02T00:00:00.000Z",
      tags: ["UX"],
      featured: false,
      readingTime: 2,
      draft: false
    }
  ];

  it("collects unique tags", () => {
    expect(getAllTags(posts)).toEqual(["Next.js", "Performance", "UX"]);
  });

  it("filters posts by tag", () => {
    expect(filterPostsByTag(posts, "UX")).toHaveLength(1);
  });

  it("paginates posts", () => {
    const paginated = paginatePosts(posts, 1);
    expect(paginated.currentPage).toBe(1);
    expect(paginated.posts).toHaveLength(2);
    expect(paginated.totalPages).toBe(1);
  });
});
