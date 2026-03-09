import { client } from '@/sanity/lib/client'
import ProductDetailsClient from './ProductDetailsClient'
import { PRODUCT_BY_SLUG_QUERY, RELATED_PRODUCTS_QUERY } from '@/sanity/lib/queries'

export default async function ProductPage({ params }: { params: any }) {

    const resolvedParams = await Promise.resolve(params)
    const slug = resolvedParams?.slug

    const product = await client
        .fetch(PRODUCT_BY_SLUG_QUERY, { slug })
        .catch(() => null)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-royal-gold text-2xl font-[family-name:var(--font-noto-serif)]">
                    Parfum Introuvable
                </h1>
            </div>
        )
    }

    const relatedProducts = await client
        .fetch(RELATED_PRODUCTS_QUERY, { slug, maison: product.maison })
        .catch(() => [])

    return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
}