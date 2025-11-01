/** @type {import('next').NextConfig} */
/* const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
}
module.exports = nextConfig */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;

