import { Quote, Star } from 'lucide-react'

import { mediaAlt, mediaUrl } from '@/lib/media'
import type { TestimonialDoc } from '@/lib/types'

export function TestimonialGrid({ testimonials }: { testimonials: TestimonialDoc[] }) {
  if (!testimonials.length) return null
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => {
        const avatar = mediaUrl(t.avatar, 'thumbnail')
        return (
          <figure key={String(t.id)} className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
            <Quote className="size-5 text-primary" />
            {t.rating ? (
              <div className="mt-3 flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={i < (t.rating ?? 0) ? 'size-3.5 fill-amber-400 text-amber-400' : 'size-3.5 text-muted'} />
                ))}
              </div>
            ) : null}
            <blockquote className="mt-3 flex-1 text-sm leading-6 text-foreground/90">“{t.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt={mediaAlt(t.avatar, t.authorName)} className="size-9 rounded-full object-cover" loading="lazy" />
              ) : (
                <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {t.authorName.slice(0, 1).toUpperCase()}
                </span>
              )}
              <span className="text-xs">
                <span className="block font-semibold text-foreground">{t.authorName}</span>
                <span className="block text-muted-foreground">
                  {[t.authorRole, t.company].filter(Boolean).join(', ')}
                </span>
              </span>
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}
