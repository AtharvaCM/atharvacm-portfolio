import { generateRssXml } from "@/lib/rss";

describe("generateRssXml", () => {
  it("returns valid xml entries", () => {
    const xml = generateRssXml([
      {
        title: "Post",
        slug: "post",
        excerpt: "Example",
        publishedAt: "2025-01-01T00:00:00.000Z",
        tags: ["tag"],
        featured: false,
        readingTime: 2,
        draft: false
      }
    ]);

    expect(xml).toContain("<rss");
    expect(xml).toContain("<title>Post</title>");
    expect(xml).toContain("/blog/post");
  });
});
