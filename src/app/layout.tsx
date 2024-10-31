import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/feature/layout/Header';
import { PropsWithChildren } from 'react';
import ModalProvider from '@/lib/modal/provider';
import Footer from '@/components/feature/layout/Footer';
import Gap from '../components/common/layout/Gap/index';

export const metadata: Metadata = {
  title: 'geongyu09 | Blog',
  description: '박건규의 블로그',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ko">
      <ModalProvider>
        <body>
          <Header />
          <main className="bg-white">{children}</main>
          <Gap size={10} />
          <div>
            <Footer />
          </div>
        </body>
      </ModalProvider>
    </html>
  );
}
