import Link from 'next/link'
import { ArrowRight, BarChart3, Compass, Lightbulb, Palette, Rocket, Sparkles, TrendingUp, Wallet } from 'lucide-react'

import { AdSlot } from '@/components/site/ad-slot'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ConsultationForm } from '@/components/site/consultation-form'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeading } from '@/components/site/section-heading'
import { ServiceCard } from '@/components/site/service-card'
import { buttonVariants } from '@/components/ui/button'
import { getServices, getSiteSettings } from '@/lib/data'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Start a YouTube channel',
  description:
    'Go from idea to a growing YouTube channel. We help beginners choose a niche, set up, brand, plan content and reach monetization.',
  path: '/start-a-channel',
})

const roadmap = [
  { icon: Compass, step: '01', title: 'Pick your niche', body: 'We find a topic you enjoy that also has an audience — and a clear angle to stand out.' },
  { icon: Palette, step: '02', title: 'Build your brand', body: 'Name, logo, colours, banner and thumbnails so you look established from day one.' },
  { icon: Lightbulb, step: '03', title: 'Plan your content', body: 'A month of video ideas, titles and a realistic upload schedule.' },
  { icon: Rocket, step: '04', title: 'Publish & improve', body: 'We coach your first uploads, titles and thumbnails so every video performs better.' },
  { icon: BarChart3, step: '05', title: 'Read your analytics', body: 'Learn what the numbers mean and exactly what to change next.' },
  { icon: Wallet, step: '06', title: 'Start earning', body: 'Reach the monetization requirements and unlock your first income streams.' },
]

const included = [
  'A personalised channel plan',
  'Niche and audience research',
  'Channel setup and branding',
  'Content ideas and upload calendar',
  'Thumbnail and title coaching',
  'Monetization roadmap',
]

const faqs = [
  {
    q: 'I have never made a video before. Can you still help?',
    a: 'Absolutely. Most of the creators we work with are starting from zero. We handle the strategy and setup, and coach you through your first videos step by step.',
  },
  {
    q: 'How long until I get monetized?',
    a: 'It depends on your niche, consistency and how fast you improve. We focus on the things within your control — strategy, quality and consistency — and give you an honest timeline up front.',
  },
  {
    q: 'Do you make the videos for me?',
    a: 'We can coach you to do it yourself, or offer done-for-you services like thumbnails, branding and ongoing growth support. You choose the level of help.',
  },
  {
    q: 'How much does it cost?',
    a: 'One-off services start from around R1 500, and consultations from R750. Tell us your budget on the form and we\'ll recommend the best starting point.',
  },
]

export default async function StartAChannelPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()])
  const starterServices = services.filter((s) => ['channel-setup', 'branding', 'content', 'consulting'].includes(s.category ?? '')).slice(0, 3)
  const recommended = starterServices.length ? starterServices : services.slice(0, 3)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Start a YouTube channel', path: '/start-a-channel' },
        ])}
      />
      <PageHero
        eyebrow="START A YOUTUBE CHANNEL"
        title="From an idea to a channel people watch"
        description="You bring the ambition; we bring the plan. We help complete beginners launch a channel that looks professional and grows the right way."
      >
        <Link href="#book" className={buttonVariants({ size: 'lg', className: 'rounded-full' })}>
          <Sparkles className="size-4" />
          Book a free discovery call
        </Link>
        <Link href="/services" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'rounded-full' })}>
          See all services
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Start a YouTube channel', path: '/start-a-channel' },
          ]}
        />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="YOUR ROADMAP"
              title="Six steps to a real channel"
              description="We walk this path with you, at your pace — no jargon, no overwhelm."
            />
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {roadmap.map(({ icon: Icon, step, title, body }) => (
                <li key={step} className="rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-black tracking-widest text-muted-foreground/50">{step}</span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold tracking-tight">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="rounded-2xl border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-bold tracking-tight">What you get</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {included.map((item) => (
                <li key={item} className="flex gap-2">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="#book" className={buttonVariants({ className: 'mt-6 w-full rounded-full' })}>
              Start today <ArrowRight className="size-4" />
            </Link>
            <a
              href={site.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'outline', className: 'mt-2 w-full rounded-full' })}
            >
              See a channel we run
            </a>
          </aside>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionHeading
            eyebrow="POPULAR STARTING POINTS"
            title="Services that get you off the ground"
            description="Pick one, or combine them into a launch package."
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((s) => (
              <ServiceCard key={String(s.id)} service={s} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/services" className={buttonVariants({ variant: 'outline', className: 'rounded-full' })}>
              Browse all services <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <SectionHeading eyebrow="FAQ" title="Questions beginners ask us" align="center" className="mb-8" />
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border bg-card p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
                {faq.q}
                <TrendingUp className="size-4 text-primary transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot settings={settings} />
      </div>

      <section id="book" className="scroll-mt-24 border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="BOOK A CONSULTATION"
                title="Let's plan your channel"
                description="Tell us where you are and what you want to achieve. We'll reply within 1–2 business days with next steps."
              />
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li>✅ Free 20-minute discovery call</li>
                <li>✅ Honest advice — no pressure</li>
                <li>✅ A clear, personalised plan</li>
              </ul>
            </div>
            <ConsultationForm source="start-a-channel" />
          </div>
        </div>
      </section>
    </>
  )
}
