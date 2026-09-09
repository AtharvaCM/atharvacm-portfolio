import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    qualities: [75, 90],
    remotePatterns: []
  }
};

export default nextConfig;
