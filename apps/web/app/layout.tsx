import QueryProvider from '../providers/QueryProvider';
import PageContainer from '@repo/ui/components/layout/PageContainer';
import { home } from '../metadata/common/home';
import { pretendard } from '../fonts';
import TabBar from '@repo/ui/components/common/TabBar';
import './globals.css';
import Header from '@repo/ui/components/common/Header';

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
