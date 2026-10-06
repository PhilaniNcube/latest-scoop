import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone, authenticated } from '../lib/access'
import { SOCIAL_PLATFORMS } from '../lib/constants'
import { seoField } from '../lib/fields/seo'
import { formatSlug } from '../lib/slug'

export const Channels: CollectionConfig = {
  slug: 'channels',
  labels: { singular: 'YouTube channel', plural: 'YouTube channels' },
  admin: {
    useAsTitle: 'name',
    group: 'YouTube',
    defaultColumns: ['name', 'handle', 'featured', 'status', 'order'],
    description: 'Every YouTube channel in the network. Add a new channel here and it appears across the site.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  defaultSort: 'order',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: { position: 'sidebar', description: 'Auto-generated from the name.' },
              hooks: { beforeValidate: [formatSlug('name')] },
            },
            { name: 'tagline', type: 'text', admin: { description: 'Short one-liner shown on the channel card.' } },
            { name: 'handle', type: 'text', admin: { description: 'e.g. @latestscoop000' } },
            { name: 'shortDescription', type: 'textarea', maxLength: 260 },
            { name: 'description', type: 'richText' },
            { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Square channel avatar/logo.' } },
            { name: 'banner', type: 'upload', relationTo: 'media', admin: { description: 'Wide banner image (16:9 or wider).' } },
          ],
        },
        {
          label: 'YouTube & stats',
          fields: [
            {
              name: 'channelId',
              type: 'text',
              label: 'YouTube channel ID',
              admin: { description: 'Starts with UC… — used to sync this channel’s videos automatically.' },
            },
            { name: 'url', type: 'text', label: 'YouTube URL' },
            {
              type: 'row',
              fields: [
                { name: 'subscriberCount', type: 'number', defaultValue: 0, admin: { width: '33%' } },
                { name: 'viewCount', type: 'number', defaultValue: 0, admin: { width: '33%' } },
                { name: 'videoCount', type: 'number', defaultValue: 0, admin: { width: '33%' } },
              ],
            },
            {
              name: 'socials',
              type: 'array',
              labels: { singular: 'Social link', plural: 'Social links' },
              fields: [
                { name: 'platform', type: 'select', options: [...SOCIAL_PLATFORMS], required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'featured', type: 'checkbox', defaultValue: false, admin: { description: 'Show on the homepage.' } },
        { name: 'order', type: 'number', defaultValue: 100, admin: { description: 'Lower numbers appear first.' } },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Coming soon', value: 'coming-soon' },
            { label: 'Archived', value: 'archived' },
          ],
        },
      ],
    },
  ],
}
