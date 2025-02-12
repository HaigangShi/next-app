import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 全局环境变量配置
  env: {
    APP_ENV: process.env.NODE_ENV || 'development',
  },

  // API 代理配置
  async rewrites() {
    const env = process.env.NODE_ENV || 'development';

    // 基础 API 配置
    const base = [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];

    // 环境特定的额外代理配置
    const upload = {
      development: [
        {
          source: '/upload/:path*',
          destination: 'http://localhost:8000/upload/:path*',
        },
      ],
      test: [
        {
          source: '/upload/:path*',
          destination: 'http://test-storage.example.com/upload/:path*',
        },
      ],
      production: [
        {
          source: '/upload/:path*',
          destination: 'https://storage.example.com/upload/:path*',
        },
      ],
    };

    return [...base, ...(upload[env] || [])];
  },

  // 图片域名配置
  images: {
    domains: [
      'localhost',
      'test.example.com',
    ],
  },

  // 输出配置
  output: 'standalone',
};

export default nextConfig;
