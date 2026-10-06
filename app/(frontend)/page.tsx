import Link from 'next/link'
import { ArrowRight, BarChart3, Megaphone, Rocket, Sparkles } from 'lucide-react'

import { AdSlot } from '@/components/site/ad-slot'
import { ChannelGrid } from '@/components/site/channel-grid'
import { CtaBand } from '@/components/site/cta-band'
import { FeaturedVideo } from '@/components/site/featured-video'
import { Hero } from '@/components/site/hero'
import { NewsletterForm } from '@/components/site/newsletter-form'
import { PostGrid } from '@/components/site/post-card'
import { PricingCard } from '@/components/site/pricing-card'
import { SectionHeading } from '@/components/site/section-heading'
import { ServiceGrid } from '@/components/site/service-card'
import { StatBand } from '@/components/site/stat-band'
import { TestimonialGrid } from '@/components/site/testimonial-grid'
import { VideoGrid } from '@/components/site/video-grid'
import { buttonVariants } from '@/components/ui/button'
import {
  getAdPackages,
  getChannels,
  getFeaturedVideo,
  getPosts,
  getServices,
  getSiteSettings,
  getTestimonials,
  getVideos,
} from '@/lib/data'

export default async function HomePage() {
  const [settings, channels, services, adPackages, testimonials, posts, featured, latest] = await Promise.all([
    getSiteSettings(),
    getChannels(),
    getServices(),
    getAdPackages(),
    getTestimonials({ featured: true, limit: 3 }),
    getPosts({ limit: 3 }),
    getFeaturedVideo(),
    getVideos({ limit: 6 }),
  ])

  const featuredChannels = channels.slice(0, 3)
  const featuredServices = services.slice(0, 6)
  const featuredPackages = adPackages.slice(0, 3)

  return (
    <>
      <Hero settings={settings} channel={featuredChannels[0] ?? null} />
      <StatBand settings={settings} />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="OUR YOUTUBE CHANNELS"
            title="A growing network of channels"
            description="Each channel is built around a clear audience. Explore them, subscribe, and watch what's next."
          />
          <Link href="/channels" className={buttonVariants({ variant: 'outline', className: 'w-fit rounded-full' })}>
            All channels <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6">
          <ChannelGrid channels={featuredChannels} showAddCard={featuredChannels.length < 3} />
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="YOUTUBE SERVICES"
              title="Help to start and grow your channel"
              description="From your first upload to monetization — strategy, branding, Shorts, thumbnails and analytics."
            />
            <Link href="/services" className={buttonVariants({ variant: 'outline', className: 'w-fit rounded-full' })}>
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6">
            <ServiceGrid services={featuredServices} />
          </div>
        </div>
      </section>

      {featured || latest.length ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionHeading eyebrow="LATEST VIDEOS" title="Fresh from the network" description="New uploads across our channels." />
          <div className="mt-6">{featured ? <FeaturedVideo video={featured} /> : <VideoGrid videos={latest} />}</div>
          {latest.length ? (
            <div className="mt-6">
              <VideoGrid videos={latest.slice(0, 3)} />
            </div>
          ) : null}
          <div className="mt-6 flex justify-center">
            <Link href="/videos" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
              Browse all videos <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      ) : null}

      <AdSlot settings={settings} className="max-w-4xl px-4 sm:px-6" />

      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="ADVERTISE WITH US"
              title="Put your brand where the audience is"
              description="Reach engaged viewers on our YouTube channels, across the website and on social media."
            />
            <Link href="/advertise" className={buttonVariants({ className: 'w-fit rounded-full' })}>
              See ad packages <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPackages.map((pkg) => (
              <PricingCard key={String(pkg.id)} pkg={pkg} />
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Rocket, title: 'Audience-first', body: 'Engaged South African viewers who actually watch.' },
              { icon: Megaphone, title: 'Full service', body: 'Creative, distribution and reporting handled for you.' },
              { icon: BarChart3, title: 'Measurable', body: 'Clear reporting on views, reach and engagement.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border bg-background p-5">
                <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-3 text-sm font-bold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionHeading eyebrow="SOCIAL PROOF" title="What partners and creators say" align="center" className="mb-6" />
          <TestimonialGrid testimonials={testimonials} />
        </section>
      ) : null}

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="BLOG & RESOURCES"
              title="Guides for creators and marketers"
              description="Practical articles on YouTube, content creation, social media and growing an audience."
            />
            <Link href="/blog" className={buttonVariants({ variant: 'outline', className: 'w-fit rounded-full' })}>
              Visit the blog <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6">
            <PostGrid posts={posts} emptyText="Fresh guides are on the way — check back soon." />
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to start or grow your channel?"
        description="Book a consultation and we'll map out your niche, content and path to monetization — or tell us about your brand campaign."
        primary={{ label: 'Start your channel', href: '/start-a-channel' }}
        secondary={{ label: 'Partner with us', href: '/advertise' }}
      >
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            <Sparkles className="mr-1 inline size-3.5" /> Get creator tips &amp; network news
          </p>
          <NewsletterForm source="home" className="mx-auto" />
        </div>
      </CtaBand>
    </>
  )
}
