/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
      buffer: false,
      process: false,
    };
    return config;
  },
  transpilePackages: [
    "@react-pdf-viewer/core",
    "@react-pdf-viewer/default-layout",
    "@react-pdf-viewer/highlight",
    "@react-pdf-viewer/page-navigation",
    "@react-pdf-viewer/search",
    "@react-pdf-viewer/toolbar",
    "@react-pdf-viewer/zoom",
  ],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
