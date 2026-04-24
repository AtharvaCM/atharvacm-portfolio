import { generateRssXml } from "@/lib/rss";

const basePost = {
  title: "Post",
  slug: "post",
  excerpt: "Example",
  publishedAt: "2025-01-01T00:00:00.000Z",
  tags: ["tag"],
  featured: false,
  readingTime: 2,
  draft: false,
};

describe("generateRssXml", () => {
  it("returns valid xml entries", () => {
    const xml = generateRssXml([basePost]);

    expect(xml).toContain("<rss");
    expect(xml).toContain("<title>Post</title>");
    expect(xml).toContain("/blog/post");
  });

  it("escapes XML special characters in title and excerpt", () => {
    const xml = generateRssXml([
      {
        ...basePost,
        title: "<script>alert('x')</script> & \"stuff\"",
        excerpt: "A & B < C > D \"E\" 'F'",
      },
    ]);

    expect(xml).not.toContain("<script>alert");
    expect(xml).toContain("&lt;script&gt;");
    expect(xml).toContain("&amp;");
    expect(xml).toContain("&quot;");
    expect(xml).toContain("&apos;");
  });

  it("formats publishedAt as RFC-822 UTC string", () => {
    const xml = generateRssXml([basePost]);
    expect(xml).toMatch(/<pubDate>.*GMT<\/pubDate>/);
  });

  it("produces empty channel when posts array is empty", () => {
    const xml = generateRssXml([]);
    expect(xml).toContain("<rss");
    expect(xml).toContain("<channel>");
    expect(xml).not.toContain("<item>");
  });

  it("outputs one <item> per post", () => {
    const xml = generateRssXml([
      { ...basePost, slug: "a", title: "A" },
      { ...basePost, slug: "b", title: "B" },
      { ...basePost, slug: "c", title: "C" },
    ]);
    expect(xml.match(/<item>/g)?.length).toBe(3);
  });

  it("advertises a self-referencing atom:link to /rss.xml", () => {
    const xml = generateRssXml([basePost]);
    expect(xml).toContain('xmlns:atom="http://www.w3.org/2005/Atom"');
    expect(xml).toMatch(
      /<atom:link href="[^"]+\/rss\.xml" rel="self" type="application\/rss\+xml"/
    );
  });

  it("emits a lastBuildDate derived from the most recent post", () => {
    const xml = generateRssXml([
      {
        ...basePost,
        slug: "a",
        publishedAt: "2025-01-01T00:00:00.000Z",
      },
      {
        ...basePost,
        slug: "b",
        publishedAt: "2025-06-01T00:00:00.000Z",
        updatedAt: "2026-01-15T00:00:00.000Z",
      },
    ]);
    expect(xml).toContain("<lastBuildDate>");
    expect(xml).toMatch(/<lastBuildDate>.*2026.*GMT<\/lastBuildDate>/);
  });

  it("emits a category node per tag", () => {
    const xml = generateRssXml([
      { ...basePost, tags: ["react", "perf"] },
    ]);
    expect(xml).toContain("<category>react</category>");
    expect(xml).toContain("<category>perf</category>");
  });
});
