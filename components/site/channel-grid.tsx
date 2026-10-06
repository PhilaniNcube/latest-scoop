import Link from 'next/link'
import { Plus } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import type { ChannelDoc } from '@/lib/types'
import { ChannelCard } from './channel-card'

export function ChannelGrid({ channels, showAddCard = false }: { channels: ChannelDoc[]; showAddCard?: boolean }) {
  if (!channels.length && !showAddCard) {
    return (
      <p className="rounded-xl border border-dashed bg-card px-6 py-10 text-center text-sm text-muted-foreground">
        Channels will appear here. Add them in Payload → YouTube channels.
      </p>
    )
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {channels.map((channel) => (
        <ChannelCard key={String(channel.id)} channel={channel} />
      ))}
      {showAddCard ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-muted/20 p-6 text-center">
          <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
            <Plus className="size-6" />
          </span>
          <p className="text-sm font-semibold">More channels coming soon</p>
          <p className="max-w-[24ch] text-xs leading-5 text-muted-foreground">
            We are always growing the network. Want to launch one with us?
          </p>
          <Link href="/start-a-channel" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}>
            Start a channel
          </Link>
        </div>
      ) : null}
    </div>
  )
}
