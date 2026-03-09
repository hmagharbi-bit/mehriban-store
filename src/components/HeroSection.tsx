"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";

export default function HeroSection({ product }: { product?: any }) {
    const imageUrl = product?.image && typeof product.image === 'object' ? urlForImage(product.image).url() : product?.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800";
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden m-0 p-0 bg-transparent">

            {/* Ambient Lighting Background */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-royal-gold/10 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-deep/20 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Main Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-32 lg:pt-40">

                {/* Container for Arch and Typography to keep them vertically aligned together */}
                <div className="relative flex justify-center items-center w-full">

                    {/* Typography Background Layer (Behind Arch) */}
                    <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap z-0 select-none opacity-40 blur-[1px] pointer-events-none">
                        <span className="font-[family-name:var(--font-noto-serif)] text-[14vw] tracking-[0.05em] text-royal-gold uppercase font-light">
                            MEHRIBAN
                        </span>
                    </div>

                    {/* Main Arched Window */}
                    <div className="relative z-10 w-[240px] h-[360px] md:w-[320px] md:h-[480px] lg:w-[380px] lg:h-[540px] rounded-t-full rounded-b-3xl overflow-hidden border-[1px] border-royal-gold/20 shadow-[0_30px_80px_rgba(2,26,18,0.8)] backdrop-blur-md bg-transparent group">

                        {/* Inner Float Animation for Image */}
                        <motion.div
                            animate={{ y: [-20, 20, -20], scale: [1, 1.05, 1] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-[-50px] z-0 flex flex-col items-center justify-center"
                        >
                            {/* Radial Glow behind the Bottle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-royal-gold/40 rounded-full blur-[80px] z-0 pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-white/50 rounded-full blur-[50px] z-0 pointer-events-none" />

                            <Image
                                src={imageUrl}
                                alt={product?.nom || "MEHRIBAN Perfume"}
                                fill
                                className="object-cover opacity-100 transition-all duration-700 hover:scale-105 z-10"
                                priority
                            />
                        </motion.div>

                        {/* Soft Base Gradient to ensure text readability below the arch */}
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#021A12]/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Typography Foreground Layer (In front of Arch) */}
                    <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap z-20 select-none pointer-events-none">
                        <span className="font-[family-name:var(--font-noto-serif)] text-[14vw] tracking-[0.05em] text-transparent uppercase font-light bg-clip-text bg-gradient-to-b from-royal-gold to-[#A67C00]/30 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" style={{ WebkitTextStroke: '1px rgba(212,175,55,0.5)' }}>
                            MEHRIBAN
                        </span>
                    </div>
                </div>

                {/* Text and CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-center z-30 relative mt-16 md:mt-24"
                >
                    <h1 className="font-[family-name:var(--font-noto-serif)] text-3xl md:text-4xl lg:text-5xl text-white font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,1)] tracking-widest mb-4">
                        L'ESSENCE DE L'ABSOLU
                    </h1>
                    <p className="font-[family-name:var(--font-manrope)] text-xs md:text-sm lg:text-base text-gray-300 tracking-wider mb-8 max-w-lg mx-auto font-light px-6">
                        Découvrez une collection olfactive où l'antigravité rencontre l'artisanat du luxe français.
                    </p>
                    <motion.div whileTap={{ scale: 0.95, opacity: 0.8 }} className="inline-block">
                        <Link href="/shop" className="inline-block">
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-transparent border border-royal-gold text-royal-gold font-[family-name:var(--font-manrope)] text-xs md:text-sm tracking-[0.15em] hover:bg-royal-gold hover:text-obsidian transition-all duration-500 rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                DÉCOUVRIR LA COLLECTION
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
