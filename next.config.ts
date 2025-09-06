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

  // API rewrites for Ollama proxy
  async rewrites() {
    return [
      // Development: proxy to localhost Ollama
      ...(process.env.NODE_ENV === 'development' ? [
        {
          source: '/api/ollama/:path*',
          destination: 'http://localhost:11434/api/:path*'
        }
      ] : []),

      // Production: proxy to local network Ollama
      ...(process.env.NODE_ENV === 'production' && process.env.OLLAMA_BASE_URL ? [
        {
          source: '/api/ollama/:path*',
          destination: `${process.env.OLLAMA_BASE_URL}/api/:path*`
        }
      ] : [])
    ]
  }
};

export default nextConfig;
