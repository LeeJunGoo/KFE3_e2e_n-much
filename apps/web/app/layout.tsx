import PageContainer from '@repo/ui/components/layout/PageContainer';
import { pretendard } from './fonts';
import { home } from '../app/metadata/common/home';
import QueryProvider from './providers/QueryProvider';
import './globals.css';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`flex flex-col w-full max-w-2xl m-auto shadow-2xl relative ${pretendard.className}`}>
        <QueryProvider>
          <header className="w-full bg-blue-400 h-16 px-5">헤더테스트</header>
          <PageContainer>{children}</PageContainer>
          <nav className="fixed bottom-0 left-0 right-0 max-w-2xl bg-amber-300 m-auto h-16">네비테스트</nav>
        </QueryProvider>
      </body>
    </html>
  );
}
