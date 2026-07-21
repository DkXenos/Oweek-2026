import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // allow other devices on the LAN to load dev assets (Next 16 blocks cross-origin dev requests by default)
  allowedDevOrigins: ["192.168.1.126"],
};

export default nextConfig;