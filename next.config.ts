import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
  // to allow images from any domain
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*'
      }
    ]
  },
  experimental: {
    optimizeCss: true,
    ppr: 'incremental',
    after: true
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: 'bottom-right',
    buildActivity: true
  }
};

export default nextConfig;
