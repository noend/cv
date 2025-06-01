/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },  webpack: (config) => {
    config.resolve.alias.tinymce = 'tinymce/tinymce.min.js';
    return config;
  },
}

export default nextConfig