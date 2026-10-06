import type { Field } from 'payload'

/** Reusable SEO group so every editorial collection can be optimised from the CMS. */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO & social sharing',
  admin: {
    description: 'Optional overrides for search engines and social share cards.',
  },
  fields: [
    { name: 'title', type: 'text', label: 'Meta title' },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta description',
      maxLength: 220,
      admin: { description: 'Aim for 150–160 characters.' },
    },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Social share image' },
    { name: 'keywords', type: 'text', label: 'Keywords (comma separated)' },
    { name: 'noIndex', type: 'checkbox', label: 'Hide from search engines', defaultValue: false },
  ],
}
