import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    group: 'YouTube',
    defaultColumns: ['title', 'channel', 'youtubeId', 'featured', 'publishedAt'],
  },
  fields: [
    { name: 'youtubeId', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'thumbnail', type: 'text' },
    { name: 'publishedAt', type: 'date' },
    { name: 'duration', type: 'text' },
    { name: 'viewCount', type: 'number' },
    { name: 'likeCount', type: 'number' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    {
      name: 'channel',
      type: 'relationship',
      relationTo: 'channels',
      index: true,
      admin: { description: 'Which network channel this video belongs to.' },
    },
  ],
}
