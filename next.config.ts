import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/luzern-bewegt",
        destination: "/luzern-bewegt.html",
      },
    ];
  },
};

export default nextConfig;
