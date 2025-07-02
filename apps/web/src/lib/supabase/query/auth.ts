import { createClient } from '../client/client';
import { upsertBuyer, upsertSeller, getBuyerById, getSellerById } from 'src/lib/supabase/query/users';
import { BuyerUpdate, SellerUpdate } from '../type';
import { Role, Provider } from '../../../types/auth/index';
import type { User } from '@supabase/supabase-js';

const supabase = createClient();

export const socialSignin = async (props: { provider: Provider; redirectTo: string }) => {
  const { provider, redirectTo } = props;
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

export const getExistsUser = async (id: string) => {
  try {
    const userId = id;
    // BUYER 테이블 존재 여부 검사
    const buyerData = await getBuyerById(userId);
    // SELLER 테이블 존재 여부 검사
    const sellerData = await getSellerById(userId);

    if (buyerData) {
      return { info: buyerData, role: 'BUYER' as Role };
    } else if (sellerData) {
      return { info: sellerData, role: 'SELLER' as Role };
    } else {
      return undefined;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('DB: id와 일치하는 사용자 정보를 가져오지 못했습니다.');
    }
  }
};

export const upserAuthInfo = async (role: Role, authInfo: User) => {
  console.log('authInfo:', authInfo);
  try {
    const commonFields = {
      avatar: authInfo.user_metadata?.avatar_url ?? null,
      created_at: authInfo.created_at ?? new Date().toISOString(),
      email: authInfo.email ?? '',
      favorites: [],
      nickname: null,
      password: '',
      point: 0,
      social_name: authInfo.user_metadata?.name ?? '',
      updated_at: authInfo.updated_at ?? new Date().toISOString()
    };

    let newUserData: BuyerUpdate | SellerUpdate | undefined;
    if (role === 'BUYER') {
      newUserData = await upsertBuyer({
        ...commonFields,
        buyer_id: authInfo.id
      });
    } else if (role === 'SELLER') {
      newUserData = await upsertSeller({
        ...commonFields,
        seller_id: authInfo.id
      });
    }

    return newUserData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

//NOTE - 로그인된 유저 정보 불러오기
export const getAuthInfo = async () => {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.error('🚀 ~ getAuthInfo:', error.message);
      throw new Error('DB: 로그인 정보를 가져오지 못했습니다.');
    }
  }
};

// logout
export const getAuthLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(`로그아웃 실패: ${error.message}`);
    }

    return { success: true, message: '로그아웃 되었습니다.' };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('DB: 로그아웃 실패');
  }
};
