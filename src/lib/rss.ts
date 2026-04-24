import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { PROFILE_NAME } from "@/lib/profile-content";
import type { BlogPostMeta } from "@/lib/types";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function generateRssXml(posts: BlogPostMeta[], now: Date = new Date()) {
  const feedUrl = `${SITE_URL}/rss.xml`;
  const latest = posts.reduce<Date>((acc, post) => {
    const updated = new Date(post.updatedAt ?? post.publishedAt);
    return updated > acc ? updated : acc;
  }, new Date(0));
  const lastBuild = (latest.getTime() > 0 ? latest : now).toUTCString();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `        <category>${escapeXml(tag)}</category>`)
        .join("\n");
      return `      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
        <guid isPermaLink="true">${link}</guid>
        <description>${escapeXml(post.excerpt)}</description>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
${categories}
      </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(`${SITE_NAME} blog feed`)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <managingEditor>noreply@middle-earth.in (${escapeXml(PROFILE_NAME)})</managingEditor>
    <generator>Next.js</generator>
${items}
  </channel>
</rss>`;
}
