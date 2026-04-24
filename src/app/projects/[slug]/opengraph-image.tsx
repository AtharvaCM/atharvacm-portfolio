import { ImageResponse } from "next/og";

import { PROJECT_CATEGORY_LABELS, SITE_NAME } from "@/lib/constants";
import { getProjectBySlug } from "@/lib/content";

export const alt = "Project | Atharva Mahamuni";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectOgImage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const title = project?.title ?? "Project";
  const category = project
    ? PROJECT_CATEGORY_LABELS[project.category]
    : "Selected Work";
  const role = project?.role ?? SITE_NAME;
  const year = project?.year;
  const techPreview = project?.techStack.slice(0, 4) ?? [];

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
            <span>{SITE_NAME} · {category}</span>
            {year ? <span>{year}</span> : <span />}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 980
            }}
          >
            <div
              style={{
                fontSize: title.length > 40 ? 68 : 82,
                lineHeight: 1.02,
                fontWeight: 700,
                letterSpacing: "-0.02em"
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: "Inter, Arial, sans-serif",
                fontSize: 28,
                color: "rgba(44, 33, 29, 0.78)"
              }}
            >
              {role}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              fontFamily: "Inter, Arial, sans-serif"
            }}
          >
            {techPreview.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(80, 57, 46, 0.2)",
                  fontSize: 18,
                  color: "rgba(44, 33, 29, 0.78)",
                  background: "rgba(255,255,255,0.76)"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
