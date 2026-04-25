import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/constants";

export const alt = "Atharva Mahamuni | Senior Full-Stack Engineer";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            <span>Senior Full-Stack Engineer</span>
            <span>React / Next.js / TypeScript</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 900
            }}
          >
            <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 700 }}>
              {SITE_NAME}
            </div>
            <div
              style={{
                fontFamily: "Inter, Arial, sans-serif",
                fontSize: 34,
                lineHeight: 1.3,
                color: "rgba(44, 33, 29, 0.84)"
              }}
            >
              Frontend-focused full-stack engineer building scalable React,
              Next.js, and TypeScript systems for real production use.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              fontFamily: "Inter, Arial, sans-serif"
            }}
          >
            {[
              "Frontend Architecture",
              "Performance Optimization",
              "GraphQL",
              "Monorepo",
              "Production Systems"
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(80, 57, 46, 0.16)",
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
