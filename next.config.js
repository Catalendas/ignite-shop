/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "files.stripe.com"
    ]
  },
}

module.exports = nextConfig
