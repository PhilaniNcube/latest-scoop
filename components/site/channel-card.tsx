import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Play, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { formatCount } from '@/lib/format'
import { initials, mediaAlt, mediaUrl } from '@/lib/media'
import type { ChannelDoc } from '@/lib/types'

export function ChannelCard({ channel }: { channel: ChannelDoc }) {
  const logo = mediaUrl(channel.logo, 'thumbnail') ?? mediaUrl(channel.logo)
  const banner = mediaUrl(channel.banner)
  const hasStats = channel.subscriberCount != null && channel.subscriberCount > 0

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative h-28 overflow-hidden bg-gradient-to-br from-primary via-fuchsia-600 to-amber-400">
        {banner ? (
          <Image src={banner} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
        ) : (
          <div className="absolute inset-0 opacity-90" />
        )}
      </div>
      <div className="relative flex flex-1 flex-col gap-3 p-5 pt-0">
        <div className="-mt-10 flex items-end justify-between">
          <span className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-card bg-card text-lg font-black text-primary shadow-sm">
            {logo ? (
              <Image src={logo} alt={mediaAlt(channel.logo, channel.name)} width={64} height={64} className="size-full object-cover" unoptimized />
            ) : (
              initials(channel.name)
            )}
          </span>
          {channel.status === 'coming-soon' ? <Badge variant="secondary">Coming soon</Badge> : null}
        </div>
        <div>
          <h3 className="text-base font-bold tracking-tight">
            <Link href={`/channels/${channel.slug}`} className="hover:text-primary">
              {channel.name}
            </Link>
          </h3>
          {channel.handle ? <p className="text-xs font-medium text-muted-foreground">{channel.handle}</p> : null}
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {channel.shortDescription || channel.tagline || 'A channel in the Latest Scoop Media network.'}
        </p>
        {hasStats ? (
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Users className="size-3.5" />
            {formatCount(channel.subscriberCount)} subscribers
          </p>
        ) : null}
        <div className="mt-auto flex gap-2 pt-2">
          <Link href={`/channels/${channel.slug}`} className={buttonVariants({ className: 'flex-1 rounded-full' })}>
            View channel <ArrowUpRight className="size-4" />
          </Link>
          {channel.url ? (
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${channel.name} on YouTube`}
              className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}
            >
              <Play className="size-4 fill-current" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
