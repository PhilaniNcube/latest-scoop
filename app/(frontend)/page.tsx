import Link from 'next/link'
import { Suspense } from 'react'
import { site } from '@/lib/site'
import { getBrands, getCategories, getFeaturedVideo, getVideos } from '@/lib/data'
import { Hero } from '@/components/site/hero'
import { ChannelStats } from '@/components/site/channel-stats'
import { SectionHeading } from '@/components/site/section-heading'
import { FeaturedVideo } from '@/components/site/featured-video'
import { VideoGrid } from '@/components/site/video-grid'
import { BrandStrip } from '@/components/site/brand-strip'
import { Testimonials } from '@/components/site/testimonials'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

function LatestSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border bg-card">
          <Skeleton className="aspect-video" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function LatestSection() {
  const videos = await getVideos({ limit: 6 })
  return <VideoGrid videos={videos} />
}

async function FeaturedSection() {
  const featured = await getFeaturedVideo()
  return <FeaturedVideo video={featured} />
}

async function CategoriesBubbles() {
  const cats = await getCategories()
  if (!cats.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {cats.slice(0, 8).map((c) => (
        <Link key={String(c.id)} href={`/videos?category=${encodeURIComponent(c.slug)}`} className="rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium hover:bg-muted">
          {c.title}
        </Link>
      ))}
      <Link href="/videos" className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground">
        View all →
      </Link>
    </div>
  )
}

async function BrandsSection() {
  const brands = await getBrands()
  return (
    <>
      <BrandStrip brands={brands} />
      <div className="mt-6">
        <Testimonials brands={brands} />
      </div>
    </>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ChannelStats />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <SectionHeading eyebrow="FEATURED" title="Don’t miss the latest tea" description="Fresh uploads, handpicked for the front page." />
        <div className="mt-6">
          <Suspense fallback={<Skeleton className="h-[360px] rounded-2xl" />}>
            <FeaturedSection />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="LATEST VIDEOS" title="Fresh from the channel" />
          <Link href="/videos" className={buttonVariants({ variant: 'outline', className: 'w-fit rounded-full' })}>
            Browse all videos
          </Link>
        </div>
        <div className="mt-6">
          <Suspense fallback={<LatestSkeleton />}>
            <LatestSection />
          </Suspense>
        </div>
        <div className="mt-6">
          <Suspense fallback={null}>
            <CategoriesBubbles />
          </Suspense>
        </div>
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <SectionHeading eyebrow="BRAND PARTNERS" title="Trusted by brands across Mzansi" description="From sponsored segments to ambassador deals — we pair your brand with the audience that cares." />
          <div className="mt-6">
            <Suspense fallback={<Skeleton className="h-24 rounded-xl" />}>
              <BrandsSection />
            </Suspense>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/brands" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
              Meet our partners
            </Link>
            <Link href="/contact" className={buttonVariants({ className: 'rounded-full' })}>
              Partner with us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="overflow-hidden rounded-[1.5rem] border bg-gradient-to-br from-primary via-fuchsia-600 to-amber-400 p-[1px]">
          <div className="rounded-[calc(1.5rem-1px)] bg-card px-6 py-10 text-center sm:px-10 sm:py-12">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Ready to get the scoop on your brand?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
              Tell us about your campaign and we&apos;ll put together a package — sponsored videos, reviews, event coverage, and more. Replies within 24–48 hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
                Start a partnership
              </Link>
              <a href={site.youtubeUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
                Visit YouTube channel
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Or email us directly: <a href={`mailto:${site.contactEmail}`} className="font-semibold text-primary underline-offset-4 hover:underline">{site.contactEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
