/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      'via.placeholder.com',
      'xsgames.co',
      'lh3.googleusercontent.com',
      'ui-avatars.com',
      'i.goopics.net',
      'flagcdn.com',
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:3000',
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3001',
    NEXTAUTH_URL: 'http://localhost:3000'
  }
});

module.exports = nextConfig;
