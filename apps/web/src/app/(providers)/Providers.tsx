import AppProvider from 'src/app/(providers)/AppProvider';

import React from 'react';
import QueryProvider from './QueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AppProvider />
      {children}
    </QueryProvider>
  );
};

export default Providers;
