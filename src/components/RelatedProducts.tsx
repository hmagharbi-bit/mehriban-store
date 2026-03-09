'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { urlForImage } from '@/sanity/lib/image';

export default function RelatedProducts({ products }: { products: any[] }) {
    const addItem = useCartStore(state => state.addItem);

    if (!products || products.length === 0) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <section className="w-full py-24 px-6 lg:px-20 border-t border-royal-gold/10 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-deep/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="font-[family-name:var(--font-noto-serif)] text-3xl md:text-4xl text-royal-gold font-light tracking-widest text-center mb-4 uppercase">
                        Vous aimerez aussi
                    </h2>
                    <div className="w-16 h-px bg-royal-gold/50" />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
                >
                    {products.map((product) => {
                        const productImageUrl = product.image ? urlForImage(product.image).url() : "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600";

                        return (
                            <motion.div variants={itemVariants} key={product._id} className="relative group flex flex-col items-center">
                                {/* Badge logic (optional, but demonstrates the UI capability) */}
                                {product.isNew && (
                                    <div className="absolute top-4 right-4 z-20 bg-[#8c3a3a] text-white text-[0.65rem] font-bold tracking-widest px-3 py-1 rounded-sm shadow-md">
                                        NOUVEAU
                                    </div>
                                )}

                                <Link href={`/product/${product.slug?.current}`} className="w-full flex-1 flex flex-col items-center">
                                    {/* Image Container */}
                                    <div className="w-full aspect-[4/5] bg-[#022c22]/10 backdrop-blur-sm rounded-xl overflow-hidden mb-6 relative border border-royal-gold/10 group-hover:border-royal-gold/30 transition-colors duration-500 shadow-xl flex items-center justify-center p-4">
                                        <Image
                                            src={productImageUrl}
                                            alt={product.nom}
                                            fill
                                            className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                                        />
                                    </div>

                                    {/* Product Meta */}
                                    <div className="text-center w-full mb-6 flex-grow flex flex-col justify-end">
                                        <h3 className="font-[family-name:var(--font-noto-serif)] text-lg text-white font-medium tracking-wide mb-2 group-hover:text-royal-gold transition-colors duration-300">
                                            {product.nom}
                                        </h3>
                                        <p className="font-[family-name:var(--font-manrope)] text-royal-gold text-sm tracking-widest">
                                            {product.prix} DZD
                                        </p>
                                    </div>
                                </Link>

                                {/* Interactive Add to Cart Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addItem({
                                            id: product._id,
                                            nom: product.nom,
                                            maison: product.maison || 'Mehriban',
                                            prix: product.prix,
                                            image: product.image,
                                        });
                                    }}
                                    className="w-full py-3 px-4 bg-transparent border border-royal-gold/40 text-royal-gold font-[family-name:var(--font-manrope)] text-[0.75rem] font-bold tracking-[0.2em] uppercase hover:bg-royal-gold hover:text-obsidian transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Ajouter
                                </motion.button>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
