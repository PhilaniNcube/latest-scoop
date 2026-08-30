import Link from 'next/link'
import { site } from '@/lib/site'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_30%_10%,hsl(var(--primary)/0.18),transparent_60%),radial-gradient(50%_60%_at_85%_0%,hsl(var(--accent)/0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-accent/[0.08]" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <Badge variant="secondary" className="rounded-full border bg-secondary/60 px-2.5 py-1 text-[11px] font-bold tracking-widest text-foreground">
              <span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-500" />
              MZANSI&apos;S HOTTEST GOSSIP
            </Badge>
            <h1 className="text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              The <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">Latest Scoop</span>
              <br />
              in SA Gossip
            </h1>
            <p className="max-w-xl text-[15px] leading-7 text-muted-foreground sm:text-base">{site.description}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={site.subscribeUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
                <Play className="size-4 fill-current" />
                Subscribe on YouTube
              </a>
              <Link href="/videos" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
                Watch latest
              </Link>
              <Link href="/contact" className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'rounded-full' })}>
                <Sparkles className="size-4" />
                Partner with us
              </Link>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              <span className="font-bold text-foreground">{site.stats.subscribers}</span> subscribers ·{' '}
              <span className="font-bold text-foreground">{site.stats.views}</span> views · daily uploads
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[1.25rem] border bg-card p-2 shadow-xl">
              <div className="overflow-hidden rounded-xl bg-muted">
                <div className="aspect-video w-full bg-gradient-to-br from-primary via-fuchsia-500 to-amber-400 p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-black/85 p-6 text-center">
                    <div className="space-y-3">
                      <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
                        <Play className="size-6 translate-x-px fill-current" />
                      </span>
                      <p className="text-sm font-bold tracking-wide text-white">LATEST DROP</p>
                      <p className="mx-auto max-w-[22ch] text-xs leading-5 text-white/70">Catch the juiciest tea — new videos daily from Mzansi&apos;s hottest celebs &amp; influencers.</p>
                      <a
                        href={site.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-bold text-zinc-900"
                      >
                        Open YouTube →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-3">
                <span className="text-xs font-semibold tracking-widest text-muted-foreground">FEATURED ON</span>
                <span className="text-xs font-bold tracking-tight">YouTube · TikTok · Instagram</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
