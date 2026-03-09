import { client } from '@/sanity/lib/client'
import ProductCard from '@/components/ProductCard'
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function ShopPage() {
    const products = await client.fetch(ALL_PRODUCTS_QUERY).catch(() => [])

    if (!products || products.length === 0) {
        return (
            <div className="container mx-auto px-6 py-24 min-h-screen flex items-center justify-center">
                <p className="text-gray-400 text-lg">
                    Aucun produit disponible pour le moment
                </p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-24 min-h-screen relative">

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl md:text-5xl text-white font-light tracking-[0.2em] mb-16 text-center">
                NOTRE COLLECTION
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

        </div>
    )
}