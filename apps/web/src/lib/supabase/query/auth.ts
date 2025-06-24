import { createClient } from '../client/client';
import { upsertBuyer, upsertSeller } from 'src/lib/supabase/query/users';
import { BuyerInsert, SellerInsert } from '../type';
import { Role, Provider } from '../../../types/auth/index';

const supabase = createClient();

export const socialSignin = async (provider: Provider, redirectTo: string) => {
  // 소셜 로그인 인증 성공 시 ?code=... 쿼리파라미터를 redirectTo 주소에 붙여 리다이렉트함
  try {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('소셜 로그인 인증 실패:' + error);
    }
  }
};

export const storeUserInfo = async (role: Role) => {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('사용자 정보 가져오기 실패');
    }
    console.log(user);

    // let roleToSave: Role = role;

    // 현재 유저가 DB에 있는지 체크
    // const { data: dbUser, error: dbUserError } = await supabase
    //   .from(tableTmp)
    //   .select('*')
    //   .eq('user_id', user.id)
    //   .single();
    // if (dbUserError) {
    //   console.error('DB에서 유저의 role 조회 에러:', dbUserError.message);
    // }
    // 저장된 유저의 role 값으로 덮어쓰기
    // if (dbUser && dbUser.role !== role) {
    //   roleToSave = dbUser.role as Role;
    //   console.log(`기존에 ${roleToSave}로 저장된 USER입니다.`);
    // }

    let userData: BuyerInsert | SellerInsert | undefined;

    if (role === 'BUYER') {
      console.log('buyer signup...');
      userData = await upsertBuyer({
        avatar: user.user_metadata?.avatar_url ?? null,
        buyer_id: user.id,
        email: user.email ?? '',
        favorites: [],
        nickname: user.user_metadata?.name ?? '',
        created_at: user.created_at ?? new Date().toISOString(),
        password: '',
        point: 0,
        updated_at: user.updated_at ?? new Date().toISOString()
      });
    } else if (role === 'SELLER') {
      console.log('seller signup...');
      userData = await upsertSeller({
        avatar: user.user_metadata?.avatar_url ?? null,
        seller_id: user.id,
        email: user.email ?? '',
        favorites: [],
        nickname: user.user_metadata?.name ?? '',
        created_at: user.created_at ?? new Date().toISOString(),
        password: '',
        point: 0,
        updated_at: user.updated_at ?? new Date().toISOString()
      });
    }
    if (userData) {
      console.log(`${userData.nickname} 님, ${role}로 사용자 정보 저장 성공`);
    } else {
      throw new Error('사용자 정보 저장 실패');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error + error.message);
    } else {
      console.error('알 수 없는 오류가 발생: ', error);
    }
  }
};
