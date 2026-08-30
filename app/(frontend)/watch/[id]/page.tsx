import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { getRelatedVideos, getVideoById, getVideos } from '@/lib/data'
import { formatCount, formatDate, formatDuration } from '@/lib/format'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { VideoGrid } from '@/components/site/video-grid'
import { Eye, Heart, Calendar, Clock } from 'lucide-react'

export async function generateStaticParams() {
  const videos = await getVideos({ limit: 12 })
  const params = videos.map((v) => ({ id: v.youtubeId }))
  return params.length ? params : [{ id: '_placeholder' }]
}

async function Related({ youtubeId }: { youtubeId: string }) {
  const related = await getRelatedVideos(youtubeId, 6)
  if (!related.length) return null
  return (
    <section className="mt-10 border-t pt-8">
      <h2 className="text-lg font-bold tracking-tight">More from Latest Scoop</h2>
      <div className="mt-4">
        <VideoGrid videos={related} />
      </div>
    </section>
  )
}

export default async function WatchPage({ params }: PageProps<'/watch/[id]'>) {
  const { id } = await params
  const video = await getVideoById(id)
  if (!video) notFound()
  const cat = video.category && typeof video.category === 'object' ? (video.category as { title: string; slug: string }) : null

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="overflow-hidden rounded-2xl border bg-black shadow-sm">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {cat ? <Badge className="rounded-full">{cat.title}</Badge> : null}
        {formatDuration(video.duration) ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium">
            <Clock className="size-3.5" /> {formatDuration(video.duration)}
          </span>
        ) : null}
        {video.publishedAt ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium">
            <Calendar className="size-3.5" /> {formatDate(video.publishedAt)}
          </span>
        ) : null}
      </div>

      <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{video.title}</h1>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Eye className="size-4" /> {formatCount(video.viewCount)} views
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Heart className="size-4" /> {formatCount(video.likeCount)} likes
        </span>
      </div>

      {video.description ? <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{video.description}</p> : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: 'rounded-full' })}>
          Watch on YouTube
        </a>
        <Link href="/videos" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
          Browse all videos
        </Link>
      </div>

      <Suspense fallback={<Skeleton className="mt-10 h-48 rounded-xl" />}>
        <Related youtubeId={video.youtubeId} />
      </Suspense>
    </div>
  )
}
