/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doom.elsayed.aait-d.com",
        port: "",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "doom.elsayed.aait-d.com",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
