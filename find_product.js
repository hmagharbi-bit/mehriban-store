const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '17ryprkd',
    dataset: 'production',
    apiVersion: '2024-03-04',
    useCdn: false,
});

async function findProduct() {
    try {
        const products = await client.fetch('*[_type in ["product", "parfum"] && nom match "REEF 33"]{_id, nom}');
        console.log(JSON.stringify(products, null, 2));
    } catch (err) {
        console.error(err);
    }
}

findProduct();
