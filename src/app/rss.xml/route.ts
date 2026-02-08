import { getAllBlogPosts } from "@/lib/content";
import { generateRssXml } from "@/lib/rss";

export async function GET() {
  const posts = await getAllBlogPosts();
  const xml = generateRssXml(posts);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=86400"
    }
  });
}
