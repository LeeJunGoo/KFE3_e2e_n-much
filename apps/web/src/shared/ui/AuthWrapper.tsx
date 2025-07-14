'use client';
import { notFound } from 'next/navigation';
import { useAuthContext } from 'src/shared/hooks/useAuthContext';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>로딩 중...</div>;
  if (!user) notFound();

  return <>{children}</>;
};

export default AuthWrapper;
