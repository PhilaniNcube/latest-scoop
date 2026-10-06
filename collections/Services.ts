import type { CollectionConfig } from 'payload'

import { adminsOnly, authenticated, publishedOrAuthenticated } from '../lib/access'
import { SERVICE_CATEGORIES } from '../lib/constants'
import { seoField } from '../lib/fields/seo'
import { formatSlug } from '../lib/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'YouTube services' },
  admin: {
    useAsTitle: 'title',
    group: 'YouTube',
    defaultColumns: ['title', 'category', 'featured', 'status', 'order'],
    description: 'The services offered to creators — setup, branding, growth, monetization and more.',
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      hooks: { beforeValidate: [formatSlug('title')] },
    },
    {
      name: 'icon',
      type: 'text',
      admin: { description: 'Lucide icon name, e.g. Rocket, Palette, BarChart3, DollarSign.' },
    },
    {
      name: 'category',
      type: 'select',
      options: SERVICE_CATEGORIES.map((value) => ({ label: value.replace(/-/g, ' '), value })),
    },
    { name: 'summary', type: 'textarea', required: true, maxLength: 300 },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: 'What’s included' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'deliverables',
      type: 'array',
      labels: { singular: 'Deliverable', plural: 'Deliverables' },
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'price', type: 'text', admin: { description: 'e.g. “From R1 500” or “Custom quote”.' } },
    { name: 'priceNote', type: 'text', admin: { description: 'Small print under the price.' } },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Request this service' },
    { name: 'ctaHref', type: 'text', defaultValue: '/contact' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: { position: 'sidebar' },
    },
    seoField,
  ],
}
