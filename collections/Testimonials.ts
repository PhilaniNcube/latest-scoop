import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone, authenticated } from '../lib/access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  admin: {
    useAsTitle: 'authorName',
    group: 'Advertising',
    defaultColumns: ['authorName', 'company', 'rating', 'featured', 'order'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  defaultSort: 'order',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorRole', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'client',
      options: [
        { label: 'Client', value: 'client' },
        { label: 'Brand partner', value: 'brand' },
        { label: 'Creator', value: 'creator' },
        { label: 'Community', value: 'community' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar' } },
  ],
}
