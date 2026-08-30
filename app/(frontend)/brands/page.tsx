import Link from 'next/link'
import { Suspense } from 'react'
import { getBrands } from '@/lib/data'
import { SectionHeading } from '@/components/site/section-heading'
import { BrandStrip } from '@/components/site/brand-strip'
import { Testimonials } from '@/components/site/testimonials'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = { title: 'Brands' }

async function BrandsContent() {
  const brands = await getBrands()
  return (
    <>
      <BrandStrip brands={brands} />
      <div className="mt-8">
        <Testimonials brands={brands} />
      </div>
    </>
  )
}

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHeading
        eyebrow="PARTNERS"
        title="Brands that trust Latest Scoop"
        description="We help brands show up where the culture lives — inside the stories Mzansi is already watching. Sponsored segments, reviews, events, and ambassador deals, handled end-to-end."
      />
      <div className="mt-8 rounded-2xl border bg-card p-6 sm:p-8">
        <h2 className="text-sm font-bold tracking-tight">What we offer</h2>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
          <li>• Sponsored video segments</li>
          <li>• Product reviews & unboxings</li>
          <li>• Event coverage & appearances</li>
          <li>• Long-term ambassador deals</li>
        </ul>
        <Link href="/contact" className={buttonVariants({ className: 'mt-6 rounded-full' })}>
          Start a partnership
        </Link>
      </div>
      <div className="mt-8">
        <Suspense fallback={<Skeleton className="h-28 rounded-xl" />}>
          <BrandsContent />
        </Suspense>
      </div>
    </div>
  )
}
