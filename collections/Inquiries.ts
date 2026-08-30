import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: { useAsTitle: 'brandName', defaultColumns: ['brandName', 'email', 'type', 'status', 'createdAt'] },
  fields: [
    { name: 'brandName', type: 'text', required: true },
    { name: 'contactName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'website', type: 'text' },
    { name: 'type', type: 'select', options: ['sponsored', 'review', 'event', 'ambassador', 'other'], required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'status', type: 'select', options: ['new', 'qualified', 'closed'], defaultValue: 'new' },
  ],
}
