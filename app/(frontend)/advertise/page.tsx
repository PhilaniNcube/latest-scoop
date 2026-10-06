import Link from 'next/link'
import { BarChart3, Check, Globe, Play, Share2, Sparkles, Target, Users } from 'lucide-react'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { PricingCard } from '@/components/site/pricing-card'
import { QuoteForm } from '@/components/site/quote-form'
import { SectionHeading } from '@/components/site/section-heading'
import { TestimonialGrid } from '@/components/site/testimonial-grid'
import { buttonVariants } from '@/components/ui/button'
import { getAdPackages, getSiteSettings, getTestimonials } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Advertise with us',
  description:
    'Advertise on our YouTube channels, website and social media. Reach an engaged South African audience with sponsored videos, banners and campaigns.',
  path: '/advertise',
})

const placements = [
  {
    icon: Play,
    title: 'YouTube channels',
    body: 'Sponsored segments, dedicated videos, product reviews and channel takeovers seen by a loyal audience.',
  },
  {
    icon: Globe,
    title: 'Website',
    body: 'High-visibility banner placements and sponsored articles across our highest-traffic pages.',
  },
  {
    icon: Share2,
    title: 'Social media',
    body: 'Instagram, TikTok and Facebook campaigns — reels, stories and posts that extend your reach.',
  },
]

const benefits = [
  { icon: Users, title: 'An engaged audience', body: 'Real viewers who watch, comment and share — not empty impressions.' },
  { icon: Target, title: 'Culture-led reach', body: 'Your brand sits inside content people already choose to watch.' },
  { icon: Sparkles, title: 'Full-service delivery', body: 'Creative, publishing and reporting handled by our team.' },
  { icon: BarChart3, title: 'Clear reporting', body: 'Straightforward performance summaries after every campaign.' },
]

const steps = [
  { title: 'Tell us your goal', body: 'Fill in the enquiry form with your objectives, budget and timeline.' },
  { title: 'Get a proposal', body: 'We recommend the best mix of channels and placements — usually within 48 hours.' },
  { title: 'We produce & publish', body: 'Our team creates the content and ships it across the network.' },
  { title: 'See the results', body: 'You receive a clear report on reach, views and engagement.' },
]

export default async function AdvertisePage() {
  const [settings, packages, testimonials] = await Promise.all([
    getSiteSettings(),
    getAdPackages(),
    getTestimonials({ limit: 3 }),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Advertise with us', path: '/advertise' },
        ])}
      />
      <PageHero
        eyebrow="ADVERTISE WITH US"
        title="Reach an audience that actually watches"
        description="Our YouTube channels, website and social media reach a highly engaged South African audience. Let's build a campaign that gets your brand remembered."
      >
        <Link href="#enquiry" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
          Request a quote
        </Link>
        <Link href="#packages" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
          See packages
        </Link>
      </PageHero>

      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border sm:grid-cols-4">
          {[
            { label: 'Subscribers', value: settings.stats.subscribers },
            { label: 'Total views', value: settings.stats.views },
            { label: 'Videos', value: settings.stats.videos },
            { label: 'Channels', value: settings.stats.channels },
          ].map((s) => (
            <div key={s.label} className="px-3 py-7 text-center sm:py-9">
              <p className="text-2xl font-black tracking-tight sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Advertise with us', path: '/advertise' },
          ]}
        />
        <div className="mt-8">
          <SectionHeading
            eyebrow="WHERE WE CAN PUT YOUR BRAND"
            title="Three ways to reach our audience"
            description="Mix and match, or let us recommend the right combination for your goals."
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {placements.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionHeading
            eyebrow="ADVERTISING PACKAGES"
            title="Simple, transparent options"
            description="Starting points to suit different budgets. Every campaign can be tailored."
            align="center"
            className="mb-8"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <PricingCard key={String(pkg.id)} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <SectionHeading eyebrow="WHY LATEST SCOOP MEDIA" title="What you get when you work with us" align="center" className="mb-8" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {testimonials.length ? (
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <SectionHeading eyebrow="SOCIAL PROOF" title="What our partners say" align="center" className="mb-8" />
            <TestimonialGrid testimonials={testimonials} />
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <SectionHeading eyebrow="HOW IT WORKS" title="A campaign in four steps" align="center" className="mb-8" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="text-2xl font-black text-muted-foreground/30">0{i + 1}</span>
              <h3 className="mt-3 text-sm font-bold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot settings={settings} />
      </div>

      <section id="enquiry" className="scroll-mt-24 border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="REQUEST A QUOTE"
                title="Tell us about your campaign"
                description="Share your goals, audience and budget and we'll come back with a tailored proposal within 24–48 hours."
              />
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {['No obligation, no pressure', 'Custom packages available', 'Replies within 24–48 hours'].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Media kit</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Need our full rate card and audience demographics? Mention it in your message and we&apos;ll send the media kit.
                </p>
              </div>
            </div>
            <QuoteForm source="advertise" />
          </div>
        </div>
      </section>
    </>
  )
}
