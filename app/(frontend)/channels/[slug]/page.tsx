import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Play, Users } from 'lucide-react'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ChannelCard } from '@/components/site/channel-card'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/site/json-ld'
import { Prose } from '@/components/site/rich-text'
import { SocialLinks } from '@/components/site/social-links'
import { VideoGrid } from '@/components/site/video-grid'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { formatCount } from '@/lib/format'
import { getChannelBySlug, getChannelVideos, getChannels, getSiteSettings } from '@/lib/data'
import { initials, mediaAlt, mediaUrl } from '@/lib/media'
import { breadcrumbJsonLd, channelJsonLd, metadataFromSeo } from '@/lib/seo'

export async function generateStaticParams() {
  const channels = await getChannels()
  const params = channels.map((c) => ({ slug: c.slug }))
  return params.length ? params : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: PageProps<'/channels/[slug]'>) {
  const { slug } = await params
  const channel = await getChannelBySlug(slug)
  if (!channel) return {}
  return metadataFromSeo({
    fallbackTitle: channel.name,
    fallbackDescription: channel.shortDescription || channel.tagline || `Watch ${channel.name} on YouTube.`,
    path: `/channels/${channel.slug}`,
    seo: channel.seo,
    fallbackImage: channel.banner ?? channel.logo,
  })
}

export default async function ChannelPage({ params }: PageProps<'/channels/[slug]'>) {
  const { slug } = await params
  const [channel, settings] = await Promise.all([getChannelBySlug(slug), getSiteSettings()])
  if (!channel) notFound()

  const [videos, allChannels] = await Promise.all([getChannelVideos(channel, 6), getChannels()])
  const others = allChannels.filter((c) => c.slug !== channel.slug).slice(0, 3)
  const banner = mediaUrl(channel.banner)
  const logo = mediaUrl(channel.logo, 'thumbnail') ?? mediaUrl(channel.logo)
  const socials = (channel.socials ?? []).filter((s) => s.platform !== 'youtube')

  const stats = [
    { label: 'Subscribers', value: channel.subscriberCount },
    { label: 'Views', value: channel.viewCount },
    { label: 'Videos', value: channel.videoCount },
  ].filter((s) => s.value != null && s.value > 0)

  return (
    <>
      <JsonLd
        data={[
          channelJsonLd(channel),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Channels', path: '/channels' },
            { name: channel.name, path: `/channels/${channel.slug}` },
          ]),
        ]}
      />

      <section className="relative border-b">
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary via-fuchsia-600 to-amber-400 sm:h-56">
          {banner ? <Image src={banner} alt="" fill className="object-cover" sizes="100vw" unoptimized priority /> : null}
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="-mt-14 flex flex-col gap-5 pb-8 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <span className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-3xl border-4 border-background bg-card text-2xl font-black text-primary shadow-lg sm:size-28">
                {logo ? (
                  <Image src={logo} alt={mediaAlt(channel.logo, channel.name)} width={112} height={112} className="size-full object-cover" unoptimized />
                ) : (
                  initials(channel.name)
                )}
              </span>
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{channel.name}</h1>
                  {channel.status === 'coming-soon' ? <Badge variant="secondary">Coming soon</Badge> : null}
                </div>
                {channel.handle ? <p className="mt-1 text-sm font-medium text-muted-foreground">{channel.handle}</p> : null}
              </div>
            </div>
            {channel.url ? (
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ size: 'lg', className: 'w-fit rounded-full' })}
              >
                <Play className="size-4 fill-current" />
                Visit on YouTube
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Channels', path: '/channels' },
            { name: channel.name, path: `/channels/${channel.slug}` },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="text-lg font-semibold leading-7 tracking-tight">
              {channel.shortDescription || channel.tagline || `Watch ${channel.name} on YouTube.`}
            </p>
            <Prose data={channel.description} className="mt-5" />

            {socials.length ? (
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Follow this channel</p>
                <SocialLinks links={socials} />
              </div>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Channel at a glance</p>
              {stats.length ? (
                <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl bg-muted/50 px-2 py-3">
                      <dt className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{s.label}</dt>
                      <dd className="mt-1 text-lg font-black tracking-tight">{formatCount(s.value)}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" /> Stats sync from YouTube automatically once connected.
                </p>
              )}
              {channel.url ? (
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'outline', className: 'mt-5 w-full rounded-full' })}
                >
                  Open channel <ExternalLink className="size-3.5" />
                </a>
              ) : null}
            </div>
          </aside>
        </div>

        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight">Latest videos</h2>
            <Link href="/videos" className="text-sm font-semibold text-primary hover:underline">
              All videos
            </Link>
          </div>
          <div className="mt-5">
            <VideoGrid videos={videos} emptyText="Videos from this channel will appear here once synced." />
          </div>
        </section>

        <div className="mt-12">
          <AdSlot settings={settings} variant="leaderboard" />
        </div>

        {others.length ? (
          <section className="mt-12 border-t pt-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-bold tracking-tight">More from the network</h2>
              <Link href="/channels" className="text-sm font-semibold text-primary hover:underline">
                All channels
              </Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((c) => (
                <ChannelCard key={String(c.id)} channel={c} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10">
          <Link
            href="/channels"
            className={buttonVariants({ variant: 'ghost', className: 'rounded-full' })}
          >
            <ArrowLeft className="size-4" /> Back to all channels
          </Link>
        </div>
      </div>

      <CtaBand
        title="Want your own channel in the network?"
        description="We build and grow YouTube channels — or help you do it yourself with coaching and done-for-you services."
        primary={{ label: 'Start a YouTube channel', href: '/start-a-channel' }}
        secondary={{ label: 'Explore services', href: '/services' }}
      />
    </>
  )
}
