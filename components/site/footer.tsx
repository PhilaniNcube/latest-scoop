import Link from 'next/link'
import { Mail, MapPin, Play } from 'lucide-react'

import { getCurrentYear, getSiteSettings } from '@/lib/data'
import { mediaUrl } from '@/lib/media'
import { site } from '@/lib/site'
import { NewsletterForm } from './newsletter-form'
import { SocialLinks } from './social-links'

export async function Footer() {
  const [settings, year] = await Promise.all([getSiteSettings(), getCurrentYear()])
  const logo = mediaUrl(settings.logo, 'thumbnail') ?? mediaUrl(settings.logo)
  const brandName = settings.shortName || settings.brandName

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt={brandName} className="size-8 rounded-lg object-cover" />
              ) : (
                <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Play className="size-3.5 fill-current" />
                </span>
              )}
              <span className="text-sm font-bold tracking-tight">{brandName}</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-primary">
                NETWORK
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">{settings.description}</p>
            <SocialLinks links={settings.socials} size="sm" />
            <div className="pt-2">
              <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Join the newsletter</p>
              <NewsletterForm source="footer" />
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {site.footerNav.map((group) => (
              <div key={group.title}>
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">{group.title}</p>
                <ul className="space-y-2 text-sm">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {settings.brandName}. All rights reserved.
          </span>
          <span className="flex flex-wrap items-center gap-4">
            <a href={`mailto:${settings.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Mail className="size-3.5" />
              {settings.email}
            </a>
            {settings.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {settings.location}
              </span>
            ) : null}
          </span>
        </div>
      </div>
    </footer>
  )
}
