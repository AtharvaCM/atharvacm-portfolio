import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const disableMock = vi.fn();

vi.mock("next/headers", () => ({
  draftMode: async () => ({
    enable: vi.fn(),
    disable: disableMock,
  }),
}));

function makeRequest(url: string, headers: Record<string, string> = {}) {
  return new Request(url, { method: "GET", headers });
}

describe("GET /api/draft/disable", () => {
  beforeEach(() => {
    disableMock.mockReset();
  });

  it("disables draft mode", async () => {
    await GET(makeRequest("http://localhost/api/draft/disable"));
    expect(disableMock).toHaveBeenCalledTimes(1);
  });

  it("redirects to /blog when no referer", async () => {
    const response = await GET(
      makeRequest("http://localhost/api/draft/disable")
    );
    expect(response.headers.get("location")).toBe("http://localhost/blog");
  });

  it("redirects to same-origin referer when present", async () => {
    const response = await GET(
      makeRequest("http://localhost/api/draft/disable", {
        referer: "http://localhost/blog/foo",
      })
    );
    expect(response.headers.get("location")).toBe("http://localhost/blog/foo");
  });

  it("falls back to /blog when referer origin differs", async () => {
    const response = await GET(
      makeRequest("http://localhost/api/draft/disable", {
        referer: "http://evil.example.com/blog/foo",
      })
    );
    expect(response.headers.get("location")).toBe("http://localhost/blog");
  });

  it("falls back to /blog on malformed referer", async () => {
    const response = await GET(
      makeRequest("http://localhost/api/draft/disable", {
        referer: "not-a-url",
      })
    );
    expect(response.headers.get("location")).toBe("http://localhost/blog");
  });
});
