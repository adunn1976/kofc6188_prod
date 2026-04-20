import { defineType } from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'audience',
      title: 'Audience',
      type: 'string',
      options: {
        list: [
          { title: 'All Church', value: 'all' },
          { title: 'Members', value: 'members' },
          { title: 'Youth', value: 'youth' },
          { title: 'Volunteers', value: 'volunteers' },
        ],
      },
      initialValue: 'all',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
    },
    prepare(selection) {
      const { title, date } = selection
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : '',
      }
    },
  },
})
