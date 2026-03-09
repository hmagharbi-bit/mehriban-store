export const productSchema = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'nom',
            title: 'Nom du Produit (Title)',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'maison',
            title: 'Maison',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'nom',
                maxLength: 96
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'volume',
            title: 'Volume (e.g. 50ml)',
            type: 'string',
        },
        {
            name: 'prix',
            title: 'Prix (Price)',
            type: 'number',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'image',
            title: 'Main Image (Featured)',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'images',
            title: 'Product Images Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }]
        },
        {
            name: 'notes',
            title: 'Notes Olfactives',
            type: 'object',
            fields: [
                { name: 'tete', title: 'Notes de Tête (Top notes)', type: 'string' },
                { name: 'coeur', title: 'Notes de Cœur (Heart notes)', type: 'string' },
                { name: 'fond', title: 'Notes de Fond (Base notes)', type: 'string' }
            ]
        }
    ]
};
