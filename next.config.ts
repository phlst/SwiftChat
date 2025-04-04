import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;
