import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { CtaBand } from '@/components/site/cta-band'
import { JsonLd } from '@/components/site/json-ld'
import { PostCard } from '@/components/site/post-card'
import { Prose } from '@/components/site/rich-text'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { formatDate } from '@/lib/format'
import { getPostBySlug, getRelatedPosts, getSiteSettings } from '@/lib/data'
import { mediaUrl } from '@/lib/media'
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, metadataFromSeo } from '@/lib/seo'

export async function generateStaticParams() {
  const { getPosts } = await import('@/lib/data')
  const posts = await getPosts({ limit: 100 })
  const params = posts.map((p) => ({ slug: p.slug }))
  return params.length ? params : [{ slug: '_placeholder' }]
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return metadataFromSeo({
    fallbackTitle: post.title,
    fallbackDescription: post.excerpt,
    path: `/blog/${post.slug}`,
    seo: post.seo,
    fallbackImage: post.coverImage,
    type: 'article',
    publishedTime: post.publishedAt,
  })
}

export default async function BlogPostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])
  if (!post) notFound()

  const related = await getRelatedPosts(post.slug, 3)
  const cover = mediaUrl(post.coverImage)
  const category = post.category && typeof post.category === 'object' ? (post.category as { title: string; slug: string }) : null
  const shareUrl = absoluteUrl(`/blog/${post.slug}`)

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />

        {category ? (
          <Link href={`/blog?category=${category.slug}`} className="mt-6 inline-block">
            <Badge className="rounded-full">{category.title}</Badge>
          </Link>
        ) : null}
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-7 text-muted-foreground">{post.excerpt}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
          <span>{post.authorName || 'Latest Scoop Media'}</span>
          {post.publishedAt ? (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" /> {formatDate(post.publishedAt)}
            </span>
          ) : null}
          {post.readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> {post.readingTime} min read
            </span>
          ) : null}
        </div>

        {cover ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border bg-muted">
            <Image src={cover} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" unoptimized priority />
          </div>
        ) : null}

        <Prose data={post.content ?? post.excerpt} className="mt-8" />

        {post.tags?.length ? (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t pt-6">
            <Tag className="size-4 text-muted-foreground" />
            {post.tags.map((t) => (
              <Link
                key={t.tag}
                href={`/blog?tag=${encodeURIComponent(t.tag)}`}
                className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted"
              >
                {t.tag}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t pt-6">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Share</span>
          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}
          >
            X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}
          >
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}
          >
            WhatsApp
          </a>
        </div>

        <div className="mt-10">
          <AdSlot settings={settings} slot="blogSlot" />
        </div>

        <div className="mt-8">
          <Link href="/blog" className={buttonVariants({ variant: 'ghost', className: 'rounded-full' })}>
            <ArrowLeft className="size-4" /> Back to the blog
          </Link>
        </div>
      </article>

      {related.length ? (
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <h2 className="text-xl font-bold tracking-tight">Keep reading</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={String(p.id)} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Want help applying this to your channel?"
        description="Book a consultation and we'll turn these ideas into a plan for your specific niche."
        primary={{ label: 'Book a consultation', href: '/contact' }}
        secondary={{ label: 'Explore services', href: '/services' }}
      />
    </>
  )
}
