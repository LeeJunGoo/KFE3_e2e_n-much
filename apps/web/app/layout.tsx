import QueryProvider from '../providers/QueryProvider';
import PageContainer from '../components/layout/PageContainer';
import { home } from '../metadata/common/home';
import { pretendard } from '../fonts';

import './globals.css';
import TabBar from '../components/common/TabBar';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`flex flex-col w-full max-w-2xl m-auto shadow-2xl relative ${pretendard.className}`}>
        <QueryProvider>
          {/* <header className="w-full bg-blue-400 h-16 px-5">헤더테스트</header> */}
          <PageContainer>{children}</PageContainer>
          <TabBar />
        </QueryProvider>
      </body>
    </html>
  );
}
