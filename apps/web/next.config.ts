import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path((?!auth).*)",
        destination: `${process.env.API_BASE_URL}/:path`,
      },
    ];
  },
};

export default nextConfig;
