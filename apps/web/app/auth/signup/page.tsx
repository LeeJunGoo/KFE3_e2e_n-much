'use client';
import { useEffect, useState } from 'react';
import { AuthCard } from '../../../../../packages/ui/dist/components/auth/AuthCard';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { storeUserInfo, socialSignup } from '../utils/SupabaseService';

type Role = 'BUYER' | 'SELLER';
type Provider = 'google' | 'kakao';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [role, setRole] = useState<Role>('BUYER');

  const handleSocialSignup = async (provider: Provider) => {
    await socialSignup(provider, 'http://localhost:3001/auth/signup');
  };

  useEffect(() => {
    console.log('role: ', role);
  }, [role]);

  useEffect(() => {
    if (searchParams.get('code')) {
      storeUserInfo(role).then(() => {
        // 회원정보 upsert가 끝나면 홈으로 이동, code 쿼리도 같이 정리!
        router.replace('/');
      });
    }
  }, [router, searchParams, role]);

  return <AuthCard title="회원가입" setRole={setRole} handleSocialSignup={handleSocialSignup} />;
}
