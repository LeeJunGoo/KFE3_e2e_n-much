'use client';
import { useEffect, useRef } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useAuthActions } from 'src/entities/auth/stores/useAuthStore';
import { upsertUser } from 'src/entities/auth/supabase';
import { createClient } from 'src/shared/supabase/client/client';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';

const AuthCallbackPage = () => {
  const router = useRouter();
  const { setUser, setLoading } = useAuthActions();
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasProcessed.current) return;
      hasProcessed.current = true;
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth 에러:', error);
          router.replace('/');
          return;
        }

        const user = data.session?.user;

        if (!user?.email) {
          router.replace('/');
          return;
        }

        const completeUser = await upsertUser(user);

        setUser(completeUser);
        setLoading(false);

        toast.success('로그인 되었습니다!');
        router.replace('/main');
      } catch (error) {
        console.error('콜백 처리 에러:', error);
        setLoading(false);
        router.replace('/');
      }
    };

    handleCallback();
  }, [router, setUser, setLoading]);

  return (
    <section className="flex flex-col items-center justify-center gap-1">
      <LoadingSpinner size="lg" className="mb-4" />
      <p>Nice to VID You!</p>
    </section>
  );
};

export default AuthCallbackPage;
