"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

interface HomeData {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: any;
}

export default function HeroSection({ homeData }: { homeData?: HomeData | null }) {
    // If no Sanity image is set, use the fallback user-provided image from the public folder
    const imageUrl = homeData?.heroImage && typeof homeData.heroImage === 'object'
        ? urlForImage(homeData.heroImage).url()
        : "/aurélia-perfume.jpg";

    const title = homeData?.heroTitle || "L'ESSENCE DE L'ABSOLU";
    const subtitle = homeData?.heroSubtitle || "Découvrez une collection olfactive où l'antigravité rencontre l'artisanat du luxe français.";

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden m-0 p-0 bg-[#021A12]">

            {/* Background Image with Next/Image for performance */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}
                    alt={title || "MEHRIBAN Perfume"}
                    fill
                    className="object-cover opacity-60 transition-transform duration-[10s] ease-out hover:scale-105"
                    priority
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#021A12] via-[#021A12]/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#021A12]/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-32 lg:pt-40 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="max-w-3xl mx-auto flex flex-col items-center"
                >
                    <span className="font-[family-name:var(--font-manrope)] text-royal-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 drop-shadow-md">
                        MEHRIBAN PARIS
                    </span>
                    <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-6 drop-shadow-lg">
                        {title}
                    </h1>
                    <p className="font-[family-name:var(--font-manrope)] text-sm md:text-base lg:text-lg text-gray-200 tracking-wider mb-10 max-w-xl font-light leading-relaxed drop-shadow-md">
                        {subtitle}
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-6 items-center"
                    >
                        <Link href="/shop" className="w-full sm:w-auto">
                            <Button
                                variant="default"
                                size="lg"
                                className="w-full sm:w-auto bg-royal-gold text-obsidian hover:bg-white transition-all duration-500 font-[family-name:var(--font-manrope)] tracking-widest uppercase text-xs rounded-none px-10 py-7 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                            >
                                Shop Now
                            </Button>
                        </Link>
                        <Link href="/about" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-obsidian transition-all duration-500 font-[family-name:var(--font-manrope)] tracking-widest uppercase text-xs rounded-none px-10 py-7 bg-transparent"
                            >
                                Discover
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
