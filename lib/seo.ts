import type { Metadata } from 'next'

import { site } from './site'
import { mediaUrl } from './media'
import type { ChannelDoc, MediaLike, PostDoc, SeoLike, ServiceDoc, VideoDoc } from './types'

export function absoluteUrl(path = '/'): string {
  const base = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
  try {
    return new URL(path, `${base}/`).toString()
  } catch {
    return `${base}${path.startsWith('/') ? path : `/${path}`}`
  }
}

type BuildMetadataInput = {
  title: string
  description?: string | null
  path: string
  image?: string | null
  keywords?: string | null
  type?: 'website' | 'article' | 'video.other'
  publishedTime?: string | null
  noIndex?: boolean
  siteName?: string
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const { title, description, path, image, keywords, type = 'website', publishedTime, noIndex, siteName } = input
  const url = absoluteUrl(path)
  const images = image ? [{ url: image }] : undefined
  return {
    title,
    description: description ?? undefined,
    keywords: keywords ? keywords.split(',').map((k) => k.trim()).filter(Boolean) : undefined,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description: description ?? undefined,
      url,
      siteName: siteName ?? site.name,
      type,
      images,
      ...(publishedTime ? { publishedTime } : {}),
    } as Metadata['openGraph'],
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? undefined,
      images: images?.map((i) => i.url),
    },
  }
}

/** Compute a canonical metadata object from a CMS doc's `seo` group. */
export function metadataFromSeo(args: {
  fallbackTitle: string
  fallbackDescription: string
  path: string
  seo?: SeoLike
  fallbackImage?: MediaLike | string | number | null
  type?: BuildMetadataInput['type']
  publishedTime?: string | null
  siteName?: string
}): Metadata {
  const { seo, fallbackTitle, fallbackDescription, path, fallbackImage, type, publishedTime, siteName } = args
  const image = mediaUrl(seo?.image) ?? mediaUrl(fallbackImage) ?? null
  return buildMetadata({
    title: seo?.title || fallbackTitle,
    description: seo?.description || fallbackDescription,
    path,
    image: image ? absoluteUrl(image) : null,
    keywords: seo?.keywords ?? null,
    type,
    publishedTime,
    noIndex: Boolean(seo?.noIndex),
    siteName,
  })
}

/* -------------------------------------------------------------------------- */
/*  Structured data (JSON-LD)                                                 */
/* -------------------------------------------------------------------------- */

export function organizationJsonLd(settings: {
  brandName: string
  description: string
  email: string
  socials: { platform: string; url: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.brandName,
    description: settings.description,
    url: absoluteUrl('/'),
    email: settings.email || undefined,
    logo: absoluteUrl('/favicon.ico'),
    sameAs: settings.socials
      .filter((s) => s.platform !== 'newsletter' && s.platform !== 'website')
      .map((s) => s.url),
  }
}

export function websiteJsonLd(settings: { brandName: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.brandName,
    url: absoluteUrl('/'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/blog')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function articleJsonLd(post: PostDoc) {
  const image = mediaUrl(post.coverImage)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || post.createdAt || undefined,
    dateModified: post.updatedAt || post.publishedAt || undefined,
    author: { '@type': 'Organization', name: post.authorName || site.name },
    publisher: { '@type': 'Organization', name: site.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: image ? [image] : undefined,
  }
}

export function videoJsonLd(video: VideoDoc) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description || undefined,
    thumbnailUrl: [video.thumbnail || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`],
    uploadDate: video.publishedAt || undefined,
    embedUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
    url: absoluteUrl(`/watch/${video.youtubeId}`),
  }
}

export function serviceJsonLd(service: ServiceDoc) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: { '@type': 'Organization', name: site.name },
    url: absoluteUrl(`/services/${service.slug}`),
    ...(service.price ? { offers: { '@type': 'Offer', price: service.price, priceCurrency: 'ZAR' } } : {}),
  }
}

export function channelJsonLd(channel: ChannelDoc) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: channel.name,
    description: channel.shortDescription || channel.tagline || undefined,
    url: channel.url || absoluteUrl(`/channels/${channel.slug}`),
    sameAs: (channel.socials || []).map((s) => s.url),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
