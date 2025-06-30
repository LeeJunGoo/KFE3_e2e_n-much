'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { socialSignin, storeUserInfo } from 'src/lib/supabase/query/auth';
import { AuthCard } from 'src/components/auth/AuthCard';
import { Role, Provider } from '../../../../types/auth/index';
import { LoadingSpinner } from 'src/components/auth/LoadingSpinner';

export default function SigninPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 리디렉션됐을 때, storeUserInfo()의 중복호출을 막기 위해서 null로 초기화.
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (selectedRole: string) => {
    if (selectedRole === 'BUYER' || selectedRole === 'SELLER') {
      setRole(selectedRole);
      localStorage.setItem('role', selectedRole);
    }
  };

  const handleSocialSignin = async (provider: Provider) => {
    await socialSignin({ provider: provider, redirectTo: 'http://localhost:3001/auth/signin' });
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (!savedRole) {
      setRole('BUYER');
      return;
    }
    if (savedRole === 'BUYER' || savedRole === 'SELLER') setRole(savedRole);
  }, []);

  useEffect(() => {
    console.log('role: ', role);
  }, [role]);

  useEffect(() => {
    if (searchParams.get('code')) {
      setIsLoading(true);
      if (role) {
        storeUserInfo(role).then(() => {
          router.replace('/');
        });
      }
    }
  }, [router, searchParams, role]);

  return (
    <section>
      {!isLoading ? (
        role !== null && (
          <AuthCard title="로그인" role={role} onTabChange={handleTabChange} onSocialSignin={handleSocialSignin} />
        )
      ) : (
        <LoadingSpinner size={48} color="#8E74F9" />
      )}
    </section>
  );
}
