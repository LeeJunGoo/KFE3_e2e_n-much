'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { socialSignup, storeUserInfo } from 'lib/supabase/query/auth';
import { AuthCard } from 'components/auth/AuthCard';

type Role = 'BUYER' | 'SELLER';
type Provider = 'google' | 'kakao';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleTab1 = () => {
    localStorage.setItem('role', 'BUYER');
  };

  const handleTab2 = () => {
    localStorage.setItem('role', 'SELLER');
  };

  const handleSocialSignup = async (provider: Provider) => {
    await socialSignup(provider, 'http://localhost:3001/auth/signup');
  };

  useEffect(() => {
    if (searchParams.get('code')) {
      const savedRole = localStorage.getItem('role') as Role;
      storeUserInfo(savedRole).then(() => {
        // 회원정보 upsert가 끝나면 홈으로 이동, code 쿼리도 같이 정리!
        router.replace('/');
      });
    }
  }, [router, searchParams]);

  return <AuthCard title="회원가입" onTab1={handleTab1} onTab2={handleTab2} onSocialSignup={handleSocialSignup} />;
}
