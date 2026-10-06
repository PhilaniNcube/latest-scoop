import Link from 'next/link'
import { CalendarClock, Mail, MapPin, Megaphone } from 'lucide-react'

import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ConsultationForm } from '@/components/site/consultation-form'
import { JsonLd } from '@/components/site/json-ld'
import { NewsletterForm } from '@/components/site/newsletter-form'
import { PageHero } from '@/components/site/page-hero'
import { SocialLinks } from '@/components/site/social-links'
import { buttonVariants } from '@/components/ui/button'
import { getSiteSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Contact & consultations',
  description:
    'Book a YouTube consultation or contact Latest Scoop Media about services, collaborations and advertising.',
  path: '/contact',
})

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <PageHero
        eyebrow="CONTACT & CONSULTATIONS"
        title="Let's talk about your channel"
        description="Request a consultation, ask about a service, or tell us about a collaboration. We reply within 1–2 business days."
      />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Request a consultation</h2>
            <p className="mt-2 mb-6 text-sm leading-6 text-muted-foreground">
              Tell us where your channel is today and where you want it to be. Online booking and payments are coming soon.
            </p>
            <ConsultationForm source="contact" />
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-bold tracking-tight">Contact directly</h3>
              <a
                href={`mailto:${settings.email}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <Mail className="size-4" />
                {settings.email}
              </a>
              {settings.location ? (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {settings.location}
                </p>
              ) : null}
              <div className="mt-4">
                <SocialLinks links={settings.socials} size="sm" />
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-bold tracking-tight">
                <Megaphone className="size-4 text-primary" /> For brands & advertisers
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Looking to advertise on our channels, website or social media? Use the advertising enquiry form for a
                tailored proposal.
              </p>
              <Link href="/advertise#enquiry" className={buttonVariants({ className: 'mt-4 w-full rounded-full' })}>
                Advertising enquiry
              </Link>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 p-6 text-primary-foreground">
              <h3 className="flex items-center gap-2 text-sm font-bold">
                <CalendarClock className="size-4" /> What happens next
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm/6 text-primary-foreground/90">
                <li>• We read your request and reply by email</li>
                <li>• We suggest a time for a free discovery call</li>
                <li>• You get a clear, personalised plan</li>
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-sm font-bold tracking-tight">Join the newsletter</h3>
              <div className="mt-4">
                <NewsletterForm source="contact" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
