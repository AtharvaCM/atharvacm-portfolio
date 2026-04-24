import { describe, expect, it } from "vitest";

import {
  cn,
  formatDate,
  getMailtoHref,
  getMeaningfulEmail,
  getMeaningfulExternalUrl,
  slugifyTag,
} from "./utils";

describe("cn", () => {
  it("merges truthy class names", () => {
    expect(cn("a", "b", undefined, null, false, "c")).toBe("a b c");
  });

  it("handles conditional objects", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});

describe("slugifyTag", () => {
  it("lowercases and replaces whitespace with dashes", () => {
    expect(slugifyTag("React Server Components")).toBe(
      "react-server-components"
    );
  });
});

describe("formatDate", () => {
  it("formats ISO date as short month day year", () => {
    const result = formatDate("2026-04-23T00:00:00.000Z");
    expect(result).toMatch(/Apr/);
    expect(result).toMatch(/2026/);
  });
});

describe("getMeaningfulExternalUrl", () => {
  it("returns undefined for empty or '#' values", () => {
    expect(getMeaningfulExternalUrl(undefined)).toBeUndefined();
    expect(getMeaningfulExternalUrl("")).toBeUndefined();
    expect(getMeaningfulExternalUrl("#")).toBeUndefined();
  });

  it("rejects placeholder hosts", () => {
    expect(getMeaningfulExternalUrl("https://example.com/foo")).toBeUndefined();
  });

  it("rejects root profile hosts with no path", () => {
    expect(getMeaningfulExternalUrl("https://github.com")).toBeUndefined();
    expect(getMeaningfulExternalUrl("https://linkedin.com/")).toBeUndefined();
  });

  it("accepts profile URLs with a path", () => {
    expect(getMeaningfulExternalUrl("https://github.com/atharvacm")).toBe(
      "https://github.com/atharvacm"
    );
  });

  it("rejects non-http(s) protocols", () => {
    expect(
      getMeaningfulExternalUrl("javascript:alert(1)")
    ).toBeUndefined();
    expect(getMeaningfulExternalUrl("ftp://example.org")).toBeUndefined();
  });

  it("returns undefined for malformed URLs", () => {
    expect(getMeaningfulExternalUrl("not a url")).toBeUndefined();
  });
});

describe("getMeaningfulEmail", () => {
  it("returns undefined for missing or invalid values", () => {
    expect(getMeaningfulEmail(undefined)).toBeUndefined();
    expect(getMeaningfulEmail("")).toBeUndefined();
    expect(getMeaningfulEmail("no-at-sign")).toBeUndefined();
  });

  it("rejects example.com domain", () => {
    expect(getMeaningfulEmail("hi@example.com")).toBeUndefined();
    expect(getMeaningfulEmail("hi@EXAMPLE.com")).toBeUndefined();
  });

  it("accepts legit-looking emails", () => {
    expect(getMeaningfulEmail("hello@middle-earth.in")).toBe(
      "hello@middle-earth.in"
    );
  });
});

describe("getMailtoHref", () => {
  it("returns mailto: for meaningful emails", () => {
    expect(getMailtoHref("hi@atharvacm.dev")).toBe("mailto:hi@atharvacm.dev");
  });

  it("returns undefined for placeholder emails", () => {
    expect(getMailtoHref("a@example.com")).toBeUndefined();
  });
});
