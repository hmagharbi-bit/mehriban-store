import { createClient } from '@sanity/client';

const projectId = '17ryprkd';
const dataset = 'production';
const apiVersion = '2024-03-01';
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
    console.error("Please provide SANITY_API_TOKEN as an environment variable.");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
});

async function deleteDemoProducts() {
    const query = `*[_type in ["product", "parfum"] && (nom match "reef 33" || maison != "MEHRIBAN")] { _id, nom, maison }`;

    try {
        const productsToDelete = await client.fetch(query);

        if (productsToDelete.length === 0) {
            console.log('No demo products found matching the criteria.');
            return;
        }

        console.log(`Found ${productsToDelete.length} products to delete:`);
        productsToDelete.forEach((p: any) => console.log(`- ${p.nom} (Brand: ${p.maison}) [ID: ${p._id}]`));

        for (const product of productsToDelete) {
            console.log(`Deleting ${product._id}...`);
            await client.transaction()
                .delete(product._id)
                .delete(`drafts.${product._id}`)
                .commit();
        }

        console.log('Successfully deleted all matched demo products.');
    } catch (error) {
        console.error('Error deleting products:', error);
    }
}

deleteDemoProducts();
