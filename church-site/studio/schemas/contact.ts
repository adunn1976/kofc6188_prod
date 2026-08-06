import { defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'officeHoursTitle',
      title: 'Office Hours Heading',
      type: 'string',
      initialValue: 'Office Hours',
    },
    {
      name: 'officeHours',
      title: 'Office Hours Text',
      type: 'text',
      rows: 4,
      description: 'Example: Mon–Thu: 9:00 AM – 4:00 PM\nFri: 9:00 AM – Noon',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Page Content',
      }
    },
  },
})
