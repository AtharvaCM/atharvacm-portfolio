import { describe, expect, it } from "vitest";

import { SITE_URL } from "@/lib/constants";

import robots from "./robots";

describe("robots", () => {
  it("allows all user agents at root", () => {
    const result = robots();
    expect(result.rules).toEqual([
      expect.objectContaining({ userAgent: "*", allow: "/" }),
    ]);
  });

  it("disallows crawl-wasteful paths", () => {
    const result = robots();
    const rule = Array.isArray(result.rules) ? result.rules[0] : result.rules;
    expect(rule?.disallow).toEqual(
      expect.arrayContaining(["/api/", "/preview", "/draft"])
    );
  });

  it("points to sitemap.xml under SITE_URL", () => {
    const result = robots();
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("declares the canonical host", () => {
    const result = robots();
    expect(result.host).toBe(SITE_URL);
  });
});
