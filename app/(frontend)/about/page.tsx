import Link from 'next/link'
import { BarChart3, HeartHandshake, Rocket, Users } from 'lucide-react'

import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ChannelGrid } from '@/components/site/channel-grid'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { StatBand } from '@/components/site/stat-band'
import { buttonVariants } from '@/components/ui/button'
import { getChannels, getSiteSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata, organizationJsonLd } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'About us',
  description:
    'Latest Scoop Media is a South African digital media network running YouTube channels, creator services and brand campaigns.',
  path: '/about',
})

const values = [
  { icon: Users, title: 'Audience first', body: 'We make content people choose to watch, then build everything else around that.' },
  { icon: Rocket, title: 'Always growing', body: 'New channels, new formats and new services — we invest in the long game.' },
  { icon: HeartHandshake, title: 'Creator friendly', body: 'We share what works and help other creators succeed, not just ourselves.' },
  { icon: BarChart3, title: 'Data driven', body: 'Every decision is guided by analytics, testing and real audience feedback.' },
]

const whatWeDo = [
  { title: 'We run YouTube channels', body: 'A growing network of channels built for specific audiences across entertainment and beyond.' },
  { title: 'We help creators grow', body: 'Coaching, done-for-you services and strategy for anyone starting or scaling a channel.' },
  { title: 'We connect brands to audiences', body: 'Sponsored videos, website placements and social campaigns with clear reporting.' },
]

export default async function AboutPage() {
  const [settings, channels] = await Promise.all([getSiteSettings(), getChannels()])

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(settings),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="ABOUT US"
        title="A digital media company built for creators and brands"
        description={settings.description}
      >
        <Link href="/channels" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
          Explore our channels
        </Link>
        <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
          Work with us
        </Link>
      </PageHero>

      <StatBand settings={settings} />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]}
        />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5 text-[15px] leading-7 text-muted-foreground">
            <SectionHeading eyebrow="OUR STORY" title="From one channel to a network" />
            <p>
              Latest Scoop Media started with a single YouTube channel and a simple idea: tell stories people actually care
              about. That channel grew into the flagship of a network, and today we do three things really well — run
              channels, help creators grow, and connect brands with engaged audiences.
            </p>
            <p>
              We are proudly South African, digital-native and obsessed with the craft of making content that performs. As
              we add channels, services and products, our mission stays the same: {site.mission}
            </p>
          </div>
          <div className="space-y-4">
            {whatWeDo.map((item) => (
              <div key={item.title} className="rounded-2xl border bg-card p-5 shadow-sm">
                <h3 className="text-sm font-bold tracking-tight">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionHeading eyebrow="THE NETWORK" title="Our channels" description="Each one built for its own audience." />
          <div className="mt-6">
            <ChannelGrid channels={channels.slice(0, 3)} showAddCard={channels.length < 3} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <SectionHeading eyebrow="WHAT WE VALUE" title="How we work" align="center" className="mb-8" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, body }) => (
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

      <CtaBand
        title="Let's build something together"
        description="Whether you're a creator starting out or a brand looking to reach the right audience, there's a place for you here."
        primary={{ label: 'Start a YouTube channel', href: '/start-a-channel' }}
        secondary={{ label: 'Advertise with us', href: '/advertise' }}
      />
    </>
  )
}
