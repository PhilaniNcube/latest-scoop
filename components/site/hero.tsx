import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { initials, mediaUrl } from '@/lib/media'
import type { ChannelDoc, ResolvedSiteSettings } from '@/lib/types'

export function Hero({ settings, channel }: { settings: ResolvedSiteSettings; channel?: ChannelDoc | null }) {
  const logo = channel ? (mediaUrl(channel.logo, 'thumbnail') ?? mediaUrl(channel.logo)) : null
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_25%_5%,hsl(var(--primary)/0.2),transparent_60%),radial-gradient(50%_60%_at_90%_0%,hsl(var(--accent)/0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.08]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-5">
          <Badge variant="secondary" className="rounded-full border bg-secondary/60 px-2.5 py-1 text-[11px] font-bold tracking-widest text-foreground">
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500" />
            A DIGITAL MEDIA NETWORK
          </Badge>
          <h1 className="text-4xl font-black leading-[0.98] tracking-tight sm:text-5xl lg:text-[3.3rem]">
            YouTube channels,
            <br />
            <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
              creator services &amp; brand reach
            </span>
          </h1>
          <p className="max-w-xl text-[15px] leading-7 text-muted-foreground sm:text-base">{settings.description}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/channels" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
              <Play className="size-4 fill-current" />
              Explore our channels
            </Link>
            <Link href="/services" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
              YouTube services
            </Link>
            <Link href="/advertise" className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'rounded-full' })}>
              <Sparkles className="size-4" />
              Advertise with us
            </Link>
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            <span className="font-bold text-foreground">{settings.stats.subscribers}</span> subscribers ·{' '}
            <span className="font-bold text-foreground">{settings.stats.views}</span> views ·{' '}
            <span className="font-bold text-foreground">{settings.stats.channels}</span> channels
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[1.25rem] border bg-card p-2 shadow-xl">
            {channel ? (
              <div className="overflow-hidden rounded-xl bg-gradient-to-br from-primary via-fuchsia-600 to-amber-400 p-[1px]">
                <div className="rounded-[11px] bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border bg-background text-lg font-black text-primary">
                      {logo ? (
                        <Image src={logo} alt={channel.name} width={56} height={56} className="size-full object-cover" unoptimized />
                      ) : (
                        initials(channel.name)
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold tracking-tight">{channel.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{channel.handle || settings.tagline}</p>
                    </div>
                    <Badge className="ml-auto rounded-full">Flagship</Badge>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {channel.shortDescription || channel.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link href={`/channels/${channel.slug}`} className={buttonVariants({ size: 'sm', className: 'rounded-full' })}>
                      View channel
                    </Link>
                    {channel.url ? (
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}
                      >
                        Open YouTube <ArrowRight className="size-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">Where we publish</span>
              <span className="text-xs font-bold tracking-tight">YouTube · Web · Social</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
