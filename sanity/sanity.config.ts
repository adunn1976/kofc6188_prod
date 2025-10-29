import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'K of C Council 6188 CMS',
  projectId: '<your_project_id>',
  dataset: 'production',
  plugins: [deskTool()],
  schema: { types: schemas }
})
