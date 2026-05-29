import { defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Large headline shown over the homepage hero image.',
      initialValue: 'Welcome to Knights of Columbus',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Short line shown below the hero title.',
      initialValue: 'Corpus Christi Council 6188',
    },
    {
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 3,
      description: 'Supporting text shown under the hero subtitle.',
      placeholder: 'Example: Faith • Family • Community • Life',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Background image shown in the top hero section.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'missionTitle',
      title: 'Mission Title',
      type: 'string',
      description: 'Heading for the mission section under the hero.',
      initialValue: 'Our Mission',
    },
    {
      name: 'missionText',
      title: 'Mission Text (Homepage Intro Paragraph)',
      type: 'text',
      rows: 4,
      description: 'This is the homepage paragraph under Mission Title (currently starts with “The Knights of Columbus is a Catholic fraternal organization…”).',
      placeholder: 'Example: The Knights of Columbus is a Catholic fraternal organization dedicated to serving our community through faith, family, and charitable works.',
    },
    {
      name: 'visionTitle',
      title: 'Vision Title',
      type: 'string',
      description: 'Heading for the vision section that follows the mission content.',
      initialValue: 'Our Vision',
    },
    {
      name: 'visionText',
      title: 'Vision Text',
      type: 'text',
      rows: 4,
      description: 'Text content for the vision section that appears after the mission section.',
      placeholder: 'Example: We envision a vibrant Catholic community strengthened through service, fellowship, and faith-filled leadership.',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Content',
      }
    },
  },
})