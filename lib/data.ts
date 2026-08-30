import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheLife, cacheTag } from 'next/cache'

export type VideoDoc = {
  id: string | number
  youtubeId: string
  title: string
  description?: string | null
  thumbnail?: string | null
  publishedAt?: string | null
  duration?: string | null
  viewCount?: number | null
  likeCount?: number | null
  featured?: boolean | null
  category?: { id: string | number; title: string; slug: string } | string | number | null
}

export type CategoryDoc = { id: string | number; title: string; slug: string }
export type BrandDoc = { id: string | number; name: string; url?: string | null; testimonial?: string | null; logo?: unknown }

async function getPayloadClient() {
  return getPayload({ config })
}

export async function getVideos(opts?: {
  limit?: number
  categorySlug?: string
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
    if (opts?.featured) (where as Record<string, unknown>).featured = { equals: true }
    if (opts?.categorySlug) {
      const cat = await payload.find({
        collection: 'categories',
        where: { slug: { equals: opts.categorySlug } },
        limit: 1,
        depth: 0,
      })
      const catId = cat.docs[0]?.id
      if (!catId) return []
      ;(where as Record<string, unknown>).category = { equals: catId }
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
