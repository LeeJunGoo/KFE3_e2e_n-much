import { createClient } from 'src/shared/supabase/client/client';
import type { InquiryCreateType } from 'src/entities/inquiry/types';

const supabase = createClient();

//ANCHOR - 특정 문의 정보
export const selectInquiryInfo = async (inquiry_id: string) => {
  const { data, error } = await supabase.from('inquiries').select(`*`).eq('inquiry_id', inquiry_id).maybeSingle();

  if (error) {
    console.error('🚀 ~ selectInquiryInfo ~ error:', error);
    throw new Error();
  }

  return data;
};

//ANCHOR - 문의 등록
export const insertInquiry = async ({ auctionId, userId, title, description }: InquiryCreateType) => {
  const { error } = await supabase.from('inquiries').insert([
    {
      auction_id: auctionId,
      user_id: userId,
      title,
      description
    }
  ]);

  if (error) {
    console.error('🚀 ~ insertInquiry ~ error:', error);
    throw new Error();
  }
};
