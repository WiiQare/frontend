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
    NEXT_PUBLIC_API_URL: 'https://api.wiiqare.com',
    //NEXT_PUBLIC_API_URL: 'http://localhost:3001',
    NEXT_PUBLIC_BASE_URL: 'https://app.wiiqare.com',
    NEXTAUTH_URL: 'https://app.wiiqare.com',
  },
});

module.exports = nextConfig;
