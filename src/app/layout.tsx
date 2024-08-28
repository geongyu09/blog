import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/feature/layout/Header';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'geongyu09 | Blog',
  description: '박건규의 블로그',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
