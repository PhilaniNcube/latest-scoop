import type { MediaLike } from './types'

/**
 * Payload upload fields can be an id, a populated object, or null depending on
 * query depth. These helpers normalise access to a usable URL and alt text.
 */
export function mediaUrl(media: MediaLike | string | number | null | undefined, size?: string): string | null {
  if (!media || typeof media !== 'object') return null
  if (size) {
    const sized = media.sizes?.[size]
    if (sized?.url) return sized.url
  }
  return media.url ?? null
}

export function mediaAlt(media: MediaLike | string | number | null | undefined, fallback = ''): string {
  if (!media || typeof media !== 'object') return fallback
  return media.alt || fallback
}

export function mediaDimensions(media: MediaLike | string | number | null | undefined): { width: number; height: number } {
  if (!media || typeof media !== 'object') return { width: 1200, height: 675 }
  return { width: media.width || 1200, height: media.height || 675 }
}

/** Produce 1–2 uppercase initials from a name, used when no logo is available. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}
