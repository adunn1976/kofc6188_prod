import { defineType } from 'sanity'

export default defineType({
  name: 'sermon',
  title: 'Sermon',
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
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
    },
    {
      name: 'scripture',
      title: 'Scripture',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
    },
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Audio', value: 'audio' },
          { title: 'Video', value: 'video' },
          { title: 'Text', value: 'text' },
        ],
      },
      initialValue: 'audio',
    },
    {
      name: 'mediaUrl',
      title: 'Media URL',
      type: 'url',
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
      subtitle: 'speaker',
    },
  },
})
