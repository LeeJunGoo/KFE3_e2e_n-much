import { createClient } from 'src/shared/supabase/client/client';
import { createServer } from 'src/shared/supabase/client/server';
import type { Provider } from '@supabase/supabase-js';

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

//ANCHOR - 로그인된 유저 정보
export const selectAuthInfo = async () => {
  const supabase = await createServer();

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error();
  }
  return user;
};
