import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, Play, Sparkles } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getSiteSettings } from '@/lib/data'
import { mediaUrl } from '@/lib/media'
import { site } from '@/lib/site'
import { NavLink } from './nav-link'

function BrandMark({ name, logo }: { name: string; logo: string | null }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      {logo ? (
        <Image src={logo} alt={name} width={36} height={36} className="size-9 rounded-xl object-cover" unoptimized />
      ) : (
        <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Play className="size-4 translate-x-px fill-current" />
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight">{name}</span>
        <span className="text-[10px] font-semibold tracking-[0.16em] text-primary uppercase">Media Network</span>
      </span>
    </Link>
  )
}

export async function Header() {
  const settings = await getSiteSettings()
  const logo = mediaUrl(settings.logo, 'thumbnail') ?? mediaUrl(settings.logo)
  const brandName = settings.shortName || settings.brandName

  return (
    <header className="sticky top-0 z-40 w-full">
      {settings.announcement.enabled && settings.announcement.text ? (
        <div className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-4 py-2 text-center text-xs font-semibold sm:px-6">
            {settings.announcement.href ? (
              <Link href={settings.announcement.href} className="underline-offset-4 hover:underline">
                {settings.announcement.text}
              </Link>
            ) : (
              settings.announcement.text
            )}
          </div>
        </div>
      ) : null}
      <div className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <BrandMark name={brandName} logo={logo} />
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            <NavLink href="/" label="Home" />
            {site.nav.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
                More
                <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border bg-popover p-2 shadow-lg">
                {site.secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={site.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: 'sm', className: 'rounded-full' })}
            >
              <Sparkles className="size-3.5" />
              Subscribe
            </a>
            <Link href="/advertise" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full' })}>
              Advertise
            </Link>
          </div>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <Play className="size-3.5 fill-current" />
                  </span>
                  {brandName}
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 pb-6">
                <NavLink href="/" label="Home" className="rounded-lg px-3 py-2.5 hover:bg-muted" />
                {[...site.nav, ...site.secondaryNav].map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} className="rounded-lg px-3 py-2.5 hover:bg-muted" />
                ))}
                <div className="mt-4 grid gap-2">
                  <a
                    href={site.subscribeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ className: 'rounded-full' })}
                  >
                    Subscribe on YouTube
                  </a>
                  <Link href="/advertise" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
                    Advertise with us
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
