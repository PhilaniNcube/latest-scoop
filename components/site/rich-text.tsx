import { RichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

/**
 * Consistent typographic treatment for Lexical rich text coming from Payload.
 * Styling lives in `.prose-latest` in globals.css. Plain strings are tolerated
 * so fallback content can be rendered without a Lexical document.
 */
export function Prose({ data, className }: { data: unknown; className?: string }) {
  if (!data) return null
  if (typeof data === 'string') {
    return (
      <div className={cn('prose-latest', className)}>
        <p>{data}</p>
      </div>
    )
  }
  return <RichText data={data as never} className={cn('prose-latest', className)} />
}
