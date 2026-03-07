export const orderSchema = {
    name: 'order',
    title: 'Orders',
    type: 'document',
    fields: [
        {
            name: 'customerName',
            title: 'Customer Name (Nom Complet)',
            type: 'string',
        },
        {
            name: 'phoneNumber',
            title: 'Phone Number (Numéro de Téléphone)',
            type: 'string',
        },
        {
            name: 'wilaya',
            title: 'Wilaya',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Address (Adresse)',
            type: 'text',
        },
        {
            name: 'items',
            title: 'Ordered Items',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'parfum' }, { type: 'product' }]
                }
            ]
        },
        {
            name: 'totalPrice',
            title: 'Total Price (DZD)',
            type: 'number',
        },
        {
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        },
        {
            name: 'orderDate',
            title: 'Order Date',
            type: 'datetime'
        }
    ],
    preview: {
        select: {
            title: 'customerName',
            total: 'totalPrice',
            date: 'createdAt'
        },
        prepare({ title, total, date }: any) {
            return {
                title: `${title} - ${total} DZD`,
                subtitle: `Order on ${new Date(date).toLocaleDateString()}`
            }
        }
    }
};
