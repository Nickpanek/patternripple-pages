import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import schemaTypes from './schemas';

export default defineConfig({
  name: 'patternripple',
  title: 'PatternRipple Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()], // removed visionTool()
  schema: { types: schemaTypes }
});
