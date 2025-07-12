'use client';
import { useEffect, useState } from 'react';
import { createClient } from 'src/shared/supabase/client/client';
import { User } from '@supabase/supabase-js';

const supabase = createClient();

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('사용자 정보 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();

    // 인증 상태 변화 감지
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
