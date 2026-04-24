import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteNav } from "./site-nav";

const usePathnameMock = vi.fn(() => "/");

vi.mock("next/navigation", () => ({
  usePathname: () => usePathnameMock(),
}));

vi.mock("@/lib/gtm-events", () => ({
  trackEvent: vi.fn(),
}));

describe("SiteNav", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/");
    document.body.style.overflow = "";
  });

  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  it("renders primary nav items", () => {
    render(<SiteNav />);
    const primary = screen.getByRole("navigation", { name: /^primary$/i });
    expect(primary).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /projects/i }).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /contact/i }).length).toBeGreaterThan(0);
  });

  it("toggle button starts collapsed and expands body overflow when opened", () => {
    render(<SiteNav />);
    const toggle = screen.getByRole("button", { name: /toggle navigation/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("toggle button collapses on second click and restores overflow", () => {
    render(<SiteNav />);
    const toggle = screen.getByRole("button", { name: /toggle navigation/i });
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.body.style.overflow).toBe("");
  });

  it("marks active pathname link with accent class", () => {
    usePathnameMock.mockReturnValue("/projects");
    render(<SiteNav />);
    const projectLinks = screen.getAllByRole("link", { name: /^projects$/i });
    expect(
      projectLinks.some((link) => link.className.includes("text-accent"))
    ).toBe(true);
  });
});
