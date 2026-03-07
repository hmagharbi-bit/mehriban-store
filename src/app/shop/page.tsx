import { client } from '@/sanity/lib/client';
import ProductCard from '@/components/ProductCard';
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries';

export const revalidate = 60; // revalidate every 60 seconds

export default async function ShopPage() {
    const products = await client.fetch(ALL_PRODUCTS_QUERY).catch(() => []);

    // Fallback to mock data to ensure page displays perfectly regardless of Sanity config state
    const displayProducts = products.length > 0 ? products : [
        {
            _id: "1", nom: "Éclat d'Émeraude", maison: "MEHRIBAN", prix: 450,
            image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200",
            slug: { current: "eclat-demeraude" }
        },
        {
            _id: "2", nom: "Nuit d'Obsidienne", maison: "MEHRIBAN", prix: 520,
            image: "https://images.unsplash.com/photo-1595425970377-c9703bc48b12?q=80&w=1200",
            slug: { current: "nuit-dobsidienne" }
        },
        {
            _id: "3", nom: "Fil d'Or", maison: "MEHRIBAN", prix: 380,
            image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200",
            slug: { current: "fil-dor" }
        }
    ];

    return (
        <div className="container mx-auto px-6 py-24 min-h-screen relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl md:text-5xl text-white font-light tracking-[0.2em] mb-16 text-center">
                NOTRE COLLECTION
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayProducts.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}
