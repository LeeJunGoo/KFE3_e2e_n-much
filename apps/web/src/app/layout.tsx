import QueryProvider from '../providers/QueryProvider';
import { home } from '../metadata/common/home';
import './globals.css';
import TabBar from '../components/layout/TabBar';
import Header from 'src/components/layout/Header';
import { pretendard } from 'assets/fonts';
import AppProvider from 'src/providers/AppProvider';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}`}>
        <div className="relative m-auto flex w-full max-w-2xl flex-col shadow-2xl">
          <QueryProvider>
            <Header />
            {children}
            <TabBar />
            <AppProvider />
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
