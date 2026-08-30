import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
      <p className="text-xs font-bold tracking-[0.16em] text-primary">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Video not found</h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">That video doesn&apos;t exist or hasn&apos;t been synced yet. Try browsing the full library.</p>
      <Link href="/videos" className={buttonVariants({ className: 'mt-6 rounded-full' })}>
        Browse videos
      </Link>
    </div>
  )
}
