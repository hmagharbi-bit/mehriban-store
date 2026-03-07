'use client';

import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { urlForImage } from '@/sanity/lib/image';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="min-h-screen" />; // avoid hydration mismatch

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-6 py-32 min-h-screen max-w-5xl flex flex-col items-center justify-center text-center">
                <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl text-royal-gold font-light tracking-[0.2em] mb-8">
                    VOTRE PANIER EST VIDE
                </h1>
                <p className="text-gray-400 font-[family-name:var(--font-manrope)] tracking-widest uppercase mb-12">
                    Découvrez notre collection pour trouver votre signature olfactive.
                </p>
                <motion.div whileTap={{ scale: 0.95, opacity: 0.8 }} className="inline-block">
                    <Link
                        href="/shop"
                        className="inline-block px-10 py-4 bg-transparent border border-royal-gold text-royal-gold font-[family-name:var(--font-manrope)] tracking-[0.15em] hover:bg-royal-gold hover:text-obsidian transition-all duration-500 rounded-sm"
                    >
                        RETOURNER À LA BOUTIQUE
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-24 min-h-screen max-w-6xl relative z-10">
            <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl text-white font-light tracking-[0.2em] mb-16 pb-6 border-b border-royal-gold/20">
                VOTRE SÉLECTION
            </h1>

            <div className="flex flex-col lg:flex-row gap-16 gap-y-12">
                <div className="flex-grow flex flex-col gap-8">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col sm:flex-row items-center gap-6 glassmorphism p-6 rounded-xl relative overflow-hidden group"
                        >
                            <div className="w-24 h-32 relative flex-shrink-0">
                                <img src={item.image && typeof item.image === 'object' ? urlForImage(item.image).url() : item.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200"} alt={item.nom} className="w-full h-full object-cover rounded-md" />
                            </div>

                            <div className="flex-grow flex flex-col text-center sm:text-left">
                                <p className="text-xs tracking-[0.2em] font-[family-name:var(--font-manrope)] text-royal-gold/80 mb-1 uppercase">
                                    {item.maison}
                                </p>
                                <h3 className="font-[family-name:var(--font-noto-serif)] text-2xl text-foreground mb-4">
                                    {item.nom}
                                </h3>
                                <span className="font-[family-name:var(--font-manrope)] text-lg text-white font-light">
                                    {item.prix} €
                                </span>
                            </div>

                            <div className="flex items-center gap-6 mt-4 sm:mt-0">
                                <div className="flex items-center gap-4 bg-obsidian/50 px-4 py-2 border border-white/10 rounded-full">
                                    <motion.button whileTap={{ scale: 0.8, opacity: 0.8 }} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-royal-gold transition-colors">
                                        <Minus className="w-4 h-4" />
                                    </motion.button>
                                    <span className="w-4 text-center">{item.quantity}</span>
                                    <motion.button whileTap={{ scale: 0.8, opacity: 0.8 }} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-royal-gold transition-colors">
                                        <Plus className="w-4 h-4" />
                                    </motion.button>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.85, opacity: 0.8 }}
                                    onClick={() => removeItem(item.id)}
                                    className="p-3 text-gray-500 hover:text-red-400 transition-colors"
                                    aria-label="Supprimer"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="glassmorphism p-8 rounded-xl sticky top-32">
                        <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl tracking-[0.1em] mb-8 text-white border-b border-royal-gold/20 pb-4">
                            RÉSUMÉ
                        </h2>

                        <div className="flex justify-between items-end mb-8">
                            <span className="font-[family-name:var(--font-manrope)] text-gray-400 font-light text-sm tracking-widest uppercase">Total</span>
                            <span className="font-[family-name:var(--font-noto-serif)] text-3xl text-royal-gold font-light">{getCartTotal()} €</span>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                        >
                            <Link href="/checkout" className="block w-full py-4 text-center bg-royal-gold text-obsidian font-[family-name:var(--font-manrope)] text-sm font-medium tracking-[0.2em] shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)] transition-all duration-300">
                                COMMANDER
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
