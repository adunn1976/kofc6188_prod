import { defineType } from 'sanity'

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional supporting text shown below the intro on the program page.',
      placeholder: 'Example: This program helps support families in our parish and community.',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'This text appears near the top of the program page under the title.',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
      description: 'Main program content section displayed on the program page under Description.',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
      description: 'Additional details section displayed on the program page below Content.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})