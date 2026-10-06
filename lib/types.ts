export type MediaLike = {
  id?: string | number
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
  sizes?: Record<string, { url?: string | null } | undefined> | null
} | null

export type SeoLike = {
  title?: string | null
  description?: string | null
  image?: MediaLike | string | number | null
  keywords?: string | null
  noIndex?: boolean | null
} | null

export type CategoryDoc = { id: string | number; title: string; slug: string }

export type BrandDoc = {
  id: string | number
  name: string
  url?: string | null
  testimonial?: string | null
  logo?: MediaLike | string | number | null
}

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
  channel?: { id: string | number; name: string; slug: string } | string | number | null
}

export type ChannelSocial = { platform: string; url: string; label?: string | null }

export type ChannelDoc = {
  id: string | number
  name: string
  slug: string
  tagline?: string | null
  handle?: string | null
  channelId?: string | null
  url?: string | null
  shortDescription?: string | null
  description?: unknown
  logo?: MediaLike
  banner?: MediaLike
  subscriberCount?: number | null
  viewCount?: number | null
  videoCount?: number | null
  socials?: ChannelSocial[] | null
  featured?: boolean | null
  order?: number | null
  status?: string | null
  seo?: SeoLike
}

export type ServiceFeature = { id?: string; title: string; description?: string | null }
export type ServiceDeliverable = { id?: string; item: string }

export type ServiceDoc = {
  id: string | number
  title: string
  slug: string
  icon?: string | null
  category?: string | null
  summary: string
  description?: unknown
  image?: MediaLike
  features?: ServiceFeature[] | null
  deliverables?: ServiceDeliverable[] | null
  price?: string | null
  priceNote?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  featured?: boolean | null
  order?: number | null
  status?: string | null
  seo?: SeoLike
}

export type AdPackageDoc = {
  id: string | number
  name: string
  slug: string
  placement: string
  summary: string
  description?: unknown
  price: string
  billingPeriod?: string | null
  features?: { id?: string; item: string }[] | null
  popular?: boolean | null
  ctaLabel?: string | null
  ctaHref?: string | null
  order?: number | null
  seo?: SeoLike
}

export type TestimonialDoc = {
  id: string | number
  quote: string
  authorName: string
  authorRole?: string | null
  company?: string | null
  avatar?: MediaLike
  rating?: number | null
  source?: string | null
  featured?: boolean | null
  order?: number | null
}

export type PostDoc = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  content?: unknown
  coverImage?: MediaLike
  authorName?: string | null
  category?: { id: string | number; title: string; slug: string } | string | number | null
  tags?: { id?: string; tag: string }[] | null
  publishedAt?: string | null
  readingTime?: number | null
  featured?: boolean | null
  status?: string | null
  seo?: SeoLike
  updatedAt?: string | null
  createdAt?: string | null
}

export type SocialLink = { platform: string; url: string; label?: string | null }

export type ResolvedSiteSettings = {
  brandName: string
  shortName: string
  tagline: string
  description: string
  email: string
  phone: string
  location: string
  logo: MediaLike
  socials: SocialLink[]
  stats: { subscribers: string; views: string; videos: string; channels: string }
  announcement: { enabled: boolean; text: string; href: string }
  ads: {
    enabled: boolean
    client: string
    websiteSlot: string
    channelSlot: string
    blogSlot: string
  }
}
