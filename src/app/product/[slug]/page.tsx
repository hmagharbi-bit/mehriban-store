import { client } from '@/sanity/lib/client';
import ProductDetailsClient from './ProductDetailsClient';
import { PRODUCT_BY_SLUG_QUERY } from '@/sanity/lib/queries';

export default async function ProductPage({ params }: { params: any }) {
    const resolvedParams = await Promise.resolve(params);
    const slug = resolvedParams?.slug;

    const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug }).catch(() => null);

    // Fallback to mock data if sanity query fails or product not found
    const mockProducts = [
        {
            _id: "1", nom: "Éclat d'Émeraude", maison: "MEHRIBAN", prix: 450,
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
            slug: { current: "eclat-demeraude" },
            notes: { tete: "Bergamote de Calabre", coeur: "Jasmin Sambac, Rose de Mai", fond: "Oud Noir, Vanille de Madagascar" }
        },
        {
            _id: "2", nom: "Nuit d'Obsidienne", maison: "MEHRIBAN", prix: 520,
            image: "https://images.unsplash.com/photo-1595425970377-c9703bc48b12?q=80&w=1200",
            slug: { current: "nuit-dobsidienne" },
            notes: { tete: "Poivre Noir, Safran", coeur: "Cuir, Iris Pallida", fond: "Ambre Gris, Musc Blanc" }
        },
        {
            _id: "3", nom: "Fil d'Or", maison: "MEHRIBAN", prix: 380,
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",
            slug: { current: "fil-dor" },
            notes: { tete: "Néroli, Cardamome", coeur: "Tubéreuse, Fleur d'Oranger", fond: "Bois de Santal, Fève Tonka" }
        }
    ];

    const displayProduct = product || mockProducts.find(p => p.slug.current === slug);

    if (!displayProduct) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-royal-gold text-2xl font-[family-name:var(--font-noto-serif)]">Parfum Introuvable</h1>
            </div>
        );
    }

    return <ProductDetailsClient product={displayProduct} />;
}
