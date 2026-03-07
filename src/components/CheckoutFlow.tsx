"use client";

import { motion } from "framer-motion";
import { mockParfums } from "@/lib/data";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export default function CheckoutFlow() {
    const cartItem = mockParfums[0]; // mock selection

    return (
        <section className="relative w-full py-24 px-6 md:px-20 min-h-[80vh] bg-obsidian-gradient flex flex-col items-center justify-center border-t border-white/5">

            <div className="text-center mb-16">
                <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl md:text-4xl text-white font-light tracking-wider mb-2">
                    VOTRE SÉLECTION
                </h2>
            </div>

            <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-12 z-10">

                {/* Golden Thread connection behind elements */}
                <div className="hidden md:block absolute top-[50%] left-[20%] w-[60%] h-[2px] z-0 pointer-events-none">
                    <svg className="w-full h-[150px] overflow-visible">
                        <motion.path
                            d="M 0,0 C 150,-50 250,150 400,0 T 800,0"
                            fill="transparent"
                            stroke="#d4af37"
                            strokeWidth="1"
                            className="drop-shadow-[0_0_8px_rgba(212,175,55,1)]"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                {/* Cart Item */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full glassmorphism flex items-center justify-center p-2 mb-4 border border-white/10 shadow-[0_0_30px_rgba(4,120,87,0.2)]">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                            <Image src={cartItem.image && typeof cartItem.image === 'object' ? urlForImage(cartItem.image).url() : cartItem.image || "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200"} alt="Cart item" fill className="object-cover opacity-80" />
                        </div>
                    </div>
                    <p className="font-[family-name:var(--font-manrope)] text-royal-gold text-xs tracking-widest uppercase mb-1">{cartItem.maison}</p>
                    <p className="font-[family-name:var(--font-noto-serif)] text-white text-lg font-light tracking-wide">{cartItem.nom}</p>
                    <p className="font-[family-name:var(--font-manrope)] text-gray-400 text-sm font-light">{cartItem.prix} €</p>
                </motion.div>

                {/* Checkout Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative z-10 w-full max-w-sm glassmorphism rounded-xl p-8 border border-white/10 flex flex-col gap-6"
                >
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                        <span className="font-[family-name:var(--font-manrope)] text-gray-400 font-light text-sm tracking-wider">TOTAL</span>
                        <span className="font-[family-name:var(--font-noto-serif)] text-2xl text-white font-light">{cartItem.prix} €</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="font-[family-name:var(--font-manrope)] text-white font-light text-xs tracking-widest uppercase opacity-70">Paiement Crypté</span>
                        <div className="flex gap-2">
                            {/* Mock Card Icons */}
                            <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-[0.6rem] text-gray-400 font-light">CB</div>
                            <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-[0.6rem] text-gray-400 font-light">VISA</div>
                            <div className="h-8 w-12 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-[0.6rem] text-gray-400 font-light">AMEX</div>
                        </div>
                    </div>

                    <button className="w-full py-4 mt-2 bg-royal-gold text-obsidian font-[family-name:var(--font-manrope)] text-sm font-medium tracking-[0.2em] hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                        PASSER LA COMMANDE
                    </button>
                </motion.div>
            </div>

        </section>
    );
}
