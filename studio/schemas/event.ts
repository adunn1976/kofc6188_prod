import { defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: [{ type: 'program' }],
      validation: (Rule) => Rule.required().error('Please select a program for this event.'),
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      programTitle: 'program.title',
    },
    prepare(selection) {
      const { title, date, programTitle } = selection
      const dateText = date ? new Date(date).toLocaleDateString() : ''
      return {
        title,
        subtitle: [programTitle, dateText].filter(Boolean).join(' — '),
      }
    },
  },
})