/** @type {import('next').NextConfig} */
try {
  // Enables `getCloudflareContext()` during `next dev` by wiring Wrangler's platform proxy.
  // Safe no-op outside local dev / when the adapter isn't installed.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare')
  initOpenNextCloudflareForDev()
} catch {
  // ignore
}

const nextConfig = {
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
