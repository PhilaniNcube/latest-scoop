import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { SERVICE_CATEGORY_LABELS } from '@/lib/constants'
import type { ServiceDoc } from '@/lib/types'
import { renderIcon } from './icon'

const categoryLabels = SERVICE_CATEGORY_LABELS as Record<string, string>

export function ServiceCard({ service }: { service: ServiceDoc }) {
  const features = (service.features ?? []).slice(0, 4)
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
        {renderIcon(service.icon, 'size-5')}
      </span>
      {service.category ? (
        <p className="mt-4 text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
          {categoryLabels[service.category] ?? service.category}
        </p>
      ) : null}
      <h3 className="mt-1 text-base font-bold tracking-tight">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.summary}</p>
      {features.length ? (
        <ul className="mt-4 space-y-1.5 text-sm">
          {features.map((f) => (
            <li key={f.title} className="flex gap-2 text-muted-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span>{f.title}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div>
          {service.price ? <p className="text-sm font-bold">{service.price}</p> : null}
          {service.priceNote ? <p className="text-[11px] text-muted-foreground">{service.priceNote}</p> : null}
        </div>
        <Link
          href={`/services/${service.slug}`}
          className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}
        >
          Learn more <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}

export function ServiceGrid({ services }: { services: ServiceDoc[] }) {
  if (!services.length) {
    return (
      <p className="rounded-xl border border-dashed bg-card px-6 py-10 text-center text-sm text-muted-foreground">
        Services will appear here. Add them in Payload → YouTube services.
      </p>
    )
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={String(service.id)} service={service} />
      ))}
    </div>
  )
}
