import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '../lib/access'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Subscriber', plural: 'Newsletter subscribers' },
  admin: {
    useAsTitle: 'email',
    group: 'Audience',
    defaultColumns: ['email', 'name', 'source', 'status', 'createdAt'],
    description: 'Newsletter sign-ups collected across the site.',
  },
  access: {
    create: anyone,
    read: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'name', type: 'text' },
    { name: 'source', type: 'text', admin: { description: 'Which form/page the sign-up came from.' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
    },
  ],
}
