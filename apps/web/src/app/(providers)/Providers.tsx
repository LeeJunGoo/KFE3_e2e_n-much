import React from 'react';
import AppProvider from 'src/app/(providers)/AppProvider';
import AuthProvider from 'src/app/(providers)/AuthProvider';
import QueryProvider from 'src/app/(providers)/QueryProvider';
import { getServerUser } from 'src/entities/auth/serverAction';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser();
  return (
    <QueryProvider>
      <AuthProvider user={user}>
        <AppProvider>{children}</AppProvider>
      </AuthProvider>
    </QueryProvider>
  );
};

export default Providers;
