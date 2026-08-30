import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'video/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
    ],
    formatOptions: { format: 'webp', options: { quality: 80 } },
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
