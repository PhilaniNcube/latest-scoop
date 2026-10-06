import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

import { fallbackAdPackages, fallbackChannels, fallbackServices, fallbackTestimonials } from './content'
import { site } from './site'
import type {
  AdPackageDoc,
  BrandDoc,
  CategoryDoc,
  ChannelDoc,
  PostDoc,
  ResolvedSiteSettings,
  ServiceDoc,
  TestimonialDoc,
  VideoDoc,
} from './types'

export type {
  AdPackageDoc,
  BrandDoc,
  CategoryDoc,
  ChannelDoc,
  PostDoc,
  ServiceDoc,
  TestimonialDoc,
  VideoDoc,
} from './types'

async function getPayloadClient() {
  return getPayload({ config })
}

/* -------------------------------------------------------------------------- */
/*  Videos                                                                    */
/* -------------------------------------------------------------------------- */

export async function getVideos(opts?: {
  limit?: number
  categorySlug?: string
  channelId?: string | number
  featured?: boolean
  sort?: string
}): Promise<VideoDoc[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('videos')
  try {
    const payload = await getPayloadClient()
    const limit = opts?.limit ?? 24
    const sort = opts?.sort ?? '-publishedAt'
    const where: Record<string, unknown> = {}
    if (opts?.featured) where.featured = { equals: true }
    if (opts?.channelId) where.channel = { equals: opts.channelId }
    if (opts?.categorySlug) {
      const cat = await payload.find({
        collection: 'categories',
        where: { slug: { equals: opts.categorySlug } },
        limit: 1,
        depth: 0,
      })
      const catId = cat.docs[0]?.id
      if (!catId) return []
      where.category = { equals: catId }
    }
    const res = await payload.find({
      collection: 'videos',
      where: Object.keys(where).length ? (where as never) : undefined,
      sort,
      limit,
      depth: 1,
    })
    return res.docs as unknown as VideoDoc[]
  } catch {
    return []
  }
}

export async function getFeaturedVideo(): Promise<VideoDoc | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('videos')
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'videos',
      where: { featured: { equals: true } },
      sort: '-publishedAt',
      limit: 1,
      depth: 1,
    })
    if (res.docs[0]) return res.docs[0] as unknown as VideoDoc
    const fallback = await payload.find({ collection: 'videos', sort: '-publishedAt', limit: 1, depth: 1 })
    return (fallback.docs[0] as unknown as VideoDoc) ?? null
  } catch {
    return null
  }
}

export async function getVideoByYoutubeId(youtubeId: string): Promise<VideoDoc | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('videos')
  cacheTag(`video-${youtubeId}`)
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'videos', where: { youtubeId: { equals: youtubeId } }, limit: 1, depth: 1 })
    return (res.docs[0] as unknown as VideoDoc) ?? null
  } catch {
    return null
  }
}

export async function getVideoById(id: string): Promise<VideoDoc | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('videos')
  try {
    const payload = await getPayloadClient()
    try {
      const doc = await payload.findByID({ collection: 'videos', id, depth: 1 })
      return doc as unknown as VideoDoc
    } catch {
      return getVideoByYoutubeId(id)
    }
  } catch {
    return null
  }
}

export async function getRelatedVideos(youtubeId: string, limit = 6): Promise<VideoDoc[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('videos')
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'videos',
      where: { youtubeId: { not_equals: youtubeId } },
      sort: '-publishedAt',
      limit,
      depth: 1,
    })
    return res.docs as unknown as VideoDoc[]
  } catch {
    return []
  }
}

/* -------------------------------------------------------------------------- */
/*  Channels                                                                  */
/* -------------------------------------------------------------------------- */

export async function getChannels(opts?: { featured?: boolean }): Promise<ChannelDoc[]> {
  'use cache'
  cacheLife('days')
  cacheTag('channels')
  try {
    const payload = await getPayloadClient()
    const where = opts?.featured
      ? { featured: { equals: true }, status: { not_equals: 'archived' } }
      : { status: { not_equals: 'archived' } }
    const res = await payload.find({
      collection: 'channels',
      where: where as never,
      sort: 'order',
      limit: 100,
      depth: 2,
    })
    const docs = res.docs as unknown as ChannelDoc[]
    return docs.length ? docs : fallbackChannels
  } catch {
    return fallbackChannels
  }
}

export async function getChannelBySlug(slug: string): Promise<ChannelDoc | null> {
  'use cache'
  cacheLife('days')
  cacheTag('channels')
  cacheTag(`channel-${slug}`)
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'channels',
      where: { slug: { equals: slug }, status: { not_equals: 'archived' } } as never,
      limit: 1,
      depth: 2,
    })
    const doc = res.docs[0] as unknown as ChannelDoc | undefined
    if (doc) return doc
  } catch {
    /* fall through to fallback */
  }
  return fallbackChannels.find((c) => c.slug === slug) ?? null
}

/** Latest videos for a channel, falling back to the freshest videos network-wide. */
export async function getChannelVideos(channel: ChannelDoc, limit = 6): Promise<VideoDoc[]> {
  const hasRealId = typeof channel.id === 'number' || (typeof channel.id === 'string' && !channel.id.startsWith('fallback'))
  if (hasRealId) {
    const scoped = await getVideos({ limit, channelId: channel.id })
    if (scoped.length) return scoped
  }
  return getVideos({ limit })
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export async function getServices(opts?: { featured?: boolean }): Promise<ServiceDoc[]> {
  'use cache'
  cacheLife('days')
  cacheTag('services')
  try {
    const payload = await getPayloadClient()
    const where: Record<string, unknown> = { status: { equals: 'published' } }
    if (opts?.featured) where.featured = { equals: true }
    const res = await payload.find({
      collection: 'services',
      where: where as never,
      sort: 'order',
      limit: 100,
      depth: 2,
    })
    const docs = res.docs as unknown as ServiceDoc[]
    return docs.length ? docs : fallbackServices
  } catch {
    return fallbackServices
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  'use cache'
  cacheLife('days')
  cacheTag('services')
  cacheTag(`service-${slug}`)
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug }, status: { equals: 'published' } } as never,
      limit: 1,
      depth: 2,
    })
    const doc = res.docs[0] as unknown as ServiceDoc | undefined
    if (doc) return doc
  } catch {
    /* fall back */
  }
  return fallbackServices.find((s) => s.slug === slug) ?? null
}

/* -------------------------------------------------------------------------- */
/*  Blog / resources                                                          */
/* -------------------------------------------------------------------------- */

export async function getPosts(opts?: { limit?: number; categorySlug?: string; tag?: string; featured?: boolean }): Promise<PostDoc[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  try {
    const payload = await getPayloadClient()
    const where: Record<string, unknown> = { status: { equals: 'published' } }
    if (opts?.featured) where.featured = { equals: true }
    if (opts?.categorySlug) {
      const cat = await payload.find({
        collection: 'categories',
        where: { slug: { equals: opts.categorySlug } },
        limit: 1,
        depth: 0,
      })
      const catId = cat.docs[0]?.id
      if (!catId) return []
      where.category = { equals: catId }
    }
    if (opts?.tag) where['tags.tag'] = { equals: opts.tag }
    const res = await payload.find({
      collection: 'posts',
      where: where as never,
      sort: '-publishedAt',
      limit: opts?.limit ?? 24,
      depth: 2,
    })
    return res.docs as unknown as PostDoc[]
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<PostDoc | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  cacheTag(`post-${slug}`)
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug }, status: { equals: 'published' } } as never,
      limit: 1,
      depth: 2,
    })
    return (res.docs[0] as unknown as PostDoc) ?? null
  } catch {
    return null
  }
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<PostDoc[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      where: { slug: { not_equals: slug }, status: { equals: 'published' } } as never,
      sort: '-publishedAt',
      limit,
      depth: 2,
    })
    return res.docs as unknown as PostDoc[]
  } catch {
    return []
  }
}

/* -------------------------------------------------------------------------- */
/*  Advertising & social proof                                                */
/* -------------------------------------------------------------------------- */

export async function getAdPackages(): Promise<AdPackageDoc[]> {
  'use cache'
  cacheLife('days')
  cacheTag('ad-packages')
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'ad-packages', sort: 'order', limit: 100, depth: 2 })
    const docs = res.docs as unknown as AdPackageDoc[]
    return docs.length ? docs : fallbackAdPackages
  } catch {
    return fallbackAdPackages
  }
}

export async function getTestimonials(opts?: { featured?: boolean; limit?: number }): Promise<TestimonialDoc[]> {
  'use cache'
  cacheLife('days')
  cacheTag('testimonials')
  try {
    const payload = await getPayloadClient()
    const where = opts?.featured ? ({ featured: { equals: true } } as never) : undefined
    const res = await payload.find({
      collection: 'testimonials',
      where,
      sort: 'order',
      limit: opts?.limit ?? 12,
      depth: 2,
    })
    const docs = res.docs as unknown as TestimonialDoc[]
    return docs.length ? docs : fallbackTestimonials
  } catch {
    return fallbackTestimonials
  }
}

/* -------------------------------------------------------------------------- */
/*  Legacy helpers retained for the video library                             */
/* -------------------------------------------------------------------------- */

export async function getCategories(): Promise<CategoryDoc[]> {
  'use cache'
  cacheLife('days')
  cacheTag('categories')
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'categories', limit: 50, sort: 'title', depth: 0 })
    return res.docs as unknown as CategoryDoc[]
  } catch {
    return []
  }
}

export async function getBrands(): Promise<BrandDoc[]> {
  'use cache'
  cacheLife('days')
  cacheTag('brands')
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'brands', limit: 50, depth: 1 })
    return res.docs as unknown as BrandDoc[]
  } catch {
    return []
  }
}

/* -------------------------------------------------------------------------- */
/*  Site settings (global)                                                    */
/* -------------------------------------------------------------------------- */

function defaultSettings(): ResolvedSiteSettings {
  return {
    brandName: site.name,
    shortName: site.shortName,
    tagline: site.tagline,
    description: site.description,
    email: site.contactEmail,
    phone: site.phone,
    location: site.location,
    logo: null,
    socials: Object.entries(site.socials).map(([platform, url]) => ({ platform, url })),
    stats: { ...site.stats },
    announcement: { enabled: false, text: '', href: '' },
    ads: { enabled: false, client: '', websiteSlot: '', channelSlot: '', blogSlot: '' },
  }
}

export async function getCurrentYear(): Promise<number> {
  'use cache'
  cacheLife('days')
  cacheTag('current-year')
  return new Date().getFullYear()
}

export async function getSiteSettings(): Promise<ResolvedSiteSettings> {
  'use cache'
  cacheLife('days')
  cacheTag('site-settings')
  const base = defaultSettings()
  try {
    const payload = await getPayloadClient()
    const doc = (await payload.findGlobal({ slug: 'site-settings', depth: 2 })) as Record<string, unknown> | null
    if (!doc) return base
    const socials =
      Array.isArray(doc.socials) && doc.socials.length ? (doc.socials as ResolvedSiteSettings['socials']) : base.socials
    const stats = (doc.stats ?? {}) as Partial<ResolvedSiteSettings['stats']>
    return {
      brandName: (doc.brandName as string) || base.brandName,
      shortName: (doc.shortName as string) || base.shortName,
      tagline: (doc.tagline as string) || base.tagline,
      description: (doc.description as string) || base.description,
      email: (doc.email as string) || base.email,
      phone: (doc.phone as string) || base.phone,
      location: (doc.location as string) || base.location,
      logo: (doc.logo as ResolvedSiteSettings['logo']) ?? null,
      socials,
      stats: {
        subscribers: stats.subscribers || base.stats.subscribers,
        views: stats.views || base.stats.views,
        videos: stats.videos || base.stats.videos,
        channels: stats.channels || base.stats.channels,
      },
      announcement: {
        enabled: Boolean(doc.announcementEnabled),
        text: (doc.announcementText as string) || '',
        href: (doc.announcementHref as string) || '',
      },
      ads: {
        enabled: Boolean(doc.adsEnabled),
        client: (doc.adsenseClient as string) || '',
        websiteSlot: (doc.websiteSlot as string) || '',
        channelSlot: (doc.channelSlot as string) || '',
        blogSlot: (doc.blogSlot as string) || '',
      },
    }
  } catch {
    return base
  }
}
