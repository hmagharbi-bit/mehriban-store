import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
    name: 'default',
    title: 'mehriban',
    projectId: (() => {
        const val = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        return (val ? val.replace(/['"\s]+/g, '') : '') || '17ryprkd'
    })(),
    dataset: (() => {
        const val = process.env.NEXT_PUBLIC_SANITY_DATASET
        return (val ? val.replace(/['"\s]+/g, '') : '') || 'production'
    })(),
    basePath: '/admin',
    plugins: [structureTool()],
    schema: {
        types: schemaTypes,
    },
})
