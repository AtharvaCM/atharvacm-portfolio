import { SITE_NAME, SITE_URL } from "@/lib/constants";
import type { BlogPostMeta } from "@/lib/types";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function generateRssXml(posts: BlogPostMeta[]) {
  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      return `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <description>${escapeXml(post.excerpt)}</description>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(`${SITE_NAME} blog feed`)}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;
}
