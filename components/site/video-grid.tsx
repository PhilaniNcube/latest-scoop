import type { VideoDoc } from '@/lib/data'
import { VideoCard } from './video-card'

export function VideoGrid({ videos, emptyText = 'No videos yet. Check back soon!' }: { videos: VideoDoc[]; emptyText?: string }) {
  if (!videos.length) return <p className="rounded-xl border border-dashed bg-card px-6 py-10 text-center text-sm text-muted-foreground">{emptyText}</p>
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => (
        <VideoCard key={String(v.id ?? v.youtubeId)} video={v} />
      ))}
    </div>
  )
}
