import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "./contact-form";

vi.mock("@/lib/gtm-events", () => ({
  trackEvent: vi.fn(),
}));

function fillForm() {
  fireEvent.change(screen.getByRole("textbox", { name: /name/i }), {
    target: { value: "Jane Dev" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
    target: { value: "Hello, this is a long-enough test message." },
  });
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    cleanup();
  });

  it("submits form payload and shows success message", async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true, submissionId: "abc" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    render(<ContactForm />);
    fillForm();
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form")!);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({ method: "POST" })
      );
    });

    const firstCall = fetchMock.mock.calls[0]!;
    const init = firstCall[1] as RequestInit;
    const body = JSON.parse(init.body as string);
    expect(body).toMatchObject({
      name: "Jane Dev",
      email: "jane@example.com",
      message: "Hello, this is a long-enough test message.",
      website: "",
    });

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });

  it("shows error message when API responds with error", async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: false, error: "Rate limited" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      })
    );

    render(<ContactForm />);
    fillForm();
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form")!);

    expect(await screen.findByText(/rate limited/i)).toBeInTheDocument();
  });

  it("shows fallback error when fetch rejects", async () => {
    const fetchMock = vi.mocked(globalThis.fetch);
    fetchMock.mockRejectedValueOnce(new Error("network down"));

    render(<ContactForm />);
    fillForm();
    fireEvent.submit(screen.getByRole("button", { name: /send message/i }).closest("form")!);

    expect(
      await screen.findByText(/something went wrong/i)
    ).toBeInTheDocument();
  });
});
