import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/site/json-ld'
import { NewsletterForm } from '@/components/site/newsletter-form'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { VideoGrid } from '@/components/site/video-grid'
import { socialIcon } from '@/components/site/icon'
import { buttonVariants } from '@/components/ui/button'
import { SOCIAL_PLATFORM_LABELS } from '@/lib/constants'
import { getSiteSettings, getVideos } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

const labels = SOCIAL_PLATFORM_LABELS as Record<string, string>

export const metadata = buildMetadata({
  title: 'Social media',
  description:
    'Follow Latest Scoop Media on YouTube, Instagram, TikTok, Facebook and X for new videos, clips and behind-the-scenes.',
  path: '/social',
})

export default async function SocialPage() {
  const [settings, videos] = await Promise.all([getSiteSettings(), getVideos({ limit: 3 })])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Social media', path: '/social' },
        ])}
      />
      <PageHero
        eyebrow="SOCIAL MEDIA"
        title="Follow the network everywhere"
        description="Every channel, every platform, one place. Subscribe and follow so you never miss a drop."
      >
        <a
          href={site.subscribeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: 'lg', className: 'rounded-full' })}
        >
          Subscribe on YouTube
        </a>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Social media', path: '/social' },
          ]}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {settings.socials.map((link) => {
            const Icon = socialIcon(link.platform)
            const isExternal = link.url.startsWith('http')
            return (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold tracking-tight">
                    {link.label || labels[link.platform] || link.platform}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">{link.url.replace(/^https?:\/\//, '')}</span>
                </span>
                <ExternalLink className="size-4 text-muted-foreground transition group-hover:text-primary" />
              </a>
            )
          })}
        </div>
      </section>

      {videos.length ? (
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow="LATEST FROM YOUTUBE" title="Straight from the channels" />
              <Link href="/videos" className={buttonVariants({ variant: 'outline', className: 'w-fit rounded-full' })}>
                All videos
              </Link>
            </div>
            <div className="mt-6">
              <VideoGrid videos={videos} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-xl rounded-2xl border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold tracking-tight">Never miss a video</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Join the newsletter for creator tips, new uploads and network news.
          </p>
          <div className="mt-5 flex justify-center">
            <NewsletterForm source="social" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Want to collaborate?"
        description="From brand campaigns to creator collaborations — let's talk about working together."
        primary={{ label: 'Advertise with us', href: '/advertise' }}
        secondary={{ label: 'Contact us', href: '/contact' }}
      />
    </>
  )
}
