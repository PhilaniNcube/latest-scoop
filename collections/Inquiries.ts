import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '../lib/access'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'brandName',
    group: 'Advertising',
    defaultColumns: ['brandName', 'email', 'type', 'status', 'createdAt'],
    description: 'Partnership and advertising enquiries submitted from the website.',
  },
  access: {
    create: anyone,
    read: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'brandName', type: 'text', required: true },
    { name: 'contactName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'phone', type: 'text' },
    { name: 'website', type: 'text' },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Sponsored video', value: 'sponsored' },
        { label: 'Product review', value: 'review' },
        { label: 'Event / appearance', value: 'event' },
        { label: 'Brand ambassador', value: 'ambassador' },
        { label: 'Website advertising', value: 'website-advertising' },
        { label: 'Social media campaign', value: 'social-campaign' },
        { label: 'YouTube services', value: 'youtube-services' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'budget', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    { name: 'source', type: 'text', admin: { description: 'Page the enquiry came from.' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Closed', value: 'closed' },
      ],
    },
  ],
}
