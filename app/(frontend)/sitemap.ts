import type { MetadataRoute } from 'next'

import { getChannels, getPosts, getServices, getVideos } from '@/lib/data'
import { absoluteUrl } from '@/lib/seo'

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'daily' },
  { path: '/channels', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/start-a-channel', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/advertise', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/videos', priority: 0.8, changeFrequency: 'daily' },
  { path: '/social', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/brands', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [channels, services, posts, videos] = await Promise.all([
    getChannels(),
    getServices(),
    getPosts({ limit: 100 }),
    getVideos({ limit: 100 }),
  ])

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...channels.map((channel) => ({
      url: absoluteUrl(`/channels/${channel.slug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      ...(post.publishedAt ? { lastModified: new Date(post.publishedAt) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...videos.map((video) => ({
      url: absoluteUrl(`/watch/${video.youtubeId}`),
      ...(video.publishedAt ? { lastModified: new Date(video.publishedAt) } : {}),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ]
}
