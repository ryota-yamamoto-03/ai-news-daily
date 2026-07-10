import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // ニュース画像は外部の様々なドメインから配信されるためワイルドカードを許可する
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
