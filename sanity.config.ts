import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

export default defineConfig({
  name: 'default',
  title: 'PatternRipple',
  projectId: 'zomio78q',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: { types: [] }, // keep empty for this test
})
