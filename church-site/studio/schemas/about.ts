import { defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'aboutImage',
      title: 'About Page Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility.',
        },
      ],
      description: 'Optional image shown under the "About Our Church" heading.',
    },
    {
      name: 'mission',
      title: 'Mission',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for the Mission section.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vision',
      title: 'Vision',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for the Vision section.',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
      }
    },
  },
})
