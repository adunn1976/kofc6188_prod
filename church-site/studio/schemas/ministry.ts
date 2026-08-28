import { defineType } from 'sanity'

export default defineType({
  name: 'ministry',
  title: 'Mission & Outreach',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'vineHeading',
      title: 'The Vine / Food Pantry Heading',
      type: 'string',
      description: 'Optional heading specifically for The Vine / Food Pantry.',
    },
    {
      name: 'vineContent',
      title: 'The Vine / Food Pantry content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description: 'Content area for The Vine / Food Pantry — upload an image of the PDF or add formatted text here.',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'contactName',
      title: 'Contact Name',
      type: 'string',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
    },
    {
      name: 'image',
      title: 'Image',
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
      name: 'pulpitHeading',
      title: 'Pulpit Section Heading',
      type: 'string',
      description: 'Optional heading for a small pulpit/pdf section for this ministry (e.g. "The Vine Pulpit").',
    },
    {
      name: 'pulpitContent',
      title: 'Pulpit Content (PDF image)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description:
        'Small content area for a PDF preview or short note. Upload an image of the PDF here (or use formatted text). This mirrors the Worship page pulpit content.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
