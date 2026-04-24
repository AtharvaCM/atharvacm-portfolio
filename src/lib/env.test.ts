import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

async function loadEnv() {
  vi.resetModules();
  return import("./env");
}

describe("env schema", () => {
  beforeEach(() => {
    for (const key of Object.keys(process.env)) {
      if (
        key.startsWith("NEXT_PUBLIC_") ||
        key === "RESEND_API_KEY" ||
        key === "CONTACT_TO_EMAIL" ||
        key === "CONTACT_FROM_EMAIL" ||
        key === "BLOG_PREVIEW_SECRET" ||
        key === "BLOG_PREVIEW_BASE_URL"
      ) {
        delete process.env[key];
      }
    }
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("parses a minimal env successfully", async () => {
    const { env } = await loadEnv();
    expect(env.NEXT_PUBLIC_SITE_URL).toBeUndefined();
    expect(env.RESEND_API_KEY).toBeUndefined();
  });

  it("normalizes empty string values to undefined", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "";
    process.env.RESEND_API_KEY = "";
    const { env } = await loadEnv();
    expect(env.NEXT_PUBLIC_SITE_URL).toBeUndefined();
    expect(env.RESEND_API_KEY).toBeUndefined();
  });

  it("accepts a valid site URL and email", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    process.env.CONTACT_TO_EMAIL = "hello@example.com";
    const { env } = await loadEnv();
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://example.com");
    expect(env.CONTACT_TO_EMAIL).toBe("hello@example.com");
  });

  it("throws on an invalid URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";
    await expect(loadEnv()).rejects.toThrow(/Invalid environment variables/);
  });

  it("throws on an invalid email", async () => {
    process.env.CONTACT_TO_EMAIL = "not-an-email";
    await expect(loadEnv()).rejects.toThrow(/Invalid environment variables/);
  });

  it("requireEnv returns the value when present", async () => {
    process.env.RESEND_API_KEY = "re_abc123";
    const { requireEnv } = await loadEnv();
    expect(requireEnv("RESEND_API_KEY")).toBe("re_abc123");
  });

  it("requireEnv throws when value is missing", async () => {
    const { requireEnv } = await loadEnv();
    expect(() => requireEnv("RESEND_API_KEY")).toThrow(
      /Missing required env var: RESEND_API_KEY/
    );
  });
});
