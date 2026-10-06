import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

function mediaHost(): string | null {
  const url = process.env.R2_PUBLIC_URL
  if (!url) return null
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}

const host = mediaHost()

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      ...(host ? [{ protocol: 'https' as const, hostname: host }] : []),
    ],
  },
}

export default withPayload(nextConfig)
