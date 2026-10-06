/**
 * Canonical brand + navigation configuration.
 *
 * These values act as sensible defaults for the whole site. Anything that can be
 * overridden from Payload → Site settings will fall back to these when unset.
 */
export const site = {
  name: 'Latest Scoop Media',
  shortName: 'Latest Scoop',
  legalName: 'Latest Scoop Media',
  handle: '@latestscoop000',
  tagline: 'A South African digital media network',
  description:
    'Latest Scoop Media is a South African digital media network. We run a growing family of YouTube channels, help creators start and grow their own, and connect brands with engaged audiences across YouTube, web and social.',
  mission:
    'Grow audiences, tell great stories and help creators build sustainable YouTube businesses.',
  youtubeUrl: 'https://www.youtube.com/@latestscoop000',
  subscribeUrl: 'https://www.youtube.com/@latestscoop000?sub_confirmation=1',
  contactEmail: 'hello@latestscoop.co.za',
  phone: '',
  location: 'Johannesburg, South Africa',
  socials: {
    youtube: 'https://www.youtube.com/@latestscoop000',
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
    facebook: 'https://www.facebook.com/',
    x: 'https://x.com/',
  },
  stats: {
    subscribers: '250K+',
    views: '40M+',
    videos: '2,000+',
    channels: '1',
  },
  /** Primary desktop navigation. */
  nav: [
    { label: 'Channels', href: '/channels' },
    { label: 'Services', href: '/services' },
    { label: 'Advertise', href: '/advertise' },
    { label: 'Blog', href: '/blog' },
  ],
  /** Secondary navigation surfaced in the header dropdown and mobile menu. */
  secondaryNav: [
    { label: 'Start a YouTube channel', href: '/start-a-channel' },
    { label: 'Videos', href: '/videos' },
    { label: 'Social media', href: '/social' },
    { label: 'About us', href: '/about' },
    { label: 'Contact & bookings', href: '/contact' },
  ],
  /** Grouped footer navigation. */
  footerNav: [
    {
      title: 'Network',
      links: [
        { label: 'YouTube channels', href: '/channels' },
        { label: 'Latest videos', href: '/videos' },
        { label: 'Social media', href: '/social' },
        { label: 'About us', href: '/about' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'YouTube services', href: '/services' },
        { label: 'Start a channel', href: '/start-a-channel' },
        { label: 'Book a consultation', href: '/contact' },
      ],
    },
    {
      title: 'Work with us',
      links: [
        { label: 'Advertise with us', href: '/advertise' },
        { label: 'Brand partnerships', href: '/brands' },
        { label: 'Blog & resources', href: '/blog' },
      ],
    },
  ],
} as const
