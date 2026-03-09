export const parfumSchema = {
  name: 'parfum',
  title: 'Parfum',
  type: 'document',
  fields: [
    { name: 'nom', title: 'Nom du Parfum', type: 'string' },
    { name: 'maison', title: 'Maison de Parfum', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'nom', maxLength: 96 }
    },
    {
      name: 'notes',
      title: 'Notes Olfactives',
      type: 'object',
      fields: [
        { name: 'tete', title: 'Notes de Tête', type: 'string' },
        { name: 'coeur', title: 'Notes de Cœur', type: 'string' },
        { name: 'fond', title: 'Notes de Fond', type: 'string' }
      ]
    },
    {
      name: 'image',
      title: 'Main Image (Featured)',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'images',
      title: 'Product Images Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    { name: 'prix', title: 'Prix', type: 'number' }
  ]
}
