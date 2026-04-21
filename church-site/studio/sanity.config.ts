import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas/schema'

export default defineConfig({
  name: 'church-site-studio',
  title: 'Church Site Studio',

  projectId: 's5he2gec',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },

  basePath: '/',
})
