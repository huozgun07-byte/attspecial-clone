import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "attspecial.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bat.bing.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;