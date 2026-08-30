import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'youtubeId', 'featured', 'publishedAt'] },
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
  ],
}
