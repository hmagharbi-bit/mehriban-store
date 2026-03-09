import { client } from '@/sanity/lib/client'
import ProductDetailsClient from './ProductDetailsClient'
import { PRODUCT_BY_SLUG_QUERY } from '@/sanity/lib/queries'

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

    return <ProductDetailsClient product={product} />
}