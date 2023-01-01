/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: { defaultLocale: "de", locales: ["de", "en"] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "melanchthon.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
