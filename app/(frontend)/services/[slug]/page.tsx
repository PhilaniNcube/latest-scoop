import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Sparkles } from 'lucide-react'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { Prose } from '@/components/site/rich-text'
import { ServiceCard } from '@/components/site/service-card'
import { renderIcon } from '@/components/site/icon'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { SERVICE_CATEGORY_LABELS } from '@/lib/constants'
import { getServiceBySlug, getServices, getSiteSettings } from '@/lib/data'
import { breadcrumbJsonLd, metadataFromSeo, serviceJsonLd } from '@/lib/seo'

const categoryLabels = SERVICE_CATEGORY_LABELS as Record<string, string>

export async function generateStaticParams() {
  const services = await getServices()
  const params = services.map((s) => ({ slug: s.slug }))
  return params.length ? params : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: PageProps<'/services/[slug]'>) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return metadataFromSeo({
    fallbackTitle: service.title,
    fallbackDescription: service.summary,
    path: `/services/${service.slug}`,
    seo: service.seo,
    fallbackImage: service.image,
  })
}

export default async function ServicePage({ params }: PageProps<'/services/[slug]'>) {
  const { slug } = await params
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()])
  if (!service) notFound()

  const all = await getServices()
  const related = all.filter((s) => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero eyebrow={service.category ? (categoryLabels[service.category] ?? 'Service') : 'SERVICE'} title={service.title} description={service.summary}>
        <Link href="/contact" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
          <Sparkles className="size-4" />
          {service.ctaLabel || 'Request this service'}
        </Link>
        <Link href="/services" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
          All services
        </Link>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              {renderIcon(service.icon, 'size-6')}
            </span>
            <Prose data={service.description ?? service.summary} className="mt-6" />

            {service.features?.length ? (
              <div className="mt-10">
                <h2 className="text-lg font-bold tracking-tight">What&apos;s included</h2>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f.title} className="rounded-2xl border bg-card p-5">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <Check className="size-4 text-primary" /> {f.title}
                      </p>
                      {f.description ? <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{f.description}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {service.deliverables?.length ? (
              <div className="mt-10">
                <h2 className="text-lg font-bold tracking-tight">Deliverables</h2>
                <ul className="mt-4 space-y-2">
                  {service.deliverables.map((d) => (
                    <li key={d.item} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {d.item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              {service.price ? (
                <>
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Investment</p>
                  <p className="mt-1 text-3xl font-black tracking-tight">{service.price}</p>
                  {service.priceNote ? <p className="text-xs text-muted-foreground">{service.priceNote}</p> : null}
                </>
              ) : (
                <>
                  <Badge className="rounded-full">Custom quote</Badge>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Every channel is different. Tell us about yours and we&apos;ll send a tailored proposal.
                  </p>
                </>
              )}
              <Link
                href={service.ctaHref || '/contact'}
                className={buttonVariants({ size: 'lg', className: 'mt-5 w-full rounded-full' })}
              >
                {service.ctaLabel || 'Request this service'}
              </Link>
              <Link
                href="/contact"
                className={buttonVariants({ variant: 'outline', className: 'mt-2 w-full rounded-full' })}
              >
                Book a consultation
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <AdSlot settings={settings} />
        </div>

        {related.length ? (
          <section className="mt-12 border-t pt-10">
            <h2 className="text-xl font-bold tracking-tight">You might also need</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={String(s.id)} service={s} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10">
          <Link href="/services" className={buttonVariants({ variant: 'ghost', className: 'rounded-full' })}>
            <ArrowLeft className="size-4" /> Back to all services
          </Link>
        </div>
      </div>

      <CtaBand
        title="Let's grow your channel"
        description="Book a consultation and we'll map out your next 90 days of content, branding and growth."
        primary={{ label: 'Book a consultation', href: '/contact' }}
        secondary={{ label: 'Start a channel', href: '/start-a-channel' }}
      />
    </>
  )
}
