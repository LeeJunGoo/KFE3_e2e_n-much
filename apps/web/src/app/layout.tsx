import QueryProvider from '../providers/QueryProvider';
import PageContainer from '../components/layout/PageContainer';
import { home } from '../metadata/common/home';

import './globals.css';
import TabBar from '../components/common/TabBar';
import Header from 'src/components/layout/Header';
import { pretendard } from 'assets/fonts';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`flex flex-col w-full max-w-2xl m-auto shadow-2xl relative ${pretendard.className}`}>
        <QueryProvider>
          <Header />
          <PageContainer>{children}</PageContainer>
          <TabBar />
        </QueryProvider>
      </body>
    </html>
  );
}
