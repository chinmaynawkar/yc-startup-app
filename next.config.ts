import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ppr: 'incremental'
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: 'bottom-right',
    buildActivity: true
  }
};

export default nextConfig;
