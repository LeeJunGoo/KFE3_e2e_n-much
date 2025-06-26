import QueryProvider from '../providers/QueryProvider';
import { home } from '../metadata/common/home';
import './globals.css';
import TabBar from '../components/common/TabBar';
import Header from 'src/components/layout/Header';
import { pretendard } from 'assets/fonts';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`relative m-auto flex w-full max-w-2xl flex-col shadow-2xl ${pretendard.className}`}>
        <QueryProvider>
          <Header />
          {children}
          <TabBar />
        </QueryProvider>
      </body>
    </html>
  );
}
