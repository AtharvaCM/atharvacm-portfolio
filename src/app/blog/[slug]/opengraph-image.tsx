import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/constants";
import { getBlogPostBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const alt = "Blog post | Atharva Mahamuni";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function BlogOgImage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const title = post?.title ?? "Blog post";
  const meta = post
    ? `${formatDate(post.publishedAt)} · ${post.readingTime ?? 1} min read`
    : `Writing by ${SITE_NAME}`;
  const tag = post?.tags[0];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(180deg, #f6f2ee 0%, #f1ebe4 100%)",
          color: "#2c211d",
          padding: "56px 64px",
          fontFamily: "Georgia, serif"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(80, 57, 46, 0.12)",
            borderRadius: 28,
            padding: "48px 52px",
            background: "rgba(255,255,255,0.72)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Inter, Arial, sans-serif",
              fontSize: 20,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(44, 33, 29, 0.7)"
            }}
          >
            <span>{SITE_NAME} · Blog</span>
            {tag ? <span>{tag}</span> : <span />}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 980
            }}
          >
            <div
              style={{
                fontSize: title.length > 60 ? 58 : 72,
                lineHeight: 1.04,
                fontWeight: 700,
                letterSpacing: "-0.02em"
              }}
            >
              {title}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Inter, Arial, sans-serif",
              fontSize: 22,
              color: "rgba(44, 33, 29, 0.78)"
            }}
          >
            <span>{meta}</span>
            <span
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(80, 57, 46, 0.2)",
                fontSize: 18
              }}
            >
              atharvacm.dev
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
