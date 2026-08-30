import { site } from '@/lib/site'
import { SectionHeading } from '@/components/site/section-heading'
import { ContactForm } from '@/components/site/contact-form'
import { Mail, Play } from 'lucide-react'

export const metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHeading eyebrow="PARTNER WITH US" title="Let’s make something Mzansi will watch" description="Tell us about your brand, goals, and timeline. We reply within 24–48 hours." />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <div className="space-y-4">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-tight">Contact directly</h3>
            <a href={`mailto:${site.contactEmail}`} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <Mail className="size-4" />
              {site.contactEmail}
            </a>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">Prefer email? Drop us a line and we&apos;ll send over our media kit and rate card.</p>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-tight">Find the channel</h3>
            <a href={site.youtubeUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <Play className="size-4" />
              {site.handle} on YouTube
            </a>
            <div className="mt-3 flex gap-2">
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted">
                Instagram
              </a>
              <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted">
                TikTok
              </a>
              <a href={site.socials.x} target="_blank" rel="noopener noreferrer" className="rounded-full border px-3 py-1 text-xs font-medium hover:bg-muted">
                X
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 p-6 text-primary-foreground">
            <p className="text-sm font-bold">Why brands choose Latest Scoop</p>
            <ul className="mt-2 space-y-1 text-sm/6 text-primary-foreground/90">
              <li>• Engaged Mzansi audience, daily watch time</li>
              <li>• Authentic, culture-led storytelling</li>
              <li>• Flexible packages — one-off to ambassador</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
