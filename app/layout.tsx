import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.scss';
import Background from '@/components/layouts/background';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "gusutaharu's Portfolio",
  description: 'webエンジニアを目指しているgusutaharuのポートフォリオサイト',
  openGraph: {
    title: "gusutaharu's Portfolio",
    description: 'webエンジニアを目指しているgusutaharuのポートフォリオサイト',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <div className="white-overlay"></div>
        <Background />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
