import React from 'react';
import AppProvider from 'src/app/(providers)/AppProvider';
import QueryProvider from './QueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AppProvider>{children}</AppProvider>
    </QueryProvider>
  );
};

export default Providers;
