import { createClient } from '@repo/ui/utils/supabase/client/client';
import { upsertUser } from '@repo/ui/utils/supabase/query/users';
import { handleSupabaseError } from './SupabaseError';

type Role = 'BUYER' | 'SELLER';
type Provider = 'google' | 'kakao';

const supabase = createClient();

export const storeUserInfo = async (role: Role) => {
  // supabase.auth.getUser()
  // ==> 현재 로그인 세션(localStorage)에 남아 있는 토큰을 기준으로, 로그인된 유저 정보를 가져옴
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    console.log(user);
    try {
      const userData = await upsertUser({
        user_id: user.id,
        email: user.email ?? '',
        nickname: user.user_metadata?.name ?? '',
        avatar: user.user_metadata?.avatar_url ?? null,
        created_at: user.created_at ?? new Date().toISOString(),
        updated_at: user.updated_at ?? new Date().toISOString(),
        password: '', // 소셜가입이므로 빈값 허용 (아예 안 쓰려면 null 가능하게 테이블 구조 변경 필요)
        point: 0,
        role: role,
        favorites: []
      });
      if (userData) {
        console.log(userData.nickname, '님, 사용자 정보 저장 성공');
      }
    } catch (error: unknown) {
      handleSupabaseError(error);
      console.log('사용자 정보 저장 실패: ' + error);
    }
  } else {
    console.log('getUser 실패');
  }
};

export const socialSignup = async (provider: Provider, redirectTo: string) => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo
    }
  });
};
