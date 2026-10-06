import type { FieldHook } from 'payload'

/** Turn an arbitrary string into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['"]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

/**
 * Payload field hook that formats the current value as a slug, or falls back to
 * another field (usually `title` / `name`) when the slug is empty.
 */
export const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string' && value.trim().length > 0) return slugify(value)
    const source = (data?.[fallbackField] ?? originalDoc?.[fallbackField]) as unknown
    if (typeof source === 'string' && source.trim().length > 0) return slugify(source)
    return value
  }
