import { defineField, defineType } from 'sanity';

export const homeSchema = defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'Main title in the hero section (e.g., MEHRIBAN)',
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            description: 'Subtitle or description under the main title',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                }),
            ],
        }),
    ],
});
