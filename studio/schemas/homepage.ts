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
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
    },
    {
      name: 'missionText',
      title: 'Mission Text',
      type: 'text',
      rows: 4,
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