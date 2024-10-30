import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'instagram',
  projectId: '8o6rjanl',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
