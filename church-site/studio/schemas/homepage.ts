import { defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'Legacy fallback text. Prefer editing About Our Church section below.',
    },
    {
      name: 'aboutSection',
      title: 'About Our Church Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'About Our Church',
        },
        {
          name: 'text',
          title: 'Section Text',
          type: 'text',
          rows: 4,
        },
      ],
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Day', type: 'string' },
            { name: 'time', title: 'Time', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'primaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
    },
    {
      name: 'primaryCtaUrl',
      title: 'Primary Button URL',
      type: 'string',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
      }
    },
  },
})
