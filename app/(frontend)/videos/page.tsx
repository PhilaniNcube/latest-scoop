import { Suspense } from 'react'
import { getCategories, getVideos } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { VideoGrid } from '@/components/site/video-grid'
import { CategoryFilter } from '@/components/site/category-filter'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = { title: 'Videos' }

async function VideosGrid({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const category = typeof sp.category === 'string' ? sp.category : undefined
  const videos = await getVideos({ limit: 24, categorySlug: category })
  return <VideoGrid videos={videos} emptyText={category ? 'No videos in this category yet.' : 'No videos yet. New drops land daily — check back soon!'} />
}

async function FilterBar() {
  const cats = await getCategories()
  return <CategoryFilter categories={cats} />
}

export default function VideosPage({ searchParams }: PageProps<'/videos'>) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <SectionHeading eyebrow="LIBRARY" title="All videos" description="Browse every upload from Latest Scoop — filter by category or binge the lot." />
      <div className="mt-6">
        <Suspense fallback={<Skeleton className="h-9 w-full max-w-xl rounded-full" />}>
          <FilterBar />
        </Suspense>
      </div>
      <div className="mt-8">
        <Suspense
          fallback={
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
          }
        >
          <VideosGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
