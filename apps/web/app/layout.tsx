import './globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import PageContainer from '@repo/ui/components/layout/PageContainer';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vidding',
  description: '경매를 통한 가치를 팔자! 경매를 통한 가치를 사자!'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`flex flex-col w-full max-w-2xl m-auto shadow-2xl relative ${geist.className}`}>
        {/* <header className="w-full bg-blue-400 h-16 px-5">헤더테스트</header> */}
        <PageContainer>{children}</PageContainer>
        {/* <nav className="fixed bottom-0 left-0 right-0 max-w-2xl bg-amber-300 m-auto h-16">네비테스트</nav> */}
      </body>
    </html>
  );
}
