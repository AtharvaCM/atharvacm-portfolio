import { afterEach, describe, expect, it } from "vitest";

import type { BlogPostMeta, Project } from "@/lib/types";

import {
  absoluteUrl,
  buildMetadata,
  getArticleStructuredData,
  getBreadcrumbStructuredData,
  getCollectionPageStructuredData,
  getProfilePageStructuredData,
  getProjectStructuredData,
  getSiteStructuredData,
} from "./seo";

describe("absoluteUrl", () => {
  it("resolves relative paths against SITE_URL", () => {
    expect(absoluteUrl("/blog")).toMatch(/^https?:\/\/.+\/blog$/);
  });

  it("returns absolute URLs untouched", () => {
    expect(absoluteUrl("https://example.com/foo")).toBe(
      "https://example.com/foo"
    );
  });
});

describe("buildMetadata", () => {
  it("sets title, description, and canonical path", () => {
    const meta = buildMetadata({
      title: "Test",
      description: "Test description",
      path: "/test",
    });
    expect(meta.title).toBe("Test");
    expect(meta.description).toBe("Test description");
    expect(meta.alternates?.canonical).toBe("/test");
  });

  it("includes default keywords plus custom ones without duplicates", () => {
    const meta = buildMetadata({
      title: "x",
      description: "y",
      keywords: ["TypeScript", "Custom Keyword"],
    });
    const keywords = meta.keywords as string[];
    expect(keywords).toContain("Custom Keyword");
    expect(keywords).toContain("TypeScript");
    expect(keywords.filter((k) => k === "TypeScript")).toHaveLength(1);
  });

  it("builds OG images with alt text equal to title", () => {
    const meta = buildMetadata({ title: "My Title", description: "d" });
    const images = meta.openGraph?.images as Array<{ alt: string; url: string }>;
    expect(images?.[0]?.alt).toBe("My Title");
    expect(images?.[0]?.url).toMatch(/\/opengraph-image$/);
  });

  it("includes twitter summary_large_image card", () => {
    const meta = buildMetadata({ title: "t", description: "d" });
    const twitter = meta.twitter as { card: string } | null;
    expect(twitter?.card).toBe("summary_large_image");
  });

  it("passes publishedTime and modifiedTime to OpenGraph", () => {
    const meta = buildMetadata({
      title: "t",
      description: "d",
      type: "article",
      publishedTime: "2026-01-01T00:00:00.000Z",
      modifiedTime: "2026-02-01T00:00:00.000Z",
    });
    const og = meta.openGraph as {
      type: string;
      publishedTime: string;
      modifiedTime: string;
    };
    expect(og.type).toBe("article");
    expect(og.publishedTime).toBe("2026-01-01T00:00:00.000Z");
    expect(og.modifiedTime).toBe("2026-02-01T00:00:00.000Z");
  });
});

describe("getSiteStructuredData", () => {
  it("returns Person + WebSite graph", () => {
    const data = getSiteStructuredData();
    const types = data["@graph"].map((node) => node["@type"]);
    expect(types).toContain("WebSite");
    expect(types).toContain("Person");
  });
});

describe("getProjectStructuredData", () => {
  const project: Project = {
    title: "Vehicle Vault",
    slug: "vehicle-vault",
    excerpt: "excerpt",
    context: "ctx",
    problem: "prob",
    contribution: "contrib",
    impact: "impact",
    metricHighlights: ["h"],
    coverImage: "/images/projects/vv.png",
    year: 2024,
    role: "Lead Frontend",
    services: ["eng"],
    techStack: ["React", "Next.js"],
    category: "platform",
    outcomes: ["shipped"],
    featured: true,
    content: "body",
  };

  it("includes CreativeWork schema with project metadata", () => {
    const data = getProjectStructuredData(project);
    expect(data["@type"]).toBe("CreativeWork");
    expect(data.name).toBe("Vehicle Vault");
    expect(data.url).toMatch(/\/projects\/vehicle-vault$/);
    expect(data.keywords).toContain("React");
    expect(data.keywords).toContain("platform");
    expect(data.dateCreated).toBe("2024-01-01");
  });

  it("emits image as an ImageObject array with width/height", () => {
    const data = getProjectStructuredData(project);
    expect(Array.isArray(data.image)).toBe(true);
    expect(data.image[0]).toMatchObject({
      "@type": "ImageObject",
      width: 1200,
      height: 630,
    });
  });

  it("falls back to default OG image when coverImage is an SVG", () => {
    const data = getProjectStructuredData({
      ...project,
      coverImage: "/images/projects/vv.svg",
    });
    expect(data.image[0]?.url).toMatch(/\/opengraph-image$/);
  });
});

describe("getArticleStructuredData", () => {
  const post: BlogPostMeta = {
    title: "Hello",
    slug: "hello",
    excerpt: "x",
    publishedAt: "2026-01-01T00:00:00.000Z",
    tags: ["react", "next"],
    featured: false,
    draft: false,
  };

  it("includes BlogPosting schema", () => {
    const data = getArticleStructuredData(post);
    expect(data["@type"]).toBe("BlogPosting");
    expect(data.headline).toBe("Hello");
    expect(data.url).toMatch(/\/blog\/hello$/);
    expect(data.datePublished).toBe("2026-01-01T00:00:00.000Z");
    expect(data.dateModified).toBe("2026-01-01T00:00:00.000Z");
  });

  it("uses updatedAt for dateModified when present", () => {
    const data = getArticleStructuredData({
      ...post,
      updatedAt: "2026-02-01T00:00:00.000Z",
    });
    expect(data.dateModified).toBe("2026-02-01T00:00:00.000Z");
  });

  it("emits image as ImageObject array with dimensions", () => {
    const data = getArticleStructuredData(post);
    expect(Array.isArray(data.image)).toBe(true);
    expect(data.image[0]).toMatchObject({
      "@type": "ImageObject",
      width: 1200,
      height: 630,
    });
  });

  it("uses mainEntityOfPage as a WebPage object keyed by article url", () => {
    const data = getArticleStructuredData(post);
    expect(data.mainEntityOfPage).toMatchObject({
      "@type": "WebPage",
    });
    expect((data.mainEntityOfPage as { "@id": string })["@id"]).toMatch(
      /\/blog\/hello$/
    );
  });
});

describe("getBreadcrumbStructuredData", () => {
  it("returns positioned BreadcrumbList items", () => {
    const data = getBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "Post", path: "/blog/post" },
    ]);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement).toHaveLength(3);
    expect(data.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Home",
    });
    expect(data.itemListElement[2]!.item).toMatch(/\/blog\/post$/);
  });
});

describe("getProfilePageStructuredData", () => {
  it("returns a ProfilePage with a Person mainEntity", () => {
    const data = getProfilePageStructuredData({
      description: "About Atharva.",
      path: "/about",
    });
    expect(data["@type"]).toBe("ProfilePage");
    expect(data.url).toMatch(/\/about$/);
    expect((data.mainEntity as { "@type": string })["@type"]).toBe("Person");
  });
});

describe("getCollectionPageStructuredData", () => {
  it("emits ItemList with 1-indexed positions", () => {
    const data = getCollectionPageStructuredData({
      name: "Blog",
      description: "Writing.",
      path: "/blog",
      items: [
        { name: "Post A", path: "/blog/a" },
        { name: "Post B", path: "/blog/b" },
      ],
    });
    expect(data["@type"]).toBe("CollectionPage");
    const list = data.mainEntity as {
      itemListElement: Array<{ position: number; url: string; name: string }>;
    };
    expect(list.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Post A",
    });
    expect(list.itemListElement[1]?.url).toMatch(/\/blog\/b$/);
  });
});

describe("buildMetadata dynamic OG routes", () => {
  it("passes through /opengraph-image paths without fallback", () => {
    const meta = buildMetadata({
      title: "t",
      description: "d",
      image: "/blog/my-post/opengraph-image",
    });
    const images = meta.openGraph?.images as Array<{ url: string }>;
    expect(images?.[0]?.url).toMatch(/\/blog\/my-post\/opengraph-image$/);
  });
});

describe("getRootVerification", () => {
  const ORIGINAL = { ...process.env };

  afterEach(() => {
    process.env = { ...ORIGINAL };
  });

  it("returns undefined when no verification env vars are set", async () => {
    delete process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
    delete process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
    delete process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
    const { getRootVerification } = await import("./seo");
    expect(getRootVerification()).toBeUndefined();
  });

  it("emits google + bing (as msvalidate.01 other) + yandex when present", async () => {
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION = "g-code";
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION = "b-code";
    process.env.NEXT_PUBLIC_YANDEX_VERIFICATION = "y-code";
    const { getRootVerification } = await import("./seo");
    const result = getRootVerification() as {
      google?: string;
      yandex?: string;
      other?: Record<string, string>;
    };
    expect(result.google).toBe("g-code");
    expect(result.yandex).toBe("y-code");
    expect(result.other?.["msvalidate.01"]).toBe("b-code");
  });
});

describe("buildMetadata indexing", () => {
  it("sets full googleBot directives by default", () => {
    const meta = buildMetadata({ title: "t", description: "d" });
    const robots = meta.robots as {
      index: boolean;
      follow: boolean;
      googleBot: { "max-image-preview": string };
    };
    expect(robots.index).toBe(true);
    expect(robots.googleBot["max-image-preview"]).toBe("large");
  });

  it("emits noindex when noIndex is true", () => {
    const meta = buildMetadata({
      title: "t",
      description: "d",
      noIndex: true,
    });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("exposes the RSS feed via alternates.types", () => {
    const meta = buildMetadata({ title: "t", description: "d" });
    const types = meta.alternates?.types as Record<
      string,
      Array<{ url: string; title: string }>
    >;
    expect(types["application/rss+xml"]?.[0]?.url).toMatch(/\/rss\.xml$/);
  });
});
