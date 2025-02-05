import Footer from '@/components/feature/layout/Footer';
import Header from '@/components/feature/layout/Header';
import ModalProvider from '@/lib/modal/provider';
import Analytics from '@/service/Analytics';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import Gap from '../components/common/layout/Gap/index';
import './globals.css';

export const metadata: Metadata = {
  title: '건규의 블로그 | Blog',
  description: '박건규의 블로그',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ko">
      <head>
        <Analytics />
      </head>
      <ModalProvider>
        <body>
          <Header />
          <main className="bg-white min-h-fit-to-screen">{children}</main>
          <Gap size={10} />
          <div>
            <Footer />
          </div>
        </body>
      </ModalProvider>
    </html>
  );
}
