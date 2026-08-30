import Link from 'next/link'
import { site } from '@/lib/site'
import { SectionHeading } from '@/components/site/section-heading'
import { ChannelStats } from '@/components/site/channel-stats'
import { buttonVariants } from '@/components/ui/button'
import { Clapperboard, Flame, HeartHandshake, Megaphone } from 'lucide-react'

export const metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SectionHeading eyebrow="ABOUT" title="The tea. The trends. The Mzansi scoop." description={site.description} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Flame, title: 'Daily gossip', body: 'Fresh uploads covering Amapiano stars, TV drama, influencers & the scandals shaking SA.' },
            { icon: Clapperboard, title: '400+ videos & counting', body: 'A deep archive of interviews, breakdowns, and must-watch moments.' },
            { icon: Megaphone, title: 'Built for brands', body: 'Sponsored segments, reviews, event coverage, and ambassador deals that land.' },
            { icon: HeartHandshake, title: 'Community first', body: 'We put the audience first — authentic stories, real culture, no fluff.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
              <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-3 text-sm font-bold tracking-tight">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={site.subscribeUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: 'rounded-full' })}>
            Subscribe on YouTube
          </a>
          <Link href="/videos" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
            Watch latest
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: 'secondary', className: 'rounded-full' })}>
            Work with us
          </Link>
        </div>
      </div>
      <ChannelStats />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold tracking-tight">What to expect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Daily uploads — never miss a headline.</li>
            <li>Interviews & breakdowns you won&apos;t find anywhere else.</li>
            <li>Coverage that respects the culture and the people behind it.</li>
          </ul>
          <p className="mt-6 text-sm">
            Find us on <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">YouTube</a> ·{' '}
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">Instagram</a> ·{' '}
            <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">TikTok</a>
          </p>
        </div>
      </div>
    </>
  )
}
