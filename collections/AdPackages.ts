import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone, authenticated } from '../lib/access'
import { AD_PLACEMENTS } from '../lib/constants'
import { seoField } from '../lib/fields/seo'
import { formatSlug } from '../lib/slug'

export const AdPackages: CollectionConfig = {
  slug: 'ad-packages',
  labels: { singular: 'Advertising package', plural: 'Advertising packages' },
  admin: {
    useAsTitle: 'name',
    group: 'Advertising',
    defaultColumns: ['name', 'placement', 'price', 'popular', 'order'],
    description: 'Packages shown on the Advertise with us page.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [formatSlug('name')] },
    },
    {
      name: 'placement',
      type: 'select',
      options: AD_PLACEMENTS.map((value) => ({ label: value.replace(/-/g, ' '), value })),
      required: true,
    },
    { name: 'summary', type: 'textarea', required: true, maxLength: 300 },
    { name: 'description', type: 'richText' },
    { name: 'price', type: 'text', required: true, admin: { description: 'e.g. “R4 500” or “From R2 000”.' } },
    { name: 'billingPeriod', type: 'text', admin: { description: 'e.g. “per campaign”, “per month”.' } },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: 'What’s included' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'popular', type: 'checkbox', defaultValue: false, admin: { description: 'Highlight this package.' } },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Request a quote' },
    { name: 'ctaHref', type: 'text', defaultValue: '/advertise#enquiry' },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    seoField,
  ],
}
