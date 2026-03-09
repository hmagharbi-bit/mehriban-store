import type { Metadata } from 'next';
import { Noto_Serif, Manrope } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import GlobalBackground from '@/components/GlobalBackground';
import SideCart from '@/components/SideCart';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Set text direction based on Arabic logic
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${notoSerif.variable} ${manrope.variable} antialiased text-foreground min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
