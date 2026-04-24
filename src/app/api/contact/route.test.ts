import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { __resetRateLimitStoreForTests } from "@/lib/contact";

import { POST } from "./route";

const validBody = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Reaching out about a senior frontend role with a long-enough message.",
  website: "",
};

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    __resetRateLimitStoreForTests();
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_TO_EMAIL", "hello@example.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 400 when JSON is invalid", async () => {
    const response = await POST(makeRequest("not-json{"));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toEqual({ ok: false, error: "Invalid JSON payload." });
  });

  it("returns 400 when validation fails", async () => {
    const response = await POST(makeRequest({ ...validBody, email: "bad" }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toMatch(/valid email/i);
  });

  it("returns 200 with submissionId on honeypot hit (silent drop)", async () => {
    const response = await POST(
      makeRequest({ ...validBody, website: "spam.example.com" })
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(body.submissionId).toEqual(expect.any(String));
  });

  it("returns 429 after exceeding rate limit", async () => {
    const ip = "10.0.0.1";
    for (let i = 0; i < 5; i += 1) {
      await POST(
        makeRequest({ ...validBody, website: "honey" }, { "x-forwarded-for": ip })
      );
    }

    const response = await POST(
      makeRequest(validBody, { "x-forwarded-for": ip })
    );
    expect(response.status).toBe(429);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.error).toMatch(/too many requests/i);
  });

  it("sets Cache-Control: no-store on success", async () => {
    const response = await POST(
      makeRequest({ ...validBody, website: "trip" })
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
