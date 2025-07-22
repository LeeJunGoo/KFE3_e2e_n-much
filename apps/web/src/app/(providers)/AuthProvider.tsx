'use client';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuthActions, useUserState } from 'src/entities/auth/stores/useAuthStore';
import { createClient } from 'src/shared/supabase/client/client';
import type { User } from '@supabase/supabase-js';

const AuthProvider = ({ user: initialUser, children }: { user: User | null; children: ReactNode }) => {
  const currentUser = useUserState();
  const { setUser, setLoading } = useAuthActions();
  const supabase = createClient();

  useEffect(() => {
    //ANCHOR - 초기 렌더링
    if (initialUser && currentUser?.id !== initialUser.id) {
      setUser(initialUser);
      setLoading(false);
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      const sessionUser = session?.user ?? null;

      //ANCHOR - 현재 상태와 다를 때만 setUser 호출
      if ((sessionUser && currentUser?.id !== sessionUser.id) || (!sessionUser && currentUser !== null)) {
        setUser(sessionUser);
      }
    });

    return () => subscription.unsubscribe();
  }, [currentUser, supabase, initialUser, setUser, setLoading]);

  return <>{children}</>;
};

export default AuthProvider;
