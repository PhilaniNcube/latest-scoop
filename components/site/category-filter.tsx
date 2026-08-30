'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { CategoryDoc } from '@/lib/data'

export function CategoryFilter({ categories }: { categories: CategoryDoc[] }) {
  const sp = useSearchParams()
  const active = sp.get('category')
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/videos"
        className={cn(
          'rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
          !active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
        )}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={String(c.id)}
          href={`/videos?category=${encodeURIComponent(c.slug)}`}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
            active === c.slug ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
          )}
        >
          {c.title}
        </Link>
      ))}
    </div>
  )
}
