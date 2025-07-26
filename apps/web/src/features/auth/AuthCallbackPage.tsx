'use client';

import { useEffect } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useUserLoadingState, useUserState } from 'src/entities/auth/stores/useAuthStore';
import { createClient } from 'src/shared/supabase/client/client';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';

const AuthCallbackPage = () => {
  const router = useRouter();
  const user = useUserState();
  const loading = useUserLoadingState();

  useEffect(() => {
    // 로딩 중이거나, 아직 user 객체가 완전히 설정되지 않았다면 대기합니다.
    if (loading) {
      return;
    }

    const setupUserAndRedirect = async () => {
      // 로딩이 끝났는데 user가 없으면 로그인 실패입니다.
      if (!user) {
        toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
        router.push('/');
        return;
      }

      try {
        const supabase = createClient();
        if (!user.email) {
          toast.error('로그인에 필요한 이메일 정보가 없습니다.');
          router.push('/');
          return;
        }

        // 1. 사용자의 프로필이 DB에 이미 있는지 확인합니다.
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        // SELECT 쿼리 자체에서 에러가 발생했는지 확인합니다. (RLS 거부 등)
        // 'PGRST116' 코드는 행을 찾지 못했다는 의미로, 정상적인 경우이므로 제외합니다.
        if (selectError && selectError.code !== 'PGRST116') {
          throw new Error(`사용자 정보 조회 실패: ${selectError.message}`);
        }

        // 2. 프로필이 없다면 새로 생성합니다.
        if (!existingUser) {
          const { error: insertError } = await supabase.from('users').insert({
            id: user.id,
            nick_name: user.user_metadata?.name || user.email.split('@')[0],
            email: user.email,
            role: 'buyer',
            user_avatar: user.user_metadata?.avatar_url || ''
          });

          // INSERT 쿼리에서 에러가 발생했는지 확인합니다. (RLS 거부 등)
          if (insertError) {
            throw new Error(`프로필 생성 실패: ${insertError.message}`);
          }
          toast.success('회원가입을 환영합니다!');
        } else {
          toast.success('로그인 되었습니다!');
        }

        // 모든 과정이 성공하면 메인 페이지로 이동합니다.
        router.push('/main');
      } catch (error) {
        console.error('사용자 설정 오류:', error);
        // 에러 메시지를 좀 더 구체적으로 보여줄 수 있습니다.
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        toast.error(`로그인 처리 중 문제 발생: ${errorMessage}`);
        router.push('/');
      }
    };

    setupUserAndRedirect();
    // user.id가 변경될 때만 이 로직을 실행하도록 하여 불필요한 재실행을 방지합니다.
  }, [user?.id, loading, router]);

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-2">
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-lg font-semibold">Nice to VID You!</p>
      <p className="text-sm text-gray-600">로그인 정보를 처리 중입니다. 잠시만 기다려주세요...</p>
    </section>
  );
};

export default AuthCallbackPage;
