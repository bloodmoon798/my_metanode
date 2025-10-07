/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sepolia.etherscan.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "amoy.polygonscan.com",
        port: "",
        pathname: "/assets/generic/html/**",
      },
    ],
  },
};

module.exports = nextConfig;
