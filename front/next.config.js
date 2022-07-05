// vanilla-extract config
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  trailingSlash: true,
  // 本PJはgenerateでの利用を想定
  // そのため、rewritesは実質的にローカル環境でのみ有効
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*', // Proxy to Backend
      },
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // サーバービルドでなければfsをfalseにする
      config.resolve.fallback.fs = false
    }
    return config
  },
}

module.exports = withVanillaExtract(nextConfig)
