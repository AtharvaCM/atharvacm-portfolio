import { afterEach, describe, expect, it, vi } from "vitest";

import type { ProjectCategory, ProjectMeta } from "@/lib/types";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/lib/content", async () => {
  const actual = await vi.importActual<typeof import("@/lib/content")>(
    "@/lib/content"
  );
  return { ...actual, getAllProjects: vi.fn() };
});

const { getAllProjects } = await import("@/lib/content");
const { generateMetadata } = await import("./page");

function project(slug: string, category: ProjectCategory): ProjectMeta {
  return {
    title: slug,
    slug,
    excerpt: "x",
    context: "x",
    problem: "x",
    contribution: "x",
    impact: "x",
    metricHighlights: ["x"],
    coverImage: "/images/x.png",
    year: 2026,
    role: "x",
    services: ["x"],
    techStack: ["x"],
    category,
    outcomes: ["x"],
    featured: false,
  };
}

// Only these two categories are carried by a project; the rest of
// PROJECT_CATEGORIES is a valid enum value with nothing behind it.
const projects = [
  project("a", "platform"),
  project("b", "performance"),
];

function metadataFor(searchParams: { category?: string }) {
  return generateMetadata({ searchParams: Promise.resolve(searchParams) });
}

describe("projects listing params", () => {
  afterEach(() => {
    vi.mocked(getAllProjects).mockReset();
  });

  it("canonicalises the unfiltered listing to /projects", async () => {
    vi.mocked(getAllProjects).mockResolvedValue(projects);

    const metadata = await metadataFor({});
    expect(metadata.alternates?.canonical).toBe("/projects");
  });

  it("keeps a category a project carries as its own canonical", async () => {
    vi.mocked(getAllProjects).mockResolvedValue(projects);

    const metadata = await metadataFor({ category: "platform" });
    expect(metadata.alternates?.canonical).toBe("/projects?category=platform");
    expect(metadata.title).toContain("Platform");
  });

  it("404s on a category no project carries", async () => {
    vi.mocked(getAllProjects).mockResolvedValue(projects);

    await expect(metadataFor({ category: "frontend" })).rejects.toThrow(
      "NEXT_NOT_FOUND"
    );
  });

  it("404s on a category that is not a category at all", async () => {
    vi.mocked(getAllProjects).mockResolvedValue(projects);

    for (const category of ["bogus", "Platform", "", " ", "../etc"]) {
      if (category === "") {
        // An empty value is the unfiltered listing, not a filter.
        await expect(metadataFor({ category })).resolves.toBeTruthy();
        continue;
      }
      await expect(metadataFor({ category })).rejects.toThrow("NEXT_NOT_FOUND");
    }
  });
});
