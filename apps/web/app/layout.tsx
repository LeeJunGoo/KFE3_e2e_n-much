import PageContainer from '@repo/ui/components/layout/PageContainer';
import { pretendard } from './fonts';
import { home } from '../app/metadata/common/home';
import QueryProvider from './providers/QueryProvider';
import Navbar from '@repo/ui/components/navbar/navbar';

import './globals.css';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`flex flex-col w-full max-w-2xl m-auto shadow-2xl relative ${pretendard.className}`}>
        <QueryProvider>
          <header className="w-full bg-blue-400 h-16 px-5">헤더테스트</header>
          <PageContainer>{children}</PageContainer>
          <Navbar />
        </QueryProvider>
      </body>
    </html>
  );
}
