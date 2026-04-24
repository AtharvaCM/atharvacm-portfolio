import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CommandPalette } from "./command-palette";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const trackEventMock = vi.fn();

vi.mock("@/lib/gtm-events", () => ({
  trackEvent: (...args: unknown[]) => trackEventMock(...args),
}));

describe("CommandPalette", () => {
  afterEach(() => {
    pushMock.mockReset();
    trackEventMock.mockReset();
    cleanup();
  });

  function openPalette() {
    fireEvent.keyDown(window, { key: "/" });
  }

  it("opens on '/' key and lists visible commands", () => {
    render(<CommandPalette />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    openPalette();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Projects/ })).toBeInTheDocument();
    expect(trackEventMock).toHaveBeenCalledWith("command_palette_open", {
      location: "global",
    });
  });

  it("filters commands by query", () => {
    render(<CommandPalette />);
    openPalette();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "resume" } });

    expect(screen.getByRole("button", { name: /Resume/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^Home/ })).not.toBeInTheDocument();
  });

  it("navigates on Enter and closes palette", () => {
    render(<CommandPalette />);
    openPalette();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "projects" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(pushMock).toHaveBeenCalledWith("/projects");
    expect(trackEventMock).toHaveBeenCalledWith(
      "command_palette_select",
      expect.objectContaining({ destination: "/projects" })
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", () => {
    render(<CommandPalette />);
    openPalette();
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("reveals hidden commands when matched by alias", () => {
    render(<CommandPalette />);
    openPalette();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "sudo" } });

    expect(
      screen.getByRole("button", { name: /sudo reveal personality/ })
    ).toBeInTheDocument();
  });
});
