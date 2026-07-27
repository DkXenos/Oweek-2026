import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // allow other devices on the LAN to load dev assets (Next 16 blocks cross-origin dev requests by default)
  allowedDevOrigins: ["192.168.1.126"],
  // data/schedule-data.json is read at runtime via a path built from
  // process.cwd(), which Next's file tracer can't detect on its own. Without
  // this, the file may be missing from the serverless bundle on Vercel and the
  // /schedule (and admin) pages would fail to read it. Force it to be included.
  outputFileTracingIncludes: {
    "/schedule": ["./data/schedule-data.json"],
    "/admin/admin-oweek": ["./data/schedule-data.json"],
  },
};

export default nextConfig;