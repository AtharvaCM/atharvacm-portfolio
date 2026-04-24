import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f7efe7 0%, #f0d8ca 100%)",
          borderRadius: 40,
          color: "#2f241e",
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          fontSize: 118,
          letterSpacing: "-0.04em",
          position: "relative"
        }}
      >
        <span>A</span>
        <span
          style={{
            position: "absolute",
            top: 28,
            right: 30,
            width: 32,
            height: 32,
            borderRadius: 999,
            background: "linear-gradient(135deg, #cf3618 0%, #95230f 100%)"
          }}
        />
      </div>
    ),
    size
  );
}
