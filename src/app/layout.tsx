import type { Metadata } from 'next';
import { Noto_Serif, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import GlobalBackground from '@/components/GlobalBackground';
import SideCart from '@/components/SideCart';
import { SpeedInsights } from "@vercel/speed-insights/next";

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MEHRIBAN | Parfumerie de Luxe',
  description: 'Découvrez la collection exclusive de parfums de luxe MEHRIBAN. Une expérience olfactive unique.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${notoSerif.variable} ${manrope.variable} antialiased text-foreground min-h-screen`}
      >
        <GlobalBackground />
        <main className="relative z-10 min-h-screen flex flex-col">
          <Navbar />
          <SideCart />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
