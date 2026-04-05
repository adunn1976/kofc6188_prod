import { defineType } from 'sanity'

export default defineType({
  name: 'officer',
  title: 'Council Officer',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Grand Knight', value: 'Grand Knight' },
          { title: 'Deputy Grand Knight', value: 'Deputy Grand Knight' },
          { title: 'Chancellor', value: 'Chancellor' },
          { title: 'Recorder', value: 'Recorder' },
          { title: 'Treasurer', value: 'Treasurer' },
          { title: 'Lecturer', value: 'Lecturer' },
          { title: 'Warden', value: 'Warden' },
          { title: 'Inside Guard', value: 'Inside Guard' },
          { title: 'Outside Guard', value: 'Outside Guard' },
          { title: 'Trustee (1 Year)', value: 'Trustee (1 Year)' },
          { title: 'Trustee (2 Year)', value: 'Trustee (2 Year)' },
          { title: 'Trustee (3 Year)', value: 'Trustee (3 Year)' },
        ],
      },
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Brief biography of the officer',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'email',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for accessibility and SEO.',
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the officer list.',
      validation: (Rule) => Rule.min(1).integer(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
