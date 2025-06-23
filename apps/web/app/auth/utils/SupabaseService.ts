import { createClient } from '@repo/ui/utils/supabase/client/client';
import { upsertUser } from '@repo/ui/utils/supabase/query/users';

type Role = 'BUYER' | 'SELLER';
type Provider = 'google' | 'kakao';

const supabase = createClient();

export const storeUserInfo = async (role: Role) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('getUser 실패');
    return;
  }

  let roleToSave: Role = role;

  // 현재 유저가 DB에 있는지 체크
  const { data: dbUser } = await supabase.from('users').select('role').eq('user_id', user.id).single();

  // 저장된 유저의 role 값으로 덮어쓰기
  if (dbUser && dbUser.role !== role) {
    roleToSave = dbUser.role as Role;
    console.log(`기존에 ${roleToSave}로 저장된 USER입니다.`);
  }

  try {
    const userData = await upsertUser({
      user_id: user.id,
      email: user.email ?? '',
      nickname: user.user_metadata?.name ?? '',
      avatar: user.user_metadata?.avatar_url ?? null,
      created_at: user.created_at ?? new Date().toISOString(),
      updated_at: user.updated_at ?? new Date().toISOString(),
      password: '',
      point: 0,
      role: roleToSave,
      favorites: []
    });

    if (userData) {
      console.log(`${userData.nickname} 님, 사용자 정보 저장 성공`);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('알 수 없는 오류가 발생했습니다.');
    }
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
