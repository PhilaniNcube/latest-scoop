import Link from 'next/link'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ChannelGrid } from '@/components/site/channel-grid'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { buttonVariants } from '@/components/ui/button'
import { getChannels, getSiteSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Our YouTube channels',
  description:
    'Explore every YouTube channel in the Latest Scoop Media network — each built for a clear audience, with new videos every week.',
  path: '/channels',
})

export default async function ChannelsPage() {
  const [settings, channels] = await Promise.all([getSiteSettings(), getChannels()])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Channels', path: '/channels' },
        ])}
      />
      <PageHero
        eyebrow="OUR YOUTUBE CHANNELS"
        title="A network built channel by channel"
        description="Every channel has a clear audience and a reason to exist. Subscribe to the ones you love — we're always launching more."
      >
        <a
          href={site.subscribeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: 'lg', className: 'rounded-full' })}
        >
          Subscribe on YouTube
        </a>
        <Link href="/start-a-channel" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
          Launch your own channel
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Channels', path: '/channels' },
          ]}
        />
        <div className="mt-6">
          <ChannelGrid channels={channels} showAddCard />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot settings={settings} />
      </div>

      <CtaBand
        title="Want a channel like these?"
        description="We help creators go from idea to a fully-branded, growing YouTube channel — and we can manage it with you."
        primary={{ label: 'Start a YouTube channel', href: '/start-a-channel' }}
        secondary={{ label: 'See our services', href: '/services' }}
      />
    </>
  )
}
