import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TrackedLink } from "./tracked-link";

const trackEventMock = vi.fn();

vi.mock("@/lib/gtm-events", () => ({
  trackEvent: (...args: unknown[]) => trackEventMock(...args),
}));

describe("TrackedLink", () => {
  afterEach(() => {
    trackEventMock.mockReset();
    cleanup();
  });

  it("renders children inside a link with href", () => {
    render(
      <TrackedLink href="/projects" trackingEvent="click">
        Projects
      </TrackedLink>
    );
    const link = screen.getByRole("link", { name: /projects/i });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("fires trackEvent with payload on click", () => {
    render(
      <TrackedLink
        href="/resume"
        trackingEvent="resume_click"
        trackingPayload={{ location: "header_nav" }}
      >
        Resume
      </TrackedLink>
    );

    fireEvent.click(screen.getByRole("link", { name: /resume/i }));
    expect(trackEventMock).toHaveBeenCalledWith("resume_click", {
      location: "header_nav",
    });
  });

  it("does not fire trackEvent when trackingEvent is absent", () => {
    render(<TrackedLink href="/about">About</TrackedLink>);
    fireEvent.click(screen.getByRole("link", { name: /about/i }));
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("calls user onClick before firing trackEvent", () => {
    const onClick = vi.fn();
    render(
      <TrackedLink href="/contact" onClick={onClick} trackingEvent="contact">
        Contact
      </TrackedLink>
    );
    fireEvent.click(screen.getByRole("link", { name: /contact/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(trackEventMock).toHaveBeenCalledTimes(1);
  });

  it("skips trackEvent when user onClick calls preventDefault", () => {
    const onClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(
      <TrackedLink href="/contact" onClick={onClick} trackingEvent="contact">
        Contact
      </TrackedLink>
    );
    fireEvent.click(screen.getByRole("link", { name: /contact/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(trackEventMock).not.toHaveBeenCalled();
  });
});
