import Link from 'next/link'
import { site } from '@/lib/site'
import { Play } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Play className="size-3.5 fill-current" />
              </span>
              <span className="text-sm font-bold tracking-tight">Latest Scoop</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-primary">SA</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">{site.description}</p>
            <div className="flex gap-2 pt-1">
              <a href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                YouTube
              </a>
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                Instagram
              </a>
              <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" className="rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                TikTok
              </a>
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">EXPLORE</p>
            <ul className="space-y-2 text-sm">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">CONTACT</p>
            <p className="text-sm text-muted-foreground">
              For brand partnerships:
              <br />
              <a href={`mailto:${site.contactEmail}`} className="font-medium text-foreground underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                {site.contactEmail}
              </a>
            </p>
            <Link href="/contact" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
              Send an inquiry →
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Latest Scoop SA. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Mzansi gossip, served fresh daily
          </span>
        </div>
      </div>
    </footer>
  )
}
