/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables strict mode for better debugging
  reactStrictMode: true,
  // Ensures static images/particles load correctly from external CDNs if needed
  images: {
    domains: ['cdn.jsdelivr.net'],
  },
};

export default nextConfig;
