'use client';
import { createClient } from 'src/shared/supabase/client/client';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@repo/ui/components/ui/sonner';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';
import useAuth from 'src/shared/hooks/useAuth';

const AuthCallbackPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (loading || hasProcessed.current) return;

      if (user) {
        hasProcessed.current = true;

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
              role: 'buyer'
            });
          }
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
    <div>
      <LoadingSpinner size="lg" className="mb-4" />
      <p>로그인 처리 중입니다.</p>
    </div>
  );
};

export default AuthCallbackPage;
