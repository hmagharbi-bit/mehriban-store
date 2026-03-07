"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { mockParfums } from "@/lib/data";
import { urlForImage } from "@/sanity/lib/image";
import { useEffect, useState } from "react";

export default function ProductGallery({ initialProducts = [] }: { initialProducts?: any[] }) {
    const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; duration: number; delay: number }[]>([]);

    useEffect(() => {
        const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() < 0.1 ? 2 : 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2
        }));
        setStars(generatedStars);
    }, []);

    // 1. Ensure initialProducts is definitively an array
    const safeInitialProducts = Array.isArray(initialProducts) ? initialProducts : [];

    // 2. Fallback to mock data if no Sanity data is available
    const rawProducts = safeInitialProducts.length > 0 ? safeInitialProducts : mockParfums;

    // 3. Defensive check: Filter out any null/undefined products or drafts missing a slug
    const displayProducts = rawProducts.filter(
        (parfum: any) => parfum && parfum._id && parfum.slug && parfum.slug.current
    );

    if (displayProducts.length === 0) {
        return (
            <section className="relative w-full py-32 min-h-[50vh] px-6 lg:px-20 flex items-center justify-center bg-transparent">
                <p className="text-royal-gold font-[family-name:var(--font-noto-serif)] text-xl tracking-widest animate-pulse">
                    CHARGEMENT...
                </p>
            </section>
        );
    }

    return (
        <section className="relative w-full py-32 px-6 lg:px-20 overflow-hidden bg-transparent">
            {/* Background Ambience */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-royal-gold/10 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-emerald-deep/15 rounded-full blur-[100px] pointer-events-none z-0" />

            {/* Subtle Starfield Background */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full pointer-events-none z-0"
                    style={{
                        top: star.top,
                        left: star.left,
                        width: star.size,
                        height: star.size,
                        boxShadow: star.size > 1 ? "0 0 4px rgba(212, 175, 55, 0.5)" : "none", // Softer glow
                        backgroundColor: star.size > 1 ? "#c5a059" : "#ffffff",
                    }}
                    animate={{
                        opacity: [0.05, 0.5, 0.05],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}

            <div className="relative z-10 container mx-auto">
                <div className="text-center mb-24">
                    <h2 className="font-[family-name:var(--font-noto-serif)] text-3xl md:text-5xl text-royal-gold font-light tracking-widest mb-4">
                        LA COLLECTION
                    </h2>
                    <div className="w-24 h-[1px] bg-royal-gold/50 mx-auto"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32 relative">

                    {/* Thin Golden Curve Connecting Products (Desktop) */}
                    <div className="hidden md:block absolute top-[40%] left-[10%] w-[80%] h-[2px] z-0">
                        <svg className="w-full h-[50px] overflow-visible pointer-events-none">
                            <motion.path
                                d="M 0,0 Q 200,50 400,0 T 800,0 T 1200,0"
                                fill="transparent"
                                stroke="#c5a059"
                                strokeWidth="0.5"
                                className="drop-shadow-[0_0_5px_rgba(197,160,89,0.3)] opacity-40"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    {displayProducts.map((parfum: any, index: number) => (
                        <motion.div
                            key={parfum._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            whileHover={{ y: -15, transition: { duration: 0.4 } }}
                            className="relative z-10 w-full max-w-[320px]"
                        >
                            <Link href={`/product/${parfum.slug?.current || ""}`} className="flex flex-col items-center group cursor-pointer w-full">
                                {/* Floating Pedestal Frame */}
                                <div className="relative w-full aspect-[4/5] bg-[#022c22]/10 backdrop-blur-md rounded-t-full rounded-b-xl overflow-hidden flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(184,41,234,0.15)] group-hover:border-neon-violet/30 border border-white/10 mb-6">
                                    <Image
                                        src={parfum.image && typeof parfum.image === 'object' ? urlForImage(parfum.image).url() : parfum.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200"}
                                        alt={parfum.nom || "Parfum"}
                                        fill
                                        className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>

                                {/* External Text Details */}
                                <div className="text-center w-full px-2 flex flex-col justify-end">
                                    <p className="font-[family-name:var(--font-manrope)] text-[0.65rem] tracking-[0.2em] text-gray-300 uppercase mb-2">
                                        {parfum.maison}
                                    </p>
                                    <h3 className="font-[family-name:var(--font-noto-serif)] text-2xl text-white font-bold tracking-wide mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                        {parfum.nom}
                                    </h3>
                                    <p className="font-[family-name:var(--font-manrope)] text-sm font-light flex items-center justify-center gap-2">
                                        <span className="text-[#c5a059] font-medium tracking-wide">{parfum.prix} DZD</span>
                                        {parfum.volume && (
                                            <>
                                                <span className="w-1 h-1 rounded-full bg-gray-500" />
                                                <span className="text-gray-400 font-medium tracking-widest">
                                                    {parfum.volume.replace(/ml$/i, '').trim()}ml
                                                </span>
                                            </>
                                        )}
                                    </p>
                                </div>

                                {/* Hover Metadata (Olfactory Notes) */}
                                <div className="mt-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full glassmorphism rounded-sm p-4 border-t border-electric-cyan/20">
                                    <div className="flex flex-col gap-2 font-[family-name:var(--font-manrope)] text-xs text-gray-300 font-light tracking-wider">
                                        <p><span className="text-electric-cyan/80">Notes de Tête:</span> {parfum.notes?.tete || ""}</p>
                                        <p><span className="text-electric-cyan/80">Notes de Cœur:</span> {parfum.notes?.coeur || ""}</p>
                                        <p><span className="text-electric-cyan/80">Notes de Fond:</span> {parfum.notes?.fond || ""}</p>
                                    </div>
                                    <motion.button whileTap={{ scale: 0.9, opacity: 0.8 }} className="mt-4 px-6 py-2 bg-transparent border border-white/20 text-white text-xs tracking-widest hover:border-neon-violet hover:text-neon-violet transition-colors duration-300">
                                        DÉTAILS
                                    </motion.button>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
