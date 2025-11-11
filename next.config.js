/** @type {import('next').NextConfig} */
const nextConfig = {

   typescript: {
    ignoreBuildErrors: true, // ⛔ Use only for debugging, not production
  }, 
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
