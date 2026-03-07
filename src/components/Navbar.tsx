'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { items, openCart } = useCartStore();
    const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

    // Hydration fix for zustand persist
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'Boutique', href: '/shop' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-royal-gold/10 py-4' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    <Link href="/" className="font-[family-name:var(--font-noto-serif)] text-royal-gold text-2xl tracking-[0.2em]">
                        MEHRIBAN
                    </Link>

                    {/* Right Side Container */}
                    <div className="flex flex-1 justify-end items-center gap-8">
                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <motion.div key={link.name} whileTap={{ scale: 0.95, opacity: 0.7 }}>
                                    <Link
                                        href={link.href}
                                        className="text-sm tracking-widest uppercase hover:text-royal-gold transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="flex items-center gap-6">
                            <motion.div whileTap={{ scale: 0.9, opacity: 0.7 }}>
                                <button onClick={openCart} className="relative group p-2 flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-foreground group-hover:text-royal-gold transition-colors" />
                                    {mounted && cartItemCount > 0 && (
                                        <span className="absolute top-0 right-0 bg-royal-gold text-obsidian text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </button>
                            </motion.div>

                            {/* Mobile Menu Toggle */}
                            <motion.button
                                whileTap={{ scale: 0.9, opacity: 0.7 }}
                                className="md:hidden text-foreground hover:text-royal-gold transition-colors"
                                onClick={() => setIsMobileMenuOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-md flex flex-col items-center justify-center"
                    >
                        <button
                            className="absolute top-6 right-6 p-2 text-foreground hover:text-royal-gold transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <nav className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-[family-name:var(--font-noto-serif)] text-3xl tracking-widest text-foreground hover:text-royal-gold transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    openCart();
                                }}
                                className="font-[family-name:var(--font-noto-serif)] text-3xl tracking-widest text-foreground hover:text-royal-gold transition-colors"
                            >
                                Panier ({mounted ? cartItemCount : 0})
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
