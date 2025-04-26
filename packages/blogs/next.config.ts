import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        pathname: '/account123/**'
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
        pathname: '/jpg/03/17/25/45/360_F_317254576_lKDALRrvGoBr7gQSa1k4kJBx7O2D15dc.jpg'
      }
    ],
  },
};

export default nextConfig;
