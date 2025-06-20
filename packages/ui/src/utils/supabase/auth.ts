import { createClient } from './client/client';

const supabase = createClient();

export const getAuthInfo = async () => {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.log('getAuthInfo:' + error);
      throw new Error('로그인 정보를 불러오지 못했습니다.' + error.message);
    }
  }
};
