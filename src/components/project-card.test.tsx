import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { ProjectMeta } from "@/lib/types";

import { ProjectCard } from "./project-card";

vi.mock("@/lib/gtm-events", () => ({
  trackEvent: vi.fn(),
}));

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={typeof src === "string" ? src : ""} />;
  },
}));

const baseProject: ProjectMeta = {
  title: "Vehicle Vault",
  slug: "vehicle-vault-maintenance-platform",
  excerpt: "A maintenance platform for fleets.",
  context: "ctx",
  problem: "prob",
  contribution: "contrib",
  impact: "impact",
  metricHighlights: ["40% faster TTI", "2x retention"],
  coverImage: "/images/projects/vehicle-vault.png",
  year: 2024,
  role: "Lead Frontend",
  services: ["Design", "Engineering"],
  techStack: ["React", "Next.js", "TypeScript", "GraphQL", "Redis"],
  category: "platform",
  outcomes: ["shipped"],
  featured: true,
};

describe("ProjectCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders title, year, role, and excerpt", () => {
    render(<ProjectCard project={baseProject} />);

    expect(
      screen.getByRole("heading", { name: /Vehicle Vault/ })
    ).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Lead Frontend")).toBeInTheDocument();
    expect(
      screen.getByText(/maintenance platform for fleets/i)
    ).toBeInTheDocument();
  });

  it("links to project detail", () => {
    render(<ProjectCard project={baseProject} />);
    const links = screen.getAllByRole("link");
    expect(
      links.some(
        (link) =>
          link.getAttribute("href") ===
          "/projects/vehicle-vault-maintenance-platform"
      )
    ).toBe(true);
  });

  it("shows only first four tech stack items", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("GraphQL")).toBeInTheDocument();
    expect(screen.queryByText("Redis")).not.toBeInTheDocument();
  });

  it("uses summary override when provided", () => {
    render(<ProjectCard project={baseProject} summary="Custom summary copy." />);
    expect(screen.getByText("Custom summary copy.")).toBeInTheDocument();
    expect(
      screen.queryByText(/maintenance platform for fleets/i)
    ).not.toBeInTheDocument();
  });

  it("renders first metric highlight", () => {
    render(<ProjectCard project={baseProject} />);
    expect(screen.getByText("40% faster TTI")).toBeInTheDocument();
  });
});
