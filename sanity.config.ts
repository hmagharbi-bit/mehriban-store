import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
    name: 'default',
    title: 'MEHRIBAN',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '17ryprkd',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/admin',
    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
})
