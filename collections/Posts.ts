import type { CollectionConfig } from 'payload'

import { adminsOnly, authenticated, publishedOrAuthenticated } from '../lib/access'
import { seoField } from '../lib/fields/seo'
import { formatSlug } from '../lib/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Blog & resources' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'status', 'category', 'publishedAt', 'featured'],
    description: 'Articles and guides on YouTube, content creation, social media and digital marketing.',
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  defaultSort: '-publishedAt',
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
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 320 },
    { name: 'content', type: 'richText' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'authorName', type: 'text', defaultValue: 'Latest Scoop Media' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: { position: 'sidebar', description: 'Estimated reading time in minutes.' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    seoField,
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = originalDoc?.publishedAt || new Date().toISOString()
        }
        return data
      },
    ],
  },
}
