import { defineType } from 'sanity'

export default defineType({
  name: 'bayFellowshipHallRental',
  title: 'Bay Fellowship Hall Rental Content',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Bay Fellowship Hall Rental',
      description: 'Main heading shown at the top of the Hall Rental page.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'Short introductory paragraph displayed below the page title.',
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
      description: 'Name shown in the Contact section.',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      description: 'Email used in the Contact section.',
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      description: 'Phone number shown in the Contact section.',
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
      description: 'Destination for the call-to-action button.',
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
