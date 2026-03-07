'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { urlForImage } from '@/sanity/lib/image';

interface ProductCardProps {
    product: {
        _id: string;
        nom: string;
        maison: string;
        prix: number;
        volume?: string;
        image: any;
        slug?: { current: string };
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // allow link wrap
        addItem({
            id: product._id,
            nom: product.nom,
            maison: product.maison,
            prix: product.prix,
            image: product.image,
        });
    };

    const productLink = product.slug?.current ? `/product/${product.slug.current}` : '#';

    return (
        <motion.div whileTap={{ scale: 0.98, opacity: 0.9 }} className="h-full">
            <Link href={productLink} className="group block h-full flex flex-col items-center">
                <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative w-full aspect-[4/5] bg-[#022c22]/10 backdrop-blur-md rounded-t-full rounded-b-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(184,41,234,0.15)] group-hover:border-neon-violet/30 border border-white/10 mb-6"
                >
                    {/* Image container without padding */}
                    <motion.img
                        src={product.image && typeof product.image === 'object' ? urlForImage(product.image).url() : product.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200"}
                        alt={product.nom}
                        className="w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>

                {/* External Text Details */}
                <div className="w-full px-2 flex flex-col flex-grow bg-transparent text-center justify-end relative z-20">
                    <p className="text-[0.65rem] tracking-[0.2em] font-[family-name:var(--font-manrope)] text-gray-300 mb-2 uppercase">
                        {product.maison}
                    </p>
                    <h3 className="font-[family-name:var(--font-noto-serif)] text-2xl text-white font-bold group-hover:text-royal-gold transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {product.nom}
                    </h3>

                    <div className="mt-4 pt-4 flex items-center justify-between border-t border-white/10">
                        <div className="font-[family-name:var(--font-manrope)] text-lg tracking-wider font-medium flex items-center gap-2">
                            <span className="text-[#c5a059]">{product.prix} <span className="text-sm">DZD</span></span>
                            {product.volume && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                                    <span className="text-gray-400 text-sm tracking-widest">
                                        {product.volume.replace(/ml$/i, '').trim()}ml
                                    </span>
                                </>
                            )}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddToCart}
                            className="p-3 rounded-full bg-[#c5a059] text-black shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-all duration-300"
                            aria-label="Ajouter au Panier"
                        >
                            <ShoppingBag className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
