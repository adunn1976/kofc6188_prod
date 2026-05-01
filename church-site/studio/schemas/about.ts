import { defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'homepageSectionTitle',
      title: 'Homepage About Section Title',
      type: 'string',
      initialValue: 'About Our Church',
    },
    {
      name: 'homepageSectionText',
      title: 'Homepage About Section Text',
      type: 'text',
      rows: 4,
      description: 'Short About section content displayed on the homepage.',
    },
    {
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vision',
      title: 'Vision',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'values',
      title: 'Values',
      type: 'text',
      rows: 4,
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
