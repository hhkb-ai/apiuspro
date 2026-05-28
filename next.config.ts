import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // outputFileTracingRoot: path.resolve(__dirname, '../../'),  // Uncomment and add 'import path from "path"' if needed
  /* config options here */
  allowedDevOrigins: ['*.dev.coze.site'],
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'apiuspro.cn' }],
        destination: 'https://www.apiuspro.cn/:path*',
        statusCode: 301,
      },
      {
        source: '/story',
        destination: '/use-case',
        statusCode: 301,
      },
      {
        source: '/story/:path*',
        destination: '/use-case',
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '8.147.64.143' }],
        destination: 'https://www.apiuspro.cn/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
