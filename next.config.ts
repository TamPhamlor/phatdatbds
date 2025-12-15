import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Tối ưu hóa trang 404 để giảm request database
  async rewrites() {
    return [
      // Redirect 404 errors to static HTML file
      {
        source: '/404',
        destination: '/not-found.html',
      },
    ];
  },
  
  // Tối ưu hóa build
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Cấu hình images
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
