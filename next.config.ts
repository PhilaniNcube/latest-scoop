import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {},
}

export default withPayload(nextConfig)
