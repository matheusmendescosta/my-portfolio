import Footer from '@/components/ui/Footer';
import { Navbar } from '@/components/ui/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  icons: {
    icon: '/images/profile.png',
  },
  title: 'Portfolio of Matheus Mendes',
  description: 'Portfolio of Matheus Mendes, a software developer based in Brazil.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={twJoin(
          `${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center bg-black text-white antialiased`
        )}
      >
        <div className="mx-4 mt-8 max-w-md">
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </div>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'default-ga-id'} />
      </body>
    </html>
  );
}
