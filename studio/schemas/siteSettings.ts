import { defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'contactEmail',
      title: 'Contact Form Email',
      type: 'string',
      description: 'Email address that receives messages submitted via the Contact page form.',
      validation: (Rule) => Rule.required().email(),
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
