import { describe, expect, it } from "vitest";

import { buildArticleMarkdown, toPortableMarkdown } from "@/lib/markdown";

const origin = "https://example.com";

describe("toPortableMarkdown", () => {
  it("replaces JSX figures with a markdown image", () => {
    const source = [
      "Before.",
      "",
      '<figure style={{ margin: "2rem 0" }}>',
      "  <picture>",
      '    <source media="(max-width: 540px)" srcSet="/images/a_mobile.svg" />',
      '    <img alt="A diagram" src="/images/a.svg" style={{ width: "100%" }} />',
      "  </picture>",
      "</figure>",
      "",
      "After.",
    ].join("\n");

    expect(toPortableMarkdown(source, origin)).toBe(
      "Before.\n\n![A diagram](https://example.com/images/a.svg)\n\nAfter."
    );
  });

  it("absolutizes root-relative links and leaves external ones alone", () => {
    expect(
      toPortableMarkdown("See [this](/blog/x) and [that](https://other.dev/y).", origin)
    ).toBe("See [this](https://example.com/blog/x) and [that](https://other.dev/y).");
  });

  it("leaves code fences untouched", () => {
    const source = "```ts\nconst a = 1;\n```";
    expect(toPortableMarkdown(source, origin)).toBe(source);
  });
});

describe("buildArticleMarkdown", () => {
  it("prepends title, source and excerpt", () => {
    expect(
      buildArticleMarkdown({
        title: "Hello",
        excerpt: "Short summary.\n",
        url: "https://example.com/blog/hello",
        content: "## Intro\n\nBody.",
      })
    ).toBe(
      "# Hello\n\nSource: https://example.com/blog/hello\n\n> Short summary.\n\n## Intro\n\nBody.\n"
    );
  });
});
