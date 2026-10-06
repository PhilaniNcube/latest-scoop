import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header'
import { JsonLd } from '@/components/site/json-ld'
import { getSiteSettings } from '@/lib/data'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const defaultTitle = `${settings.brandName} — ${settings.tagline}`
  return {
    title: { default: defaultTitle, template: `%s · ${settings.shortName || settings.brandName}` },
    description: settings.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    applicationName: settings.brandName,
    openGraph: {
      type: 'website',
      siteName: settings.brandName,
      title: defaultTitle,
      description: settings.description,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function FrontendLayout({ children }: LayoutProps<'/'>) {
  const settings = await getSiteSettings()
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased dark`}>
      <body className="flex min-h-full flex-col bg-background">
        <JsonLd data={[organizationJsonLd(settings), websiteJsonLd(settings)]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
