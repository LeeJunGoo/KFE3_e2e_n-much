import { Role } from 'src/types/auth';
import { createClient } from '../client/client';
import { BuyerInsert, SellerInsert } from '../type';
import { UserRoleDataProps } from 'src/types/mypage';

const supabase = createClient();

export async function upsertBuyer(userData: BuyerInsert) {
  const { data: user, error } = await supabase
    .from('buyers')
    .upsert([userData])
    .select('buyer_id, email, nickname')
    .single();

  if (error) {
    throw new Error('DB: 유저 추가/수정 에러');
  }
  return user;
}

export async function upsertSeller(userData: SellerInsert) {
  const { data: user, error } = await supabase
    .from('sellers')
    .upsert([userData])
    .select('seller_id, email, nickname')
    .single();

  if (error) {
    throw new Error('DB: 유저 추가/수정 에러');
  }
  return user;
}

// 로그인
export const storeUserInfo = async (role: Role) => {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('사용자 정보 가져오기 실패');
    }
    const userId = user.id;
    // BUYER 테이블 존재 여부 검사
    const { data: buyerExists } = await supabase.from('buyers').select('buyer_id').eq('buyer_id', userId).maybeSingle();
    // SELLER 테이블 존재 여부 검사
    const { data: sellerExists } = await supabase
      .from('sellers')
      .select('seller_id')
      .eq('seller_id', userId)
      .maybeSingle();
    // 이미 존재하는 경우 → 저장 X
    if (buyerExists || sellerExists) {
      console.log('이미 존재하는 사용자입니다. 저장을 건너뜁니다.');
      return;
    }
    let userData: BuyerInsert | SellerInsert | undefined;
    const commonFields = {
      avatar: user.user_metadata?.avatar_url ?? null,
      email: user.email ?? '',
      favorites: [],
      nickname: null,
      created_at: user.created_at ?? new Date().toISOString(),
      password: '',
      point: 0,
      social_name: user.user_metadata?.name ?? '',
      updated_at: user.updated_at ?? new Date().toISOString()
    };
    if (role === 'BUYER') {
      userData = await upsertBuyer({
        ...commonFields,
        buyer_id: userId
      });
    } else if (role === 'SELLER') {
      userData = await upsertSeller({
        ...commonFields,
        seller_id: userId
      });
    }
    return userData;
  } catch (error) {
    console.error('사용자 정보 저장 실패:', error);
    throw error;
  }
};

// 마이페이지 역할 확인용 - 추후 수정 필요
export const getUserRole = async () => {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인된 사용자가 없습니다');
    }

    const userId = user.id;

    // 바이어인지 확인
    const { data: buyerExists } = await supabase.from('buyers').select('buyer_id').eq('buyer_id', userId).maybeSingle();

    if (buyerExists) {
      return 'BUYER';
    }

    // 셀러인지 확인
    const { data: sellerExists } = await supabase
      .from('sellers')
      .select('seller_id')
      .eq('seller_id', userId)
      .maybeSingle();

    if (sellerExists) {
      return 'SELLER';
    }

    // 둘 다 없으면 임시로 BUYER 반환 (개발용)
    console.log('역할 정보가 없어서 임시로 BUYER로 설정');
    return 'BUYER';
  } catch (error) {
    console.error('사용자 역할 확인 실패:', error);
    // 에러 시에도 임시로 BUYER 반환 (개발용)
    return 'BUYER';
  }
};

// 유저 정보 불러오기
export const getUserInfo = async () => {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인된 사용자가 없습니다');
    }

    const userId = user.id;

    // 바이어 정보 확인
    const { data: buyerData } = await supabase.from('buyers').select('*').eq('buyer_id', userId).maybeSingle();

    if (buyerData) {
      return { role: 'BUYER', userInfo: buyerData };
    }

    // 셀러 정보 확인
    const { data: sellerData } = await supabase.from('sellers').select('*').eq('seller_id', userId).maybeSingle();

    if (sellerData) {
      return { role: 'SELLER', userInfo: sellerData };
    }

    // 둘 다 없으면 임시 데이터 반환 (개발용)
    return {
      role: 'BUYER' as const,
      userInfo: {
        buyer_id: userId,
        email: user.email || '',
        social_name: user.user_metadata?.name || '',
        nickname: null,
        avatar: user.user_metadata?.avatar_url || null,
        point: 0,
        updated_at: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};

export const getBuyerById = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('buyers')
      .select('buyer_id, email, nickname')
      .eq('buyer_id', userId)
      .maybeSingle();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('DB: BUYER 정보를 가져오지 못했습니다.');
    }
  }
};

export const getSellerById = async (userId: string) => {
  try {
    const { data } = await supabase
      .from('sellers')
      .select('seller_id,email, nickname')
      .eq('seller_id', userId)
      .maybeSingle();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('DB: SELLER 정보를 가져오지 못했습니다.');
    }
  }
};

// 삭제 예정
export const getUserInfoClient = async (): Promise<UserRoleDataProps> => {
  const supabase = createClient();

  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인된 사용자가 없습니다');
    }

    const userId = user.id;

    // 바이어 정보 확인
    const { data: buyerData } = await supabase.from('buyers').select('*').eq('buyer_id', userId).maybeSingle();

    if (buyerData) {
      return {
        role: 'BUYER' as const,
        userInfo: buyerData
      };
    }

    // 셀러 정보 확인
    const { data: sellerData } = await supabase.from('sellers').select('*').eq('seller_id', userId).maybeSingle();

    if (sellerData) {
      return {
        role: 'SELLER' as const,
        userInfo: sellerData
      };
    }

    // 기본 데이터 반환
    return {
      role: 'BUYER' as const,
      userInfo: {
        buyer_id: userId,
        email: user.email || '',
        nickname: null,
        password: '',
        avatar: user.user_metadata?.avatar_url || null,
        social_name: user.user_metadata?.name || '',
        point: 0,
        favorites: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw error;
  }
};
