import type { BrandDoc } from '@/lib/data'

export function BrandStrip({ brands }: { brands: BrandDoc[] }) {
  if (!brands.length) {
    return (
      <div className="rounded-xl border border-dashed bg-card px-6 py-8 text-center text-sm text-muted-foreground">
        Brand partners will appear here. Add them in Payload → Brands.
      </div>
    )
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {brands.map((b) => (
        <a
          key={String(b.id)}
          href={b.url || '#'}
          target={b.url ? '_blank' : undefined}
          rel={b.url ? 'noopener noreferrer' : undefined}
          className="flex min-h-[88px] items-center justify-center rounded-xl border bg-card px-4 py-6 text-center text-sm font-semibold shadow-sm transition hover:shadow"
        >
          {b.name}
        </a>
      ))}
    </div>
  )
}
