import {
  buildBlogDraftSource,
  buildPublishedBlogSource,
  getBlogSection,
  reviewBlogSource,
  rewriteBlogSectionSource,
  slugifyTitle
} from "@/lib/blog-authoring";

describe("blog authoring helpers", () => {
  it("slugifies titles into file-safe slugs", () => {
    expect(slugifyTitle("A Practical Guide to Next.js Performance")).toBe("a-practical-guide-to-next-js-performance");
  });

  it("creates drafts with draft: true", () => {
    const source = buildBlogDraftSource({
      title: "Draft Post",
      tags: ["Next.js", "Performance"]
    });

    expect(source).toContain("draft: true");
    expect(source).toContain("slug: draft-post");
  });

  it("publishes a draft and stamps updatedAt", () => {
    const source = `---
title: "Draft Post"
slug: draft-post
excerpt: "Example"
publishedAt: 2026-03-29T00:00:00.000Z
tags:
  - Next.js
featured: false
draft: true
---

Body copy for the article.`;

    const result = buildPublishedBlogSource(source, {
      updatedAt: "2026-03-30T00:00:00.000Z",
      featured: true
    });

    expect(result.source).toContain("draft: false");
    expect(result.source).toContain("featured: true");
    expect(result.source).toContain("updatedAt: '2026-03-30T00:00:00.000Z'");
    expect(result.post.draft).toBe(false);
    expect(result.post.featured).toBe(true);
  });

  it("reviews a stub article as not publish-ready", () => {
    const review = reviewBlogSource(`---
title: "Stub Post"
slug: stub-post
excerpt: "Short example"
publishedAt: 2026-03-29T00:00:00.000Z
tags:
  - Next.js
featured: false
draft: true
---

Very short body.`);

    expect(review.slug).toBe("stub-post");
    expect(review.score).toBeLessThan(80);
    expect(review.checks.some((check) => check.name === "Length" && check.status === "fail")).toBe(true);
  });

  it("extracts and rewrites a named section", () => {
    const source = `---
title: "Section Post"
slug: section-post
excerpt: "Example"
publishedAt: 2026-03-29T00:00:00.000Z
tags:
  - Next.js
featured: false
draft: true
---

Intro line.

## Why this matters
Old body.

## What to do
Another section.`;

    const section = getBlogSection(source, "Why this matters");
    expect(section?.heading).toBe("Why this matters");
    expect(section?.body).toContain("Old body.");

    const rewritten = rewriteBlogSectionSource(source, "Why this matters", "New body.\n\n- Better point");
    expect(rewritten).toContain("## Why this matters\nNew body.");
    expect(rewritten).toContain("- Better point");
    expect(rewritten).toContain("## What to do");
  });
});
