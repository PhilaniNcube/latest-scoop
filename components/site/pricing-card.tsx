import Link from 'next/link'
import { Check, Star } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { AD_PLACEMENT_LABELS } from '@/lib/constants'
import type { AdPackageDoc } from '@/lib/types'
import { cn } from '@/lib/utils'

const placementLabels = AD_PLACEMENT_LABELS as Record<string, string>

export function PricingCard({ pkg }: { pkg: AdPackageDoc }) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm',
        pkg.popular && 'border-primary/50 ring-1 ring-primary/20',
      )}
    >
      {pkg.popular ? (
        <Badge className="absolute -top-3 left-6 rounded-full">
          <Star className="size-3 fill-current" /> Most popular
        </Badge>
      ) : null}
      <p className="text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
        {placementLabels[pkg.placement] ?? pkg.placement}
      </p>
      <h3 className="mt-1 text-lg font-bold tracking-tight">{pkg.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{pkg.summary}</p>
      <div className="mt-5">
        <span className="text-2xl font-black tracking-tight">{pkg.price}</span>
        {pkg.billingPeriod ? <span className="ml-1 text-xs text-muted-foreground">{pkg.billingPeriod}</span> : null}
      </div>
      {pkg.features?.length ? (
        <ul className="mt-5 space-y-2 text-sm">
          {pkg.features.map((f) => (
            <li key={f.item} className="flex gap-2 text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{f.item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <Link
        href={pkg.ctaHref || '/advertise#enquiry'}
        className={buttonVariants({
          variant: pkg.popular ? 'default' : 'outline',
          className: 'mt-6 w-full rounded-full',
        })}
      >
        {pkg.ctaLabel || 'Request a quote'}
      </Link>
    </div>
  )
}
