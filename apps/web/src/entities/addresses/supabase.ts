import { createClient } from 'src/shared/supabase/client/client';
import { v4 as uuidv4 } from 'uuid';
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

//TODO - webp로 최적화하기- KSH
// Storage Bucket(company-image)에 이미지 업로드  - KSH
export const uploadImageToBucket = async (imageFile: File, ext: string) => {
  if (!imageFile) {
    throw new Error('BUCKET(company-image): 이미지 업로드 에러(imageFile이 없습니다.)');
  }

  const { data, error } = await supabase.storage.from('company-image').upload(`images/${uuidv4()}.${ext}`, imageFile, {
    contentType: imageFile.type
  });

  if (error) {
    console.error('uploadImage', error);
    throw new Error('BUCKET(company-image): 이미지 업로드 에러');
  }

  return data;
};
