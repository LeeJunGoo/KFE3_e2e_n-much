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
    if (initialUser && (!currentUser || currentUser.id !== initialUser.id)) {
      setUser(initialUser);
      setLoading(false);
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      const sessionUser = session?.user ?? null;

      if (event === 'SIGNED_IN' && sessionUser) {
        setUser(sessionUser);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUser?.id, setUser, setLoading, supabase]);

  return <>{children}</>;
};

export default AuthProvider;
