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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Start Date',
      type: 'datetime',
      description: 'Leave blank if this is a recurring event — use Recurring Schedule above instead.',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    },
    {
      name: 'schedule',
      title: 'Recurring Schedule',
      type: 'string',
      description: 'Use this for recurring events without a fixed date (e.g. "9:30–10:45 AM Every Sunday").',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'ministry',
      title: 'Ministry',
      type: 'reference',
      to: [{ type: 'ministry' }],
    },
    {
      name: 'featuredOnHomepage',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'When enabled, this event appears in the Upcoming Events section on the homepage.',
      initialValue: false,
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
      ministry: 'ministry.title',
    },
    prepare(selection) {
      const { title, date, ministry } = selection
      const dateText = date ? new Date(date).toLocaleDateString() : ''
      return {
        title,
        subtitle: [ministry, dateText].filter(Boolean).join(' — '),
      }
    },
  },
})
