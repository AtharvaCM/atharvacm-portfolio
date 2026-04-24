import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const enableMock = vi.fn();

vi.mock("next/headers", () => ({
  draftMode: async () => ({
    enable: enableMock,
    disable: vi.fn(),
  }),
}));

function makeRequest(url: string) {
  return new Request(url, { method: "GET" });
}

describe("GET /api/draft", () => {
  beforeEach(() => {
    enableMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns 500 when BLOG_PREVIEW_SECRET is not configured", async () => {
    vi.stubEnv("BLOG_PREVIEW_SECRET", "");
    const response = await GET(
      makeRequest("http://localhost/api/draft?secret=x&slug=/blog/foo")
    );
    expect(response.status).toBe(500);
    expect(enableMock).not.toHaveBeenCalled();
  });

  it("returns 401 when secret does not match", async () => {
    vi.stubEnv("BLOG_PREVIEW_SECRET", "correct");
    const response = await GET(
      makeRequest("http://localhost/api/draft?secret=wrong&slug=/blog/foo")
    );
    expect(response.status).toBe(401);
    expect(enableMock).not.toHaveBeenCalled();
  });

  it("enables draft mode and redirects to provided slug on match", async () => {
    vi.stubEnv("BLOG_PREVIEW_SECRET", "correct");
    const response = await GET(
      makeRequest("http://localhost/api/draft?secret=correct&slug=/blog/foo")
    );
    expect(enableMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBeGreaterThanOrEqual(300);
    expect(response.status).toBeLessThan(400);
    expect(response.headers.get("location")).toBe("http://localhost/blog/foo");
  });

  it("redirects to /blog when slug is missing", async () => {
    vi.stubEnv("BLOG_PREVIEW_SECRET", "correct");
    const response = await GET(
      makeRequest("http://localhost/api/draft?secret=correct")
    );
    expect(response.headers.get("location")).toBe("http://localhost/blog");
  });

  it("ignores external-looking slug values (no leading slash)", async () => {
    vi.stubEnv("BLOG_PREVIEW_SECRET", "correct");
    const response = await GET(
      makeRequest(
        "http://localhost/api/draft?secret=correct&slug=https://evil.example.com"
      )
    );
    expect(response.headers.get("location")).toBe("http://localhost/blog");
  });
});
