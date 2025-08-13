/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  images: {
    domains: [
      "www.gstatic.com", // PSI screenshots
      "lh3.googleusercontent.com", // Google assets
    ],
    formats: ["image/webp", "image/avif"],
  },
  headers: async () => [
    {
      source: "/api/(.*)",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type" },
      ],
    },
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;