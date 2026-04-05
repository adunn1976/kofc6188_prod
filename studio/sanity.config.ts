import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas/schema'

export default defineConfig({
  name: 'kofc6188-studio',
  title: 'KofC 6188 Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 's5he2gec',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },

  basePath: '/',
})
