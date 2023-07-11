/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "replicate.com",
            },
            {
              protocol: "https",
              hostname: "replicate.delivery",
            },
          ],
    },
    env: {
        REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    },
}

module.exports = nextConfig