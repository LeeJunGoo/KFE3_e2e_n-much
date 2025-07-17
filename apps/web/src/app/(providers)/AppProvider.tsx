import { Toaster } from '@repo/ui/components/ui/sonner';
import AuthProvider from 'src/app/(providers)/AuthProvider';
import { getServerUser } from 'src/entities/auth/supabase';

const AppProvider = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser();
  return (
    <>
      <AuthProvider user={user}>
        {children}
        <Toaster position="top-center" />
      </AuthProvider>
    </>
  );
};

export default AppProvider;
