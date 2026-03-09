'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronRight, Wind, Droplets, Mountain } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { urlForImage } from '@/sanity/lib/image';
import RelatedProducts from '@/components/RelatedProducts';

export default function ProductDetailsClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
    const addItem = useCartStore(state => state.addItem);

    // Initialize gallery with product images or fallback to the main image
    const initialMainImage = product.image ? urlForImage(product.image).url() : "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200";

    // Create an array of all images
    const allImages = React.useMemo(() => {
        const imagesArray = [];
        if (product.image) imagesArray.push(urlForImage(product.image).url());
        if (product.images && Array.isArray(product.images)) {
            product.images.forEach((img: any) => {
                imagesArray.push(urlForImage(img).url());
            });
        }
        if (imagesArray.length === 0) imagesArray.push(initialMainImage);
        return imagesArray;
    }, [product.image, product.images, initialMainImage]);

    const [selectedImage, setSelectedImage] = useState(allImages[0]);

    const handleAddToCart = () => {
        addItem({
            id: product._id,
            nom: product.nom,
            maison: product.maison,
            prix: product.prix,
            image: product.image,
        });
    };

    return (
        <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col relative">
            {/* Dynamic Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-royal-gold/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 font-[family-name:var(--font-manrope)] tracking-widest uppercase mb-12 relative z-10">
                <motion.div whileTap={{ scale: 0.95, opacity: 0.8 }}>
                    <Link href="/" className="hover:text-royal-gold transition-colors">Accueil</Link>
                </motion.div>
                <ChevronRight className="w-4 h-4" />
                <motion.div whileTap={{ scale: 0.95, opacity: 0.8 }}>
                    <Link href="/shop" className="hover:text-royal-gold transition-colors">Boutique</Link>
                </motion.div>
                <ChevronRight className="w-4 h-4" />
                <span className="text-royal-gold">{product.nom}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-16 items-center">

                {/* Left: Interactive 3D Image & Thumbnails */}
                <div className="w-full lg:w-1/2 flex-shrink-0 flex flex-col items-center justify-center relative perspective-1000">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md relative mb-8"
                    >
                        {/* 3D Hover Container for Main Image */}
                        <motion.div
                            whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative aspect-[3/4] rounded-3xl p-2 md:p-10 overflow-hidden group bg-[#022c22]/10 border border-royal-gold/10 w-full"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={selectedImage}
                                        alt={product.nom}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain relative z-10 transform translate-z-12 drop-shadow-2xl"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    {/* Scrollable Thumbnails Row */}
                    {allImages.length > 1 && (
                        <div className="w-full max-w-md flex items-center gap-4 overflow-x-auto scrollbar-hide py-2 px-1">
                            {allImages.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative flex-shrink-0 w-20 h-24 rounded-md overflow-hidden border-2 transition-all duration-300 ${selectedImage === img
                                        ? 'border-royal-gold opacity-100 scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                        : 'border-transparent opacity-50 hover:opacity-100 hover:border-royal-gold/30 hover:scale-105'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-cover bg-[#022c22]/30"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Details & Notes Olfactives */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full lg:w-1/2 flex flex-col relative z-10"
                >
                    <p className="font-[family-name:var(--font-manrope)] text-royal-gold tracking-[0.3em] text-sm mb-4 uppercase">
                        {product.maison}
                    </p>
                    <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl md:text-6xl text-white font-bold tracking-wide mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,1)]">
                        {product.nom}
                    </h1>
                    <div className="flex items-center gap-4 border-b border-royal-gold/20 pb-8 mb-8 inline-flex">
                        <p className="font-[family-name:var(--font-noto-serif)] text-3xl font-light flex items-center gap-3 text-royal-gold">
                            <span>{product.prix}</span>
                            <span>DZD</span>
                        </p>
                        {product.volume && (
                            <>
                                <span className="w-px h-8 bg-royal-gold/60" />
                                <span className="font-[family-name:var(--font-manrope)] text-xl text-white tracking-widest uppercase">
                                    {product.volume.replace(/ml$/i, '').trim()}ml
                                </span>
                            </>
                        )}
                    </div>

                    <div className="mb-10">
                        <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl text-white tracking-[0.1em] mb-10 text-center lg:text-left">
                            NOTES OLFACTIVES
                        </h2>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 bg-transparent"
                        >

                            {/* Notes de Tête */}
                            <div className="flex flex-col items-center text-center flex-1 w-full px-4">
                                <Wind className="w-6 h-6 text-royal-gold mb-4 opacity-90" />
                                <span className="text-lg text-royal-gold capitalize mb-3 font-[family-name:var(--font-noto-serif)]">Tête</span>
                                <span className="text-white/90 font-light text-sm leading-relaxed font-[family-name:var(--font-manrope)]">{product.notes?.tete || "Agrumes éclatants"}</span>
                            </div>

                            {/* Vertical Line Separator 1 (Hidden on Mobile) */}
                            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-royal-gold/30 to-transparent"></div>

                            {/* Mobile Line Separator 1 */}
                            <div className="block md:hidden h-px w-24 bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent"></div>

                            {/* Notes de Cœur */}
                            <div className="flex flex-col items-center text-center flex-1 w-full px-4">
                                <Droplets className="w-6 h-6 text-royal-gold mb-4 opacity-90" />
                                <span className="text-lg text-royal-gold capitalize mb-3 font-[family-name:var(--font-noto-serif)]">Cœur</span>
                                <span className="text-white/90 font-light text-sm leading-relaxed font-[family-name:var(--font-manrope)]">{product.notes?.coeur || "Fleurs précieuses"}</span>
                            </div>

                            {/* Vertical Line Separator 2 (Hidden on Mobile) */}
                            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-royal-gold/30 to-transparent"></div>

                            {/* Mobile Line Separator 2 */}
                            <div className="block md:hidden h-px w-24 bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent"></div>


                            {/* Notes de Fond */}
                            <div className="flex flex-col items-center text-center flex-1 w-full px-4">
                                <Mountain className="w-6 h-6 text-royal-gold mb-4 opacity-90" />
                                <span className="text-lg text-royal-gold capitalize mb-3 font-[family-name:var(--font-noto-serif)]">Fond</span>
                                <span className="text-white/90 font-light text-sm leading-relaxed font-[family-name:var(--font-manrope)]">{product.notes?.fond || "Bois rares et musc"}</span>
                            </div>

                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="w-full py-5 bg-royal-gold text-obsidian flex items-center justify-center gap-3 font-[family-name:var(--font-manrope)] text-sm font-medium tracking-[0.2em] shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-all duration-300"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        AJOUTER AU PANIER
                    </motion.button>
                </motion.div>
            </div>

            {/* Related Products Section */}
            <div className="mt-16 sm:mt-24 w-full relative z-20">
                <RelatedProducts products={relatedProducts} />
            </div>
        </div>
    );
}
