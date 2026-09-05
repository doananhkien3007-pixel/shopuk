import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // Commented out for Vercel deployment
  experimental: {
    turbo: {
      enabled: false,
    },
  },
};

export default nextConfig;
