export const homeSchema = {
    name: 'home',
    title: 'Home Page (Hero Section)',
    type: 'document',
    fields: [
        {
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
        },
        {
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'ctaButtonText',
            title: 'Call to Action Button Text (Left)',
            type: 'string',
            initialValue: 'Shop Now',
        },
    ],
};
