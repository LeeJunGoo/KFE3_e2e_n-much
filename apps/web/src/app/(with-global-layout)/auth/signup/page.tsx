'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { getAuthInfo, socialSignin, upserAuthInfo, getExistsUser } from 'src/lib/supabase/query/auth';
import { AuthCard } from 'src/components/auth/AuthCard';
import { Role, Provider } from '../../../../types/auth/index';
import { LoadingSpinner } from 'src/components/auth/LoadingSpinner';
import { toast } from '@repo/ui/components/ui/sonner';
import { useUserStore } from 'src/store/UserStore';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUserStore();

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
    await socialSignin({ provider: provider, redirectTo: 'http://localhost:3001/auth/signup' });
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
    setIsLoading(false);
    if (!searchParams.get('code')) return;
    setIsLoading(true);
    if (!role) return;
    const storeSocialInfo = async () => {
      try {
        let currentUserInfo;

        // auth에서 유저 정보 가져오기
        const authInfo = await getAuthInfo();
        if (!authInfo) return;
        // 테이블에 저장된 유저 가져오기
        const savedUser = await getExistsUser(authInfo.id);
        // 새로운 유저라면 DB에 저장
        if (!savedUser) {
          const newUserInfo = await upserAuthInfo(role, authInfo);
          currentUserInfo = newUserInfo;
        } else {
          // 기존 유저 role이 현재 role과 다를 경우
          if (role !== savedUser.role) {
            if (!confirm(`${savedUser.role}로 저장된 사용자입니다. 로그인 하시겠습니까?`)) {
              router.replace('/auth/signup');
              return;
            }
          }
          currentUserInfo = savedUser.info;
        }
        // **  store에 저장 - 예정
        if (!currentUserInfo) return;
        console.log('currentUserInfo:', currentUserInfo);
        setUser(currentUserInfo, role);
        toast.success('소셜 로그인 성공!');
        router.replace('/main');
      } catch (error) {
        console.error(error);
        toast.error('소셜 로그인 실패!');
      }
    };

    storeSocialInfo();
  }, [searchParams, role, router]);

  return (
    <>
      {!isLoading ? (
        role !== null && (
          <AuthCard title="회원가입" role={role} onTabChange={handleTabChange} onSocialSignin={handleSocialSignin} />
        )
      ) : (
        <LoadingSpinner size={48} color="#8E74F9" />
      )}
    </>
  );
}
