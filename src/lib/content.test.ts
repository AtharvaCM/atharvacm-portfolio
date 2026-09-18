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

const blogFrontmatter = `---
title: Test Post
slug: test-post
excerpt: Example
publishedAt: 2025-01-01T00:00:00.000Z
tags:
  - Next.js
featured: false
draft: true
---`;

const validBlogMdx = `${blogFrontmatter}

One two three four five six seven eight nine ten.`;

const words = (count: number) => Array.from({ length: count }, () => "word").join(" ");
const readingTimeOf = (body: string) => parseBlogMdx(`${blogFrontmatter}\n\n${body}`).readingTime;

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

describe("reading time", () => {
  it("reads 200 prose words per minute", () => {
    expect(readingTimeOf(words(200))).toBe(1);
    expect(readingTimeOf(words(201))).toBe(2);
  });

  it("ignores JSX elements, their attributes, and MDX comments", () => {
    const figure = `<figure style={{ margin: "2rem 0", border: "1px solid rgba(255,255,255,0.08)" }}>
  <picture>
    <source media="(max-width: 540px)" srcSet="/images/blog/diagram_mobile.svg" />
    <img alt="A long description of the diagram for screen readers" src="/images/blog/diagram.svg" style={{ width: "100%", height: "auto" }} />
  </picture>
</figure>

{/* TODO: redraw this diagram */}`;

    expect(readingTimeOf(`${words(100)}\n\n${figure}\n\n${words(100)}`)).toBe(1);
  });

  it("counts the text inside elements but not the tags", () => {
    const details = "<details>\n\n<summary>What shows</summary>\n\n</details>";

    expect(readingTimeOf(`${words(198)}\n\n${details}`)).toBe(1);
    expect(readingTimeOf(`${words(199)}\n\n${details}`)).toBe(2);
  });

  it("counts fenced code at half weight", () => {
    const codeBlock = (count: number) => `\`\`\`console\n${words(count)}\n\`\`\``;

    expect(readingTimeOf(`${words(100)}\n\n${codeBlock(200)}`)).toBe(1);
    expect(readingTimeOf(`${words(100)}\n\n${codeBlock(202)}`)).toBe(2);
  });

  it("counts the words in markdown but not its syntax", () => {
    const body = [
      `## ${words(10)}`,
      `- ${words(10)}`,
      `1. ${words(10)}`,
      `> ${words(10)}`,
      `| ${words(5)} | ${words(5)} |`,
      "|---|---|",
      `[${words(10)}](https://example.com/a/long/path "Link title")`,
      "![Alt text that is not prose](/images/blog/cover.png)",
      "[ref]: https://example.com/reference",
      `${words(139)} — \`<Button>\``
    ].join("\n\n");

    expect(readingTimeOf(body)).toBe(1);
    expect(readingTimeOf(`${body} word`)).toBe(2);
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
