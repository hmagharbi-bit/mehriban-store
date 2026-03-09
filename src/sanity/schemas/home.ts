import { defineType, defineField } from 'sanity';

export const homeSchema = defineType({
    name: 'home',
    title: 'Home Page (Hero Section)',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'Call to Action Button Text (Left)',
            type: 'string',
            initialValue: 'Shop Now',
        }),
    ],
    preview: {
        select: {
            title: 'heroTitle',
            media: 'heroImage',
        },
        prepare(selection) {
            return {
                title: selection.title || 'Home Page Details',
                media: selection.media
            }
        }
    }
});
