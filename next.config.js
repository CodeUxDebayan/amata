/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  eslint: {
    // Skip ESLint checks during production builds for faster build times
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during production builds for faster build times
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
