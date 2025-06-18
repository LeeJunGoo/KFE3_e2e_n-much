import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import PageContainer from '@repo/ui/components/layout/PageContainer';
import Navbar from '@repo/ui/components/navbar/Navbar';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vidding',
  description: '경매를 통한 가치를 팔자! 경매를 통한 가치를 사자!'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`flex flex-col w-full max-w-2xl m-auto shadow-2xl relative ${geist.className}`}>
        <header className="w-full bg-blue-400 h-16 px-5">헤더테스트</header>
        <PageContainer>{children}</PageContainer>
        <Navbar />
      </body>
    </html>
  );
}
