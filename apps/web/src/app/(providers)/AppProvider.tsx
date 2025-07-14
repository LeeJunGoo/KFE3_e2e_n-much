'use client';
import { Toaster } from '@repo/ui/components/ui/sonner';
import AuthProvider from './AuthProvider';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        {children}
        <Toaster position="top-center" />
      </AuthProvider>
    </>
  );
};

export default AppProvider;
