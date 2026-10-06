/** Social platforms supported across channels, brand settings and the site footer. */
export const SOCIAL_PLATFORMS = [
  'youtube',
  'instagram',
  'tiktok',
  'facebook',
  'x',
  'linkedin',
  'threads',
  'whatsapp',
  'newsletter',
  'website',
] as const

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number]

export const SOCIAL_PLATFORM_LABELS: Record<SocialPlatform, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  x: 'X (Twitter)',
  linkedin: 'LinkedIn',
  threads: 'Threads',
  whatsapp: 'WhatsApp',
  newsletter: 'Newsletter',
  website: 'Website',
}

/** Service categories used by the Services collection and filters. */
export const SERVICE_CATEGORIES = [
  'channel-setup',
  'growth',
  'branding',
  'content',
  'analytics',
  'monetization',
  'consulting',
] as const

export const SERVICE_CATEGORY_LABELS: Record<(typeof SERVICE_CATEGORIES)[number], string> = {
  'channel-setup': 'Channel setup',
  growth: 'Growth & strategy',
  branding: 'Branding & design',
  content: 'Content & Shorts',
  analytics: 'Analytics',
  monetization: 'Monetization',
  consulting: 'Consulting',
}

/** Advertising placements offered to brands. */
export const AD_PLACEMENTS = ['website', 'youtube', 'social', 'bundle', 'custom'] as const

export const AD_PLACEMENT_LABELS: Record<(typeof AD_PLACEMENTS)[number], string> = {
  website: 'Website',
  youtube: 'YouTube',
  social: 'Social media',
  bundle: 'Bundle (all platforms)',
  custom: 'Custom campaign',
}
