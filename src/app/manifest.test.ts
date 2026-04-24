import { describe, expect, it } from "vitest";

import { SITE_NAME } from "@/lib/constants";

import manifest from "./manifest";

describe("manifest", () => {
  it("advertises a standalone PWA with site name + icons", () => {
    const result = manifest();
    expect(result.short_name).toBe(SITE_NAME);
    expect(result.start_url).toBe("/");
    expect(result.display).toBe("standalone");
    expect(result.icons?.[0]).toMatchObject({
      src: "/icon.svg",
      type: "image/svg+xml",
    });
  });
});
