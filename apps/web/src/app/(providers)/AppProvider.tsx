'use client';

import { Toaster } from '@repo/ui/components/ui/sonner';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
};

export default AppProvider;
