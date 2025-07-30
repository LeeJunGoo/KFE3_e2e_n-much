'use client';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useAuthActions, useUserState } from 'src/entities/auth/stores/useAuthStore';
import { createClient } from 'src/shared/supabase/client/client';
import type { AuthChangeEvent, User, Session } from '@supabase/supabase-js';

const AuthProvider = ({ user: initialUser, children }: { user: User | null; children: ReactNode }) => {
  const currentUser = useUserState();
  const { setUser, setLoading } = useAuthActions();
  const supabase = createClient();
  const initialAuthRef = useRef(false);

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (!initialAuthRef.current && event === 'SIGNED_IN') {
        initialAuthRef.current = true;
        return;
      }
      const sessionUser = session?.user ?? null;

      if (initialUser && (!currentUser || currentUser.id !== initialUser.id)) {
        setUser(initialUser);
        setLoading(false);
      } else if (!initialUser && !currentUser) {
        setLoading(false);
      }

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
