import { defineType } from 'sanity'

export default defineType({
  name: 'bayFellowshipHallRental',
  title: 'Bay Fellowship Hall Rental',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Bay Fellowship Hall Rental',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short bullet points for the rental opportunity.',
    },
    {
      name: 'details',
      title: 'Details',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description: 'Full details, policies, and additional information.',
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
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
    {
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'Request Rental Information',
    },
    {
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Bay Fellowship Hall Rental Content',
      }
    },
  },
})
