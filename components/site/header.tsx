import Link from 'next/link'
import { site } from '@/lib/site'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Play, Sparkles } from 'lucide-react'

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Play className="size-4 translate-x-px fill-current" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight">Latest Scoop</span>
        <span className="text-[11px] font-semibold tracking-[0.14em] text-primary">MZANSI GOSSIP</span>
      </span>
    </Link>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <BrandMark />
        <nav className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <a href={site.subscribeUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: 'sm', className: 'rounded-full' })}>
            <Sparkles className="size-3.5" />
            Subscribe
          </a>
          <Link href="/contact" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}>
            Partner with us
          </Link>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-[86vw] max-w-sm">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-left">
                <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Play className="size-3.5 fill-current" />
                </span>
                Latest Scoop
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4 pb-4">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 grid gap-2">
                <a href={site.subscribeUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: 'rounded-full' })}>
                  Subscribe on YouTube
                </a>
                <Link href="/contact" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
                  Partner with us
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
