'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/sanity/lib/image';

export default function SideCart() {
    const [mounted, setMounted] = useState(false);
    const { items, isOpen, closeCart, updateQuantity, removeItem, getCartTotal } = useCartStore();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const total = getCartTotal();

    const parseImageUrl = (image: any) => {
        if (!image) return "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400";
        if (typeof image === 'object') return urlForImage(image).url();
        return image;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#022c22] border-l border-[#c5a059]/30 shadow-2xl z-[100] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#c5a059]/20">
                            <h2 className="font-[family-name:var(--font-noto-serif)] text-white text-xl tracking-widest uppercase flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
                                Panier
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <ShoppingBag className="w-16 h-16 text-[#c5a059]/50" />
                                    <p className="text-gray-300 font-[family-name:var(--font-manrope)] tracking-widest uppercase">
                                        Votre panier est vide
                                    </p>
                                    <button
                                        onClick={closeCart}
                                        className="px-8 py-3 bg-transparent border border-[#c5a059] text-[#c5a059] text-sm tracking-widest hover:bg-[#c5a059] hover:text-black transition-colors"
                                    >
                                        CONTINUER VOS ACHATS
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#c5a059]/30 transition-colors">
                                        {/* Image */}
                                        <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#0a231b] flex-shrink-0">
                                            <Image
                                                src={parseImageUrl(item.image)}
                                                alt={item.nom}
                                                fill
                                                className="object-cover opacity-100"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex justify-between items-start gap-2">
                                                <div>
                                                    <p className="text-[0.65rem] tracking-[0.2em] text-gray-400 uppercase mb-1">
                                                        {item.maison}
                                                    </p>
                                                    <h3 className="font-[family-name:var(--font-noto-serif)] text-white font-bold text-base tracking-wide">
                                                        {item.nom}
                                                    </h3>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Control */}
                                                <div className="flex items-center gap-3 bg-black/40 rounded-full px-3 py-1 border border-white/10">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-gray-400 hover:text-white"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm text-white font-medium w-4 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-gray-400 hover:text-white"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>

                                                <p className="text-[#c5a059] font-medium tracking-wide text-sm">
                                                    {(item.prix * item.quantity).toLocaleString()} DZD
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-[#c5a059]/30 bg-[#022c22]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-300 font-[family-name:var(--font-manrope)] tracking-widest uppercase text-sm">
                                        Total
                                    </span>
                                    <span className="text-[#c5a059] font-bold text-2xl tracking-wide">
                                        {total.toLocaleString()} DZD
                                    </span>
                                </div>
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="w-full py-4 bg-[#c5a059] text-black font-bold tracking-[0.15em] hover:bg-[#b59049] transition-colors rounded flex flex-col items-center justify-center gap-1 group"
                                >
                                    <span>VIEW BAG</span>
                                    <span className="text-xs font-semibold opacity-90">(أو إتمام الطلب)</span>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
