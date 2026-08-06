import { defineType } from 'sanity'

export default defineType({
  name: 'worship',
  title: 'Worship Page Content',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Worship',
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
      name: 'serviceTimesTitle',
      title: 'Service Times Section Title',
      type: 'string',
      initialValue: 'Service Times',
    },
    {
      name: 'pulpitHeading',
      title: "Pulpit Section Heading",
      type: 'string',
      initialValue: "From the Pastor's Pulpit",
    },
    {
      name: 'pulpitContent',
      title: 'Pulpit Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description:
        "Monthly content for the pastor's message. You can format text and upload images (for example, a PDF converted to an image).",
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Worship Page Content',
      }
    },
  },
})
