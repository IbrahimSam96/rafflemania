const isProd = process.env.NODE_ENV === "production";


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  assetPrefix: isProd ? "https://raffle-mania-lsezxd.spheron.app" : "",
  trailingSlash: true,
}

module.exports = nextConfig
