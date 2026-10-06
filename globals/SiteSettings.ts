import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../lib/access'
import { SOCIAL_PLATFORMS } from '../lib/constants'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: {
    group: 'Configuration',
    description: 'Brand basics, contact details, network stats, announcement bar and ad slots.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'brandName', type: 'text', label: 'Brand name' },
            { name: 'shortName', type: 'text', label: 'Short name' },
            { name: 'tagline', type: 'text' },
            { name: 'description', type: 'textarea', maxLength: 400 },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email', label: 'Contact email' },
            { name: 'phone', type: 'text' },
            { name: 'location', type: 'text' },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socials',
              type: 'array',
              labels: { singular: 'Social link', plural: 'Social links' },
              fields: [
                { name: 'platform', type: 'select', options: [...SOCIAL_PLATFORMS], required: true },
                { name: 'url', type: 'text', required: true },
                { name: 'label', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Network stats',
          fields: [
            {
              name: 'stats',
              type: 'group',
              label: false,
              fields: [
                { name: 'subscribers', type: 'text', label: 'Total subscribers', admin: { description: 'e.g. 250K+' } },
                { name: 'views', type: 'text', label: 'Total views', admin: { description: 'e.g. 40M+' } },
                { name: 'videos', type: 'text', label: 'Total videos', admin: { description: 'e.g. 2,000+' } },
                { name: 'channels', type: 'text', label: 'Channels', admin: { description: 'e.g. 4' } },
              ],
            },
          ],
        },
        {
          label: 'Announcement',
          fields: [
            { name: 'announcementEnabled', type: 'checkbox', defaultValue: false },
            { name: 'announcementText', type: 'text' },
            { name: 'announcementHref', type: 'text', admin: { description: 'Optional link for the banner.' } },
          ],
        },
        {
          label: 'Ad slots',
          fields: [
            {
              name: 'adsEnabled',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'Reserved ad spaces stay hidden until enabled. Paste your AdSense values when you are ready to go live.',
              },
            },
            { name: 'adsenseClient', type: 'text', label: 'AdSense client ID', admin: { description: 'ca-pub-…' } },
            { name: 'websiteSlot', type: 'text', label: 'Website ad slot' },
            { name: 'channelSlot', type: 'text', label: 'Channel page ad slot' },
            { name: 'blogSlot', type: 'text', label: 'Blog ad slot' },
          ],
        },
      ],
    },
  ],
}
