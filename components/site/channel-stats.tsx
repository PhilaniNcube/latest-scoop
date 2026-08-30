import { site } from '@/lib/site'
import { Eye, Users, Clapperboard } from 'lucide-react'

const items = [
  { label: site.stats.subscribersLabel, value: site.stats.subscribers, icon: Users },
  { label: site.stats.viewsLabel, value: site.stats.views, icon: Eye },
  { label: site.stats.videosLabel, value: site.stats.videos, icon: Clapperboard },
] as const

export function ChannelStats() {
  return (
    <section className="border-y bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x px-4 sm:px-6">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 px-2 py-6 text-center sm:py-8">
            <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
            <span className="text-xl font-black tracking-tight sm:text-2xl">{value}</span>
            <span className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground">{label.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
