export default function MentionsLegalesPage() {
    return (
        <div className="container mx-auto px-6 py-32 min-h-screen relative z-10">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="font-[family-name:var(--font-noto-serif)] text-3xl md:text-5xl text-white font-light tracking-[0.1em] mb-6">
                        MENTIONS LÉGALES
                    </h1>
                    <div className="w-24 h-[1px] bg-royal-gold/50 mx-auto"></div>
                </div>

                {/* Content */}
                <div className="space-y-12 text-gray-300 font-[family-name:var(--font-manrope)] font-light leading-relaxed text-sm md:text-base">

                    <section>
                        <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl text-royal-gold tracking-widest mb-4">1. ÉDITEUR DU SITE</h2>
                        <p>
                            Le site web <strong>MEHRIBAN</strong> est édité par la société MEHRIBAN Parfumerie, Société par Actions Simplifiée (SAS) au capital de 100 000 euros.
                        </p>
                        <p className="mt-2">
                            <strong>Siège social :</strong> 42 Avenue Montaigne, 75008 Paris, France.<br />
                            <strong>Immatriculation :</strong> RCS Paris B 123 456 789<br />
                            <strong>Numéro de TVA intracommunautaire :</strong> FR 12 34567890<br />
                            <strong>Directeur de la publication :</strong> M. H. Mehriban
                        </p>
                    </section>

                    <section>
                        <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl text-royal-gold tracking-widest mb-4">2. HÉBERGEMENT</h2>
                        <p>
                            Ce site est hébergé par la société Vercel Inc.<br />
                            <strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA.<br />
                            <strong>Site web :</strong> <a href="https://vercel.com" className="text-royal-gold hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl text-royal-gold tracking-widest mb-4">3. PROPRIÉTÉ INTELLECTUELLE</h2>
                        <p>
                            L'ensemble des éléments constituant le site MEHRIBAN (textes, photographies, illustrations, vidéos, charte graphique, logotypes, marques, etc.) est la propriété exclusive de la société MEHRIBAN Parfumerie ou de ses partenaires.
                        </p>
                        <p className="mt-2">
                            Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle, du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, sans l'accord préalable, écrit et explicite de MEHRIBAN Parfumerie est strictement interdite et constituerait une contrefaçon sanctionnée par le Code de la Propriété Intellectuelle.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl text-royal-gold tracking-widest mb-4">4. DONNÉES PERSONNELLES</h2>
                        <p>
                            La Maison MEHRIBAN s'engage à préserver la confidentialité des informations fournies par les utilisateurs en ligne. Conformément à la réglementation applicable en matière de protection des données (RGPD), vous disposez d'un droit d'accès, de rectification, d'opposition, de limitation, et d'effacement de vos données personnelles.
                        </p>
                        <p className="mt-2">
                            Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:privacy@mehriban.fr" className="text-royal-gold hover:underline">privacy@mehriban.fr</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-[family-name:var(--font-noto-serif)] text-2xl text-royal-gold tracking-widest mb-4">5. COOKIES</h2>
                        <p>
                            Le site MEHRIBAN utilise des cookies pour améliorer votre expérience de navigation, réaliser des statistiques d'audience et vous proposer des services et offres adaptés à vos centres d'intérêt. En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
