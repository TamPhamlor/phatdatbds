import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/nha-dat-ban',
        destination: '/',
        permanent: true, // 301 redirect
      },
      {
        source: '/nha-dat-ban/:path*',
        destination: '/',
        permanent: true, // 301 redirect for all sub-routes
      },
    ];
  },
};

export default nextConfig;
