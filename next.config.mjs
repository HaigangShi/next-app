/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const env = process.env.NODE_ENV || 'development';
    const config = {
      development: {
        source: '/api/:path*',
        destination: 'http://dev-api.example.com/:path*',
      },
      test: {
        source: '/api/:path*',
        destination: 'http://test-api.example.com/:path*',
      },
      pre: {
        source: '/api/:path*',
        destination: 'http://pre-api.example.com/:path*',
      },
    };

    return env !== 'production' ? [config[env]] : [];
  },
};

export default nextConfig;
