import { createClient } from 'src/shared/supabase/client/client';

const supabase = createClient();

export const selectAuctionsByUserId = async (userId: string) => {
  const { data: auctions, error } = await supabase
    .from('auctions')
    .select(
      `
      auction_id,
      title,
      image_urls,
      status,
      starting_point,
      current_point,
      end_date
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🚀 ~ selectAuctionsByUserId ~ error:', error);
    throw new Error('DB: 사용자 경매 목록 조회 에러');
  }

  return auctions ?? [];
};
