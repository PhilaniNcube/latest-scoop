# Latest Scoop Media

A professional digital media platform and content hub for a South African YouTube
network — built with **Next.js 16 (App Router, Cache Components)** and
**Payload CMS 3**.

It brings together:

- **Home** — a media-company homepage explaining the brand and everything we offer.
- **Our YouTube channels** — a scalable, multi-channel directory. Add a channel in
  the CMS and it appears across the site automatically.
- **YouTube services** — setup, niche, branding, content, Shorts, thumbnails,
  analytics, monetization and consultations.
- **Start a YouTube channel** — a dedicated beginner landing page with a
  consultation call-to-action.
- **Advertise with us** — advertising placements, packages and an enquiry form.
- **Social media** — a hub linking every platform.
- **Blog & resources** — SEO-friendly articles and guides with structured data.
- **Contact & consultations** — professional forms ready for future online
  booking and payments.
- **Reserved ad spaces** — non-intrusive ad slots that stay hidden until enabled.
- **Admin/CMS** — edit channels, services, posts, packages, site settings and
  more from `/admin` without touching code.

## Tech stack

| Area          | Choice                                             |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 16.3 (App Router, Cache Components / PPR)  |
| CMS           | Payload CMS 3                                       |
| Database      | SQLite via Turso (libSQL)                           |
| Media storage | Cloudflare R2 (S3-compatible)                       |
| Email         | Resend                                              |
| Styling       | Tailwind CSS v4 + shadcn-style UI components        |
| Icons         | lucide-react                                        |

## Getting started

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000> for the website and
<http://localhost:3000/admin> for the CMS.

On first run, create your admin user, then add content in the collections
below. The frontend ships with sensible built-in content (services, ad packages
and the flagship channel) so it never looks empty while you populate the CMS.

### Environment variables

Copy `.env.example` to `.env.local` and fill in the values. YouTube, Turso, R2,
Resend and Payload secrets are already required by the platform.

## Content model (CMS)

| Collection / Global     | Purpose                                                              |
| ----------------------- | -------------------------------------------------------------------- |
| **YouTube channels**    | Each channel in the network (logos, stats, socials, description).    |
| **Videos**              | Synced from the YouTube API, linked to a channel.                    |
| **YouTube services**    | Services offered to creators.                                        |
| **Blog & resources**    | Published guides with SEO fields and draft/publish workflow.         |
| **Advertising packages**| Packages shown on the Advertise page.                                |
| **Testimonials**        | Partner and creator quotes.                                          |
| **Brands**              | Brand partners and logos.                                            |
| **Consultation requests**| Consultation/booking enquiries.                                     |
| **Inquiries**           | Advertising and partnership enquiries.                               |
| **Newsletter subscribers**| Email sign-ups from across the site.                              |
| **Site settings**       | Brand name, tagline, socials, network stats, announcement, ad slots. |
| **Users**               | Admin/editor accounts.                                               |

### Adding a new YouTube channel

1. Go to **Payload → YouTube channels → Create new**.
2. Fill in the name, handle, description, logo, socials and YouTube channel ID.
3. Save. The channel appears on `/channels`, the homepage and the sitemap on the
   next revalidation — no developer required.

### YouTube sync

`/api/sync-youtube` syncs videos for **every** channel that has a YouTube
channel ID, and refreshes their public stats. It is wired to a daily Vercel cron
in `vercel.json` and can also be run from `scripts/sync-youtube.mjs`.

### Ad slots

Ad spaces are defined but hidden by default. Enable them in
**Payload → Site settings → Ad slots**, add your AdSense client/slot IDs, and the
reserved containers activate across the website, channel pages and blog. The
AdSense script is intentionally not loaded until you switch this on.

## Project structure

```
app/
  (frontend)/            # public website (home, channels, services, blog, ...)
  (payload)/             # Payload admin + REST API
collections/             # Payload collections
globals/                 # Payload globals (Site settings)
components/
  site/                  # website sections, cards, forms
  ui/                    # shadcn-style primitives
lib/
  data.ts                # cached data-access layer
  content.ts             # built-in fallback content
  seo.ts                 # metadata + JSON-LD helpers
  site.ts                # brand + navigation defaults
```

## Scripts

```bash
pnpm dev      # start the dev server
pnpm build    # production build
pnpm start    # run the production build
pnpm lint     # lint
```

## Notes

- Cache Components is enabled (`cacheComponents: true`); data access lives in
  `lib/data.ts` behind `use cache` with tags for easy revalidation.
- SEO: per-page metadata, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`
  and JSON-LD (Organization, WebSite, Article, Service, VideoObject, Breadcrumb).
