import { Clapperboard, Eye, Layers, Users } from 'lucide-react'

import type { ResolvedSiteSettings } from '@/lib/types'

export function StatBand({ settings }: { settings: ResolvedSiteSettings }) {
  const items = [
    { label: 'Subscribers', value: settings.stats.subscribers, icon: Users },
    { label: 'Views', value: settings.stats.views, icon: Eye },
    { label: 'Videos', value: settings.stats.videos, icon: Clapperboard },
    { label: 'Channels', value: settings.stats.channels, icon: Layers },
  ]
  return (
    <section className="border-y bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border sm:grid-cols-4">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 px-3 py-6 text-center sm:py-8">
            <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
            <span className="text-xl font-black tracking-tight sm:text-2xl">{value}</span>
            <span className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
