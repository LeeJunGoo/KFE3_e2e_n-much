'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { socialSignin, storeUserInfo } from 'src/lib/supabase/query/auth';
import { AuthCard } from 'src/components/auth/AuthCard';
import { Role, Provider } from '../../../types/auth/index';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [role, setRole] = useState<Role | null>(null);

  const handleTabChange = (selected: string) => {
    if (selected === 'BUYER' || selected === 'SELLER') {
      setRole(selected);
      localStorage.setItem('role', selected);
    }
  };

  const handleSocialSignin = async (provider: Provider) => {
    await socialSignin(provider, 'http://localhost:3001/auth/signup');
  };

  useEffect(() => {
    const saved = localStorage.getItem('role');
    if (saved === 'BUYER' || saved === 'SELLER') setRole(saved);
  }, []);

  useEffect(() => {
    console.log('role: ', role);
  }, [role]);

  useEffect(() => {
    if (role && searchParams.get('code')) {
      storeUserInfo(role).then(() => {
        router.replace('/');
        console.log('**storeUserInfo!');
      });
    }
  }, [router, searchParams, role]);

  return (
    <main>
      {role !== null && (
        <AuthCard title="회원가입" role={role} onTabChange={handleTabChange} onSocialSignin={handleSocialSignin} />
      )}
    </main>
  );
}
