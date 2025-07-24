'use server';

import { createServer } from 'src/shared/supabase/client/server';

//ANCHOR - user 정보가 필요할 경우 사용
export const getServerUser = async () => {
  const supabase = await createServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
};

export const selectUserIdByAuctionId = async (auctionId: string | null): Promise<string> => {
  if (!auctionId) {
    throw new Error('DB: 유저 아이디 불러오기 에러(auctionId가 없습니다.)');
  }

  const supabase = await createServer();
  const { data, error } = await supabase.from('auctions').select('user_id').eq('auction_id', auctionId).single();
  if (error) {
    console.error('selectUserIdByAuctionId', error, data);
    throw new Error('DB: 유저 아이디 불러오기 에러');
  }

  return data.user_id;
};
