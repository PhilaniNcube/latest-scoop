import type { BrandDoc } from '@/lib/data'
import { Quote } from 'lucide-react'

export function Testimonials({ brands }: { brands: BrandDoc[] }) {
  const withQuotes = brands.filter((b) => b.testimonial)
  if (!withQuotes.length) return null
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {withQuotes.map((b) => (
        <figure key={String(b.id)} className="rounded-2xl border bg-card p-6 shadow-sm">
          <Quote className="size-5 text-primary" />
          <blockquote className="mt-3 text-sm leading-6 text-foreground/90">“{b.testimonial}”</blockquote>
          <figcaption className="mt-3 text-xs font-semibold tracking-wide text-muted-foreground">— {b.name}</figcaption>
        </figure>
      ))}
    </div>
  )
}
