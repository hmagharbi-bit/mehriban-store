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
    { name: 'image', title: 'Image', type: 'string' }, // use string for mock image url for now
    { name: 'prix', title: 'Prix', type: 'number' }
  ]
}
