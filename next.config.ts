/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ disables TS check on build
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint on build
  },
};

module.exports = nextConfig;
