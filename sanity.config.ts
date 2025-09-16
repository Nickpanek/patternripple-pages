import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas' // <-- import your schema

export default defineConfig({
  name: 'default',
  title: 'PatternRipple',
  projectId: 'zomio78q',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {types: schemaTypes},
})
