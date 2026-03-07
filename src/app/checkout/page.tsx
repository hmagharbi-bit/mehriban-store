'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { submitOrderAction } from './actions';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

export default function CheckoutPage() {
    const [status, setStatus] = useState<'idle' | 'success'>('idle');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { items, getCartTotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const total = mounted ? getCartTotal() : 0;

    const parseImageUrl = (image: any) => {
        if (!image) return "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400";
        if (typeof image === 'object') return urlForImage(image).url();
        return image;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);

            const addressStr = formData.get('address') as string;
            const phoneStr = formData.get('telephone') as string;

            const orderData = {
                _type: 'order',
                customerName: formData.get('nom'),
                wilaya: formData.get('wilaya'),
                address: addressStr,
                phoneNumber: phoneStr,
                totalPrice: total,
                orderDate: new Date().toISOString(),
                items: items.map((item, index) => ({
                    _type: 'reference',
                    _ref: item.id,
                    _key: 'item_' + Date.now() + '_' + index
                }))
            };

            // Using server action to ensure SANITY_API_TOKEN works securely 
            // the logic underneath runs: await client.create({ _type: 'order', ... })
            const response = await submitOrderAction(orderData);

            if (response.success) {
                // Success state handled directly on page without WhatsApp redirect
                clearCart();
                setStatus('success');
            } else {
                console.error("Checkout Submission Failed:", response.message);
                alert(`${response.message}\n\nVeuillez vérifier votre fichier .env.local.`);
            }
        } catch (error) {
            console.error("Error submitting checkout form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'success') {
        return (
            <div className="container mx-auto px-6 py-32 min-h-screen flex flex-col items-center justify-center text-center bg-[#022c22]">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 mb-8 rounded-full border-2 border-royal-gold flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                    <span className="text-4xl text-royal-gold">✓</span>
                </motion.div>
                <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl text-royal-gold font-light tracking-[0.2em] mb-4">
                    COMMANDE CONFIRMÉE
                </h1>
                <div className="flex flex-col gap-4 mb-12">
                    <p className="text-white text-xl md:text-2xl font-[family-name:var(--font-noto-serif)] tracking-wide">
                        Merci pour votre confiance. Votre commande est enregistrée.
                    </p>
                    <p className="text-royal-gold text-lg md:text-xl font-[family-name:var(--font-noto-serif)] tracking-wide direction-rtl text-center">
                        شكراً لثقتكم. تم تسجيل طلبيتكم وسنتصل بكم قريباً للتأكيد.
                    </p>
                    <p className="text-gray-400 tracking-widest mt-2">
                        Nous vous appellerons bientôt pour la confirmation.
                    </p>
                </div>
                <div
                    onClick={() => window.location.href = '/'}
                    className="px-10 py-4 border border-royal-gold text-royal-gold tracking-[0.15em] hover:bg-royal-gold hover:text-[#022c22] transition-colors cursor-pointer"
                >
                    RETOUR À L'ACCUEIL
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#022c22] relative overflow-hidden flex flex-col items-center justify-center py-20 px-6">

            {/* Flowing Lines Background */}
            <div className="absolute inset-0 digital-stitching opacity-20 pointer-events-none mix-blend-overlay"></div>

            {/* Emerald/Gold Glow Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#047857]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg">

                {/* Product Summary Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-10 w-full"
                >
                    <h1 className="font-[family-name:var(--font-noto-serif)] text-4xl text-royal-gold font-light tracking-[0.2em] mb-4">
                        FINALISATION
                    </h1>

                    <div className="glassmorphism p-6 rounded-xl border border-royal-gold/30 bg-[#064e3b]/40 backdrop-blur-md text-left flex flex-col gap-4">
                        <h2 className="text-xl font-[family-name:var(--font-noto-serif)] text-white tracking-widest border-b border-white/10 pb-2">
                            RÉSUMÉ DE LA COMMANDE
                        </h2>

                        {mounted && items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
                                <div className="relative w-12 h-16 rounded overflow-hidden flex-shrink-0">
                                    <Image src={parseImageUrl(item.image)} alt={item.nom} fill className="object-cover opacity-100" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-[family-name:var(--font-noto-serif)] font-bold text-white drop-shadow-md text-sm">{item.nom}</h3>
                                    <p className="text-xs text-gray-300 font-[family-name:var(--font-manrope)]">Qté: {item.quantity}</p>
                                </div>
                                <div className="text-royal-gold font-medium text-sm">
                                    {(item.prix * item.quantity).toLocaleString()} DZD
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/20">
                            <span className="text-gray-200 font-[family-name:var(--font-manrope)] tracking-widest uppercase text-sm">TOTAL</span>
                            <span className="text-royal-gold font-bold text-xl">{total.toLocaleString()} DZD</span>
                        </div>
                    </div>
                </motion.div>

                {/* Checkout Form */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glassmorphism p-8 md:p-10 rounded-2xl border border-royal-gold/20 bg-[#064e3b]/20 backdrop-blur-md relative overflow-hidden"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        {/* Name Input */}
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="nom" className="text-xs tracking-widest text-emerald-200 uppercase">Nom Complet</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                required
                                className="w-full bg-transparent border-b border-emerald-500/30 px-0 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors font-[family-name:var(--font-manrope)] placeholder:text-emerald-500/50"
                                placeholder="Votre nom"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="telephone" className="text-xs tracking-widest text-emerald-200 uppercase">Numéro de Téléphone</label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                required
                                className="w-full bg-transparent border-b border-emerald-500/30 px-0 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors font-[family-name:var(--font-manrope)] placeholder:text-emerald-500/50"
                                placeholder="06 00 00 00 00"
                            />
                        </div>

                        {/* Address Input */}
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="address" className="text-xs tracking-widest text-emerald-200 uppercase">Adresse de Livraison</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                className="w-full bg-transparent border-b border-emerald-500/30 px-0 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors font-[family-name:var(--font-manrope)] placeholder:text-emerald-500/50"
                                placeholder="Votre adresse exacte"
                            />
                        </div>

                        {/* Wilaya Dropdown */}
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="wilaya" className="text-xs tracking-widest text-emerald-200 uppercase">Wilaya</label>
                            <div className="relative">
                                <select
                                    id="wilaya"
                                    name="wilaya"
                                    required
                                    className="w-full bg-transparent border-b border-emerald-500/30 px-0 py-3 text-white appearance-none focus:outline-none focus:border-royal-gold transition-colors font-[family-name:var(--font-manrope)]"
                                >
                                    <option value="" disabled selected className="text-gray-500 bg-[#022c22]">Sélectionnez votre Wilaya</option>
                                    <option value="Adrar" className="bg-[#022c22]">01 - Adrar</option>
                                    <option value="Chlef" className="bg-[#022c22]">02 - Chlef</option>
                                    <option value="Laghouat" className="bg-[#022c22]">03 - Laghouat</option>
                                    <option value="Oum El Bouaghi" className="bg-[#022c22]">04 - Oum El Bouaghi</option>
                                    <option value="Batna" className="bg-[#022c22]">05 - Batna</option>
                                    <option value="Béjaïa" className="bg-[#022c22]">06 - Béjaïa</option>
                                    <option value="Biskra" className="bg-[#022c22]">07 - Biskra</option>
                                    <option value="Béchar" className="bg-[#022c22]">08 - Béchar</option>
                                    <option value="Blida" className="bg-[#022c22]">09 - Blida</option>
                                    <option value="Bouira" className="bg-[#022c22]">10 - Bouira</option>
                                    <option value="Tamanrasset" className="bg-[#022c22]">11 - Tamanrasset</option>
                                    <option value="Tébessa" className="bg-[#022c22]">12 - Tébessa</option>
                                    <option value="Tlemcen" className="bg-[#022c22]">13 - Tlemcen</option>
                                    <option value="Tiaret" className="bg-[#022c22]">14 - Tiaret</option>
                                    <option value="Tizi Ouzou" className="bg-[#022c22]">15 - Tizi Ouzou</option>
                                    <option value="Alger" className="bg-[#022c22]">16 - Alger</option>
                                    <option value="Djelfa" className="bg-[#022c22]">17 - Djelfa</option>
                                    <option value="Jijel" className="bg-[#022c22]">18 - Jijel</option>
                                    <option value="Sétif" className="bg-[#022c22]">19 - Sétif</option>
                                    <option value="Saïda" className="bg-[#022c22]">20 - Saïda</option>
                                    <option value="Skikda" className="bg-[#022c22]">21 - Skikda</option>
                                    <option value="Sidi Bel Abbès" className="bg-[#022c22]">22 - Sidi Bel Abbès</option>
                                    <option value="Annaba" className="bg-[#022c22]">23 - Annaba</option>
                                    <option value="Guelma" className="bg-[#022c22]">24 - Guelma</option>
                                    <option value="Constantine" className="bg-[#022c22]">25 - Constantine</option>
                                    <option value="Médéa" className="bg-[#022c22]">26 - Médéa</option>
                                    <option value="Mostaganem" className="bg-[#022c22]">27 - Mostaganem</option>
                                    <option value="M'Sila" className="bg-[#022c22]">28 - M'Sila</option>
                                    <option value="Mascara" className="bg-[#022c22]">29 - Mascara</option>
                                    <option value="Ouargla" className="bg-[#022c22]">30 - Ouargla</option>
                                    <option value="Oran" className="bg-[#022c22]">31 - Oran</option>
                                    <option value="El Bayadh" className="bg-[#022c22]">32 - El Bayadh</option>
                                    <option value="Illizi" className="bg-[#022c22]">33 - Illizi</option>
                                    <option value="Bordj Bou Arreridj" className="bg-[#022c22]">34 - Bordj Bou Arreridj</option>
                                    <option value="Boumerdès" className="bg-[#022c22]">35 - Boumerdès</option>
                                    <option value="El Tarf" className="bg-[#022c22]">36 - El Tarf</option>
                                    <option value="Tindouf" className="bg-[#022c22]">37 - Tindouf</option>
                                    <option value="Tissemsilt" className="bg-[#022c22]">38 - Tissemsilt</option>
                                    <option value="El Oued" className="bg-[#022c22]">39 - El Oued</option>
                                    <option value="Khenchela" className="bg-[#022c22]">40 - Khenchela</option>
                                    <option value="Souk Ahras" className="bg-[#022c22]">41 - Souk Ahras</option>
                                    <option value="Tipaza" className="bg-[#022c22]">42 - Tipaza</option>
                                    <option value="Mila" className="bg-[#022c22]">43 - Mila</option>
                                    <option value="Aïn Defla" className="bg-[#022c22]">44 - Aïn Defla</option>
                                    <option value="Naâma" className="bg-[#022c22]">45 - Naâma</option>
                                    <option value="Aïn Témouchent" className="bg-[#022c22]">46 - Aïn Témouchent</option>
                                    <option value="Ghardaïa" className="bg-[#022c22]">47 - Ghardaïa</option>
                                    <option value="Relizane" className="bg-[#022c22]">48 - Relizane</option>
                                    <option value="Timimoun" className="bg-[#022c22]">49 - Timimoun</option>
                                    <option value="Bordj Badji Mokhtar" className="bg-[#022c22]">50 - Bordj Badji Mokhtar</option>
                                    <option value="Ouled Djellal" className="bg-[#022c22]">51 - Ouled Djellal</option>
                                    <option value="Béni Abbès" className="bg-[#022c22]">52 - Béni Abbès</option>
                                    <option value="In Salah" className="bg-[#022c22]">53 - In Salah</option>
                                    <option value="In Guezzam" className="bg-[#022c22]">54 - In Guezzam</option>
                                    <option value="Touggourt" className="bg-[#022c22]">55 - Touggourt</option>
                                    <option value="Djanet" className="bg-[#022c22]">56 - Djanet</option>
                                    <option value="El M'Ghair" className="bg-[#022c22]">57 - El M'Ghair</option>
                                    <option value="El Meniaa" className="bg-[#022c22]">58 - El Meniaa</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-royal-gold">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Submit CTA */}
                        <div className="mt-4 pt-6 border-t border-emerald-500/20">
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                                className={`w-full py-5 text-[#022c22] font-[family-name:var(--font-manrope)] text-lg font-medium tracking-[0.2em] shadow-[0_0_20px_rgba(197,160,89,0.3)] transition-all duration-300 ${isSubmitting ? 'bg-royal-gold/50 cursor-not-allowed' : 'bg-royal-gold hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]'}`}
                            >
                                {isSubmitting ? 'TRAITEMENT...' : 'CONFIRMER LA COMMANDE'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
