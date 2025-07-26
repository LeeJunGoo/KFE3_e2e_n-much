import { createClient } from 'src/shared/supabase/client/client';
import type { AddressInsert } from 'src/shared/supabase/types';

const supabase = createClient();

//ANCHOR - 작성된 주소 정보
export const selectAddressInfo = async (address_id: string) => {
  const { data, error } = await supabase.from('addresses').select('*').eq('address_id', address_id).maybeSingle();

  if (error) {
    console.error('🚀 ~ selectAddressInfo ~ error:', error);
    throw new Error();
  }

  return data;
};

//ANCHOR - 주소 등록
export const insertAddressInfo = async (address: AddressInsert) => {
  const { data, error } = await supabase.from('addresses').insert([address]).select(); // 삽입 후 반환받기

  if (error) {
    console.error('🚀 ~ insertAddressInfo ~ error:', error);
    throw new Error('주소 등록 중 오류 발생');
  }

  return data?.[0]; // 한 건만 삽입했으므로 첫 번째 요소 반환
};
