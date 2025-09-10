import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**'
      }
    ]
  },

  // API rewrites for ZEERO AI proxy
  async rewrites() {
    return [
      // ZEERO AI Service proxy
      ...(process.env.ZEERO_API_URL ? [
        {
          source: '/api/ai/:path*',
          destination: `${process.env.ZEERO_API_URL}/:path*`
        }
      ] : [])
    ]
  }
};

export default nextConfig;
