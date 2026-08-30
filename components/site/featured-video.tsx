import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import type { VideoDoc } from '@/lib/data'
import { formatCount, formatDate } from '@/lib/format'
import { Eye, Heart, Play } from 'lucide-react'

export function FeaturedVideo({ video }: { video: VideoDoc | null }) {
  if (!video) return null
  const thumb = video.thumbnail || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <Link href={`/watch/${video.youtubeId}`} className="group relative block aspect-video overflow-hidden bg-muted lg:aspect-[16/10]">
          <Image src={thumb} alt={video.title} fill className="object-cover transition group-hover:scale-[1.02]" sizes="(max-width: 1024px) 100vw, 60vw" unoptimized />
          <span className="absolute inset-0 grid place-items-center bg-black/10 opacity-100 transition group-hover:bg-black/20">
            <span className="grid size-14 place-items-center rounded-full bg-white text-zinc-900 shadow-xl">
              <Play className="size-6 translate-x-px fill-zinc-900" />
            </span>
          </span>
          <Badge className="absolute left-3 top-3 rounded-full bg-amber-400 text-zinc-900">FEATURED</Badge>
        </Link>
        <div className="flex flex-col gap-3 p-6">
          <p className="text-xs font-bold tracking-[0.14em] text-primary">LATEST SCOOP ORIGINAL</p>
          <h3 className="text-xl font-bold leading-tight tracking-tight">{video.title}</h3>
          {video.description ? <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">{video.description}</p> : null}
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
          <div className="mt-auto flex gap-2 pt-2">
            <Link href={`/watch/${video.youtubeId}`} className={buttonVariants({ className: 'rounded-full' })}>
              <Play className="size-4 fill-current" />
              Watch now
            </Link>
            <Link href="/videos" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
              All videos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
