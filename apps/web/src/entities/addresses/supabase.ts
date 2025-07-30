import { createClient } from 'src/shared/supabase/client/client';
import type { AddressInsert } from 'src/shared/supabase/types';

const supabase = createClient();

// 기본 주소 가져오기 1건
export const selectDefaultAddress = async (userId: string) => {
  const { data, error } = await supabase.from('addresses').select('*').eq('user_id', userId);

  if (error) {
    console.error('🚀 ~ selectDefaultAddress ~ error:', error);
    throw new Error('기본 주소를 불러오는 데 실패했습니다.');
  }
  return data;
};

// 주소 등록
export const insertAddressInfo = async (address: AddressInsert) => {
  const { data, error } = await supabase.from('addresses').insert([address]).select();

  if (error) {
    console.error('🚀 ~ insertAddressInfo ~ error:', error);
    throw new Error('주소 등록 중 오류 발생');
  }

  return data?.[0];
};
