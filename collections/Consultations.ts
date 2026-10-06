import type { CollectionConfig } from 'payload'

import { adminsOnly, anyone } from '../lib/access'
import { SERVICE_CATEGORIES } from '../lib/constants'

export const Consultations: CollectionConfig = {
  slug: 'consultations',
  labels: { singular: 'Consultation request', plural: 'Consultation requests' },
  admin: {
    useAsTitle: 'name',
    group: 'Audience',
    defaultColumns: ['name', 'email', 'serviceType', 'status', 'createdAt'],
    description: 'Bookings and consultation requests from creators. Ready for online scheduling and payments.',
  },
  access: {
    create: anyone,
    read: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'phone', type: 'text' },
    { name: 'channelName', type: 'text', label: 'Channel / brand name' },
    { name: 'channelUrl', type: 'text', label: 'Channel / website URL' },
    {
      name: 'serviceType',
      type: 'select',
      label: 'Interested in',
      defaultValue: 'not-sure',
      options: [
        { label: 'Not sure yet', value: 'not-sure' },
        { label: 'Start a new channel', value: 'start-channel' },
        ...SERVICE_CATEGORIES.map((value) => ({ label: value.replace(/-/g, ' '), value })),
      ],
    },
    { name: 'budget', type: 'text' },
    { name: 'preferredDate', type: 'date', label: 'Preferred date' },
    { name: 'preferredTime', type: 'text', admin: { description: 'e.g. Weekday mornings.' } },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Completed', value: 'completed' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    { name: 'source', type: 'text', admin: { description: 'Page the request came from.' } },
  ],
}
