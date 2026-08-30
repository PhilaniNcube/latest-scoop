import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { VideoDoc } from '@/lib/data'
import { formatCount, formatDate, formatDuration } from '@/lib/format'
import { Eye, Heart, Play } from 'lucide-react'

function categoryLabel(v: VideoDoc): string | null {
  if (!v.category || typeof v.category !== 'object') return null
  return (v.category as { title: string }).title ?? null
}

export function VideoCard({ video }: { video: VideoDoc }) {
  const cat = categoryLabel(video)
  const id = video.youtubeId
  const thumb = video.thumbnail || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  return (
    <Link href={`/watch/${id}`} className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={thumb}
          alt={video.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        <span className="absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/10">
          <span className="grid size-10 place-items-center rounded-full bg-white/95 text-zinc-900 opacity-0 shadow transition group-hover:opacity-100">
            <Play className="size-4 translate-x-px fill-zinc-900" />
          </span>
        </span>
        {formatDuration(video.duration) ? (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-semibold text-white">{formatDuration(video.duration)}</span>
        ) : null}
        {cat ? <Badge className="absolute left-2 top-2 rounded-full text-[11px]">{cat}</Badge> : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">{video.title}</h3>
        <p className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" />
            {formatCount(video.viewCount)} views
          </span>
          <span className="inline-flex items-center gap-1">
            <Heart className="size-3.5" />
            {formatCount(video.likeCount)}
          </span>
          <span>{formatDate(video.publishedAt)}</span>
        </p>
      </div>
    </Link>
  )
}

export function VideoCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <div className="aspect-video animate-pulse bg-muted" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
