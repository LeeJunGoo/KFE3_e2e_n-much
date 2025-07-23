import { createClient } from 'src/shared/supabase/client/client';
import type { Provider } from '@supabase/supabase-js';
import type { RoleType } from 'src/entities/user/mypage/main/types';

const supabase = createClient();

export const selectSignUp = async (provider: Provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) return error;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(`회원가입에 실패했습니다 : ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다');
  }
};

export const selectUser = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

  if (error) {
    console.error('🚀 ~ selectUsers ~ error:', error);
    throw new Error('DB: 사용자 프로필 조회 에러');
  }
  return data;
};

export const updateUserRole = async (userId: string, newRole: RoleType) => {
  const { data, error } = await supabase.from('users').update({ role: newRole }).eq('id', userId).single();

  if (error) {
    console.error('🚀 ~ updateUserRole ~ error:', error);
    throw new Error(`DB: 역할 변경에 실패했습니다: ${error.message}`);
  }

  return data;
};
