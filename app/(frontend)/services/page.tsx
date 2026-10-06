import Link from 'next/link'
import { Compass, Megaphone, Rocket, TrendingUp } from 'lucide-react'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { ServiceGrid } from '@/components/site/service-card'
import { buttonVariants } from '@/components/ui/button'
import { getServices, getSiteSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'YouTube services',
  description:
    'YouTube channel setup, niche selection, branding, content ideas, Shorts strategy, thumbnails, analytics, monetization guidance and one-on-one consultations.',
  path: '/services',
})

const process = [
  { icon: Compass, title: 'Discover', body: 'A short call to understand your goals, audience and where you are now.' },
  { icon: Rocket, title: 'Build', body: 'We set up or refresh your channel so it looks and works like a pro.' },
  { icon: TrendingUp, title: 'Grow', body: 'Content plans, thumbnails, titles and Shorts that bring new viewers in.' },
  { icon: Megaphone, title: 'Monetize', body: 'AdSense, memberships, products and brand deals that turn views into income.' },
]

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <PageHero
        eyebrow="YOUTUBE SERVICES"
        title="Everything you need to start and grow a channel"
        description="Whether you're uploading your first video or stuck at your current subscriber count, we have a service that fits — from setup and branding to analytics and monetization."
      >
        <Link href="/start-a-channel" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
          Start a channel
        </Link>
        <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
          Book a consultation
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]}
        />
        <div className="mt-6">
          <ServiceGrid services={services} />
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="A simple path from idea to income"
            description="Pick a single service or let us handle the whole journey."
            align="center"
            className="mb-8"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(({ icon: Icon, title, body }, index) => (
              <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-2xl font-black text-muted-foreground/30">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-bold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <AdSlot settings={settings} />
      </div>

      <CtaBand
        title="Not sure which service you need?"
        description="Tell us where your channel is today and we'll recommend the fastest path forward — no obligation."
        primary={{ label: 'Get a free recommendation', href: '/contact' }}
        secondary={{ label: 'Start from scratch', href: '/start-a-channel' }}
      />
    </>
  )
}
