/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com", "https://res.cloudinary.com"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
