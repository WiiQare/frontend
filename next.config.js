/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
 
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com', 'xsgames.co', 'lh3.googleusercontent.com', 'ui-avatars.com'],
  },
  experimental: {
    forceSwcTransforms: true,
  }
});
 
module.exports = nextConfig;
