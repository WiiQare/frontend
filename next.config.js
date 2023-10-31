/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.wiiqare.com',
    //NEXT_PUBLIC_API_URL: 'http://localhost:3001',
    //NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
    NEXT_PUBLIC_BASE_URL: 'https://app.wiiqare.com',
    NEXTAUTH_URL: 'https://app.wiiqare.com',
  },
});

module.exports = nextConfig;
