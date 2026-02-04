/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyCbinafIhh5cHsoC4vU35Zu0DbOHe-SjVc',
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || 'c0c51dfc-f71c-4b82-a0c5-006b88e91631',
    STRIPE_API_KEY: process.env.STRIPE_API_KEY || 'EE4GPYN-SB2MM6W-MP2EEGW-Y5N3ZGG',
    STRIPE_IPN_SECRET: process.env.STRIPE_IPN_SECRET || '/otKp+iC3B51OZib9kkBgdLxrlH+aihs',
    REDIS_URL: process.env.REDIS_URL,
  },
}

module.exports = nextConfig