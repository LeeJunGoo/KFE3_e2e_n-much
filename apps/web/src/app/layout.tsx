import { pretendard } from 'assets/fonts';
import AppProvider from 'src/providers/AppProvider';
import { home } from '../metadata/common/home';
import QueryProvider from '../providers/QueryProvider';
import './globals.css';

export const metadata = home;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className}`}>
        <div className="relative m-auto flex w-full max-w-2xl flex-col shadow-2xl">
          <QueryProvider>
            {children}
            <AppProvider />
          </QueryProvider>
        </div>
      </body>
    </html>
  );
}
