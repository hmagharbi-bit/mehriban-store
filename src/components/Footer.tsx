"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <Link href={href}>
            <motion.div
                className="relative flex flex-col items-center justify-center text-gray-400 font-medium cursor-pointer"
                initial="initial"
                whileHover="hover"
            >
                <motion.span
                    variants={{
                        initial: { color: "#9ca3af", textShadow: "0px 0px 0px rgba(212,175,55,0)" },
                        hover: { color: "#d4af37", textShadow: "0px 0px 8px rgba(212,175,55,0.8)" }
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.span>
                <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-royal-gold origin-center shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                    variants={{
                        initial: { scaleX: 0, opacity: 0 },
                        hover: { scaleX: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            </motion.div>
        </Link>
    );
};

export default function Footer() {
    return (
        <footer className="w-full py-16 bg-transparent text-center border-t border-royal-gold/10 relative overflow-hidden z-10">
            {/* Background Glowing Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-royal-gold/30 to-transparent" />

            <div className="container mx-auto px-6 flex flex-col items-center gap-8">
                <Link href="/" className="font-[family-name:var(--font-noto-serif)] text-royal-gold text-3xl font-light tracking-[0.3em] hover:opacity-80 transition-opacity">
                    MEHRIBAN
                </Link>
                <div className="flex gap-6 text-sm tracking-widest uppercase">
                    <FooterLink href="/shop">Boutique</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
                </div>
                <p className="font-[family-name:var(--font-manrope)] text-gray-500/80 text-xs tracking-widest uppercase mt-8">
                    Alger, Algérie © 2026
                </p>
            </div>
        </footer>
    );
}

