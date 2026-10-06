import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/format'
import { mediaUrl } from '@/lib/media'
import type { PostDoc } from '@/lib/types'

function categoryOf(post: PostDoc): { title: string; slug: string } | null {
  if (!post.category || typeof post.category !== 'object') return null
  return post.category as { title: string; slug: string }
}

export function PostCard({ post }: { post: PostDoc }) {
  const cover = mediaUrl(post.coverImage, 'card') ?? mediaUrl(post.coverImage)
  const category = categoryOf(post)
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={cover}
            alt={post.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-fuchsia-500/20 to-amber-400/25" />
        )}
        {category ? <Badge className="absolute left-3 top-3 rounded-full">{category.title}</Badge> : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight group-hover:text-primary">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" /> {formatDate(post.publishedAt)}
          </span>
          {post.readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> {post.readingTime} min read
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export function PostGrid({ posts, emptyText = 'No articles yet — check back soon.' }: { posts: PostDoc[]; emptyText?: string }) {
  if (!posts.length) {
    return (
      <p className="rounded-xl border border-dashed bg-card px-6 py-10 text-center text-sm text-muted-foreground">{emptyText}</p>
    )
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={String(post.id)} post={post} />
      ))}
    </div>
  )
}
