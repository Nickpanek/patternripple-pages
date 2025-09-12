import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'PatternRipple',
  
  projectId: 'zomio78q',
  dataset: 'production',
  
  plugins: [structureTool()],
  
  schema: {
    types: schemaTypes,
  },
})
