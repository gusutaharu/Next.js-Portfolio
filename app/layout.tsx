import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Noto_Sans_JP } from 'next/font/google';
import './globals.scss';
import Background from '@/components/layouts/background';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer/footer';

const inter = Inter({
  subsets: ['latin'],
  fallback: ['-apple-system', 'sans-serif'],
  variable: '--font-inter',
});

const sub = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sub',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
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
      className={`${inter.variable} ${sub.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body>
        <div className="white-overlay"></div>
        <Background />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
