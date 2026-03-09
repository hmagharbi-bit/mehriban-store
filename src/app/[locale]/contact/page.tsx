"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-6 py-32 min-h-screen relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl md:text-5xl text-white font-light tracking-[0.2em] mb-6">
                        NOUS CONTACTER
                    </h1>
                    <div className="w-24 h-[1px] bg-royal-gold/50 mx-auto mb-8"></div>
                    <p className="font-[family-name:var(--font-manrope)] text-gray-300 font-light tracking-wide max-w-xl mx-auto">
                        Pour toute demande d'information, conseil olfactif ou assistance concernant votre commande, la Maison MEHRIBAN est à votre entière disposition.
                    </p>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-16">
                    {/* Contact Info (Left) */}
                    <div className="w-full md:w-1/3 flex flex-col gap-10">
                        <div className="flex flex-col items-center text-center or md:items-start md:text-left">
                            <div className="w-12 h-12 rounded-full border border-royal-gold/30 flex items-center justify-center mb-4 text-royal-gold">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="font-[family-name:var(--font-noto-serif)] text-white tracking-widest mb-2">EMAIL</h3>
                            <p className="font-[family-name:var(--font-manrope)] text-sm text-gray-400 font-light">contact@mehriban.fr</p>
                        </div>

                        <div className="flex flex-col items-center text-center or md:items-start md:text-left">
                            <div className="w-12 h-12 rounded-full border border-royal-gold/30 flex items-center justify-center mb-4 text-royal-gold">
                                <Phone className="w-5 h-5" />
                            </div>
                            <h3 className="font-[family-name:var(--font-noto-serif)] text-white tracking-widest mb-2">TÉLÉPHONE</h3>
                            <p className="font-[family-name:var(--font-manrope)] text-sm text-gray-400 font-light">+33 1 23 45 67 89</p>
                            <span className="font-[family-name:var(--font-manrope)] text-xs text-gray-500 mt-1">Du Lundi au Samedi, 10h-19h</span>
                        </div>

                        <div className="flex flex-col items-center text-center or md:items-start md:text-left">
                            <div className="w-12 h-12 rounded-full border border-royal-gold/30 flex items-center justify-center mb-4 text-royal-gold">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h3 className="font-[family-name:var(--font-noto-serif)] text-white tracking-widest mb-2">BOUTIQUE</h3>
                            <p className="font-[family-name:var(--font-manrope)] text-sm text-gray-400 font-light leading-relaxed">
                                42 Avenue Montaigne<br />75008 Paris, France
                            </p>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="w-full md:w-2/3">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="prenom" className="font-[family-name:var(--font-manrope)] text-xs text-royal-gold tracking-[0.2em] uppercase">Prénom</label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors font-light text-sm"
                                        placeholder="Votre prénom"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nom" className="font-[family-name:var(--font-manrope)] text-xs text-royal-gold tracking-[0.2em] uppercase">Nom</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors font-light text-sm"
                                        placeholder="Votre nom"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-[family-name:var(--font-manrope)] text-xs text-royal-gold tracking-[0.2em] uppercase">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors font-light text-sm"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="font-[family-name:var(--font-manrope)] text-xs text-royal-gold tracking-[0.2em] uppercase">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full bg-transparent border border-white/20 p-4 text-white focus:outline-none focus:border-royal-gold transition-colors font-light text-sm resize-none mt-2"
                                    placeholder="En quoi pouvons-nous vous aider ?"
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02, backgroundColor: "#ffffff", borderColor: "#ffffff" }}
                                whileTap={{ scale: 0.98, opacity: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 px-10 py-4 bg-royal-gold text-obsidian border border-royal-gold font-[family-name:var(--font-manrope)] text-sm tracking-[0.2em] font-medium transition-shadow duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] w-full md:w-auto self-end"
                            >
                                ENVOYER LE MESSAGE
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
