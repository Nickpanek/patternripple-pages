import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'PatternRipple',
  projectId: 'zomio78q',
  dataset: 'production',
  basePath: '/studio', // important for routing
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
