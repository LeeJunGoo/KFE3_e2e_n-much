'use client';
import { useEffect, useRef } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useUserLoadingState, useUserState } from 'src/entities/auth/stores/useAuthStore';
import { createClient } from 'src/shared/supabase/client/client';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';

const AuthCallbackPage = () => {
  const router = useRouter();
  const user = useUserState();
  const loading = useUserLoadingState();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (loading || hasProcessed.current) return;

      if (user) {
        try {
          const supabase = createClient();

          if (!user.email) {
            router.push('/');
            return;
          }

          const { data: existingUser } = await supabase.from('users').select('id').eq('id', user.id).single();

          if (!existingUser) {
            await supabase.from('users').insert({
              id: user.id,
              nick_name: user.user_metadata?.name || user.email.split('@')[0],
              email: user.email,
              role: 'buyer',
              user_avatar: user.user_metadata?.avatar_url || ''
            });
          }
          toast.success('로그인 되었습니다!');
          router.push('/main');
        } catch (error) {
          console.error('사용자 설정 오류:', error);
          toast.error('로그인 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
          router.push('/');
        }
      } else {
        router.push('/');
      }
    };

    handleCallback();
  }, [user, loading, router]);

  return (
    <section className="flex flex-col items-center justify-center gap-1">
      <LoadingSpinner size="lg" className="mb-4" />
      <p>Nice to VID You!</p>
    </section>
  );
};

export default AuthCallbackPage;
