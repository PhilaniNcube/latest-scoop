import Link from 'next/link'
import { Suspense } from 'react'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { PostGrid } from '@/components/site/post-card'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { getCategories, getPosts, getSiteSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Blog & resources',
  description:
    'Guides and articles on YouTube, content creation, social media, digital marketing and growing an online audience.',
  path: '/blog',
})

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function GridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border bg-card">
          <Skeleton className="aspect-video" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function CategoryFilter({ searchParams }: { searchParams: SearchParams }) {
  const [sp, categories] = await Promise.all([searchParams, getCategories()])
  const active = typeof sp.category === 'string' ? sp.category : undefined
  if (!categories.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={cn(
          'rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
          !active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
        )}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={String(c.id)}
          href={`/blog?category=${encodeURIComponent(c.slug)}`}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-sm font-medium transition',
            active === c.slug ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
          )}
        >
          {c.title}
        </Link>
      ))}
    </div>
  )
}

async function PostsList({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const category = typeof sp.category === 'string' ? sp.category : undefined
  const tag = typeof sp.tag === 'string' ? sp.tag : undefined
  const posts = await getPosts({ limit: 24, categorySlug: category, tag })
  return <PostGrid posts={posts} emptyText="No articles here yet — new guides are on the way." />
}

export default function BlogPage({ searchParams }: PageProps<'/blog'>) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <PageHero
        eyebrow="BLOG & RESOURCES"
        title="Learn to grow on YouTube"
        description="Practical guides on YouTube, content creation, social media and digital marketing — written for creators and brands."
      >
        <Link href="/services" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
          Explore services
        </Link>
        <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
          Ask a question
        </Link>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]}
        />
        <div className="mt-6">
          <Suspense fallback={<Skeleton className="h-9 w-full max-w-2xl rounded-full" />}>
            <CategoryFilter searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="mt-8">
          <Suspense fallback={<GridSkeleton />}>
            <PostsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>

      <BlogAdSlot />
    </>
  )
}

async function BlogAdSlot() {
  const settings = await getSiteSettings()
  if (!settings.ads.enabled) return null
  return (
    <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
      <AdSlot settings={settings} slot="blogSlot" />
    </div>
  )
}
