import { ITEM_PER_PAGE } from 'src/entities/auction/constants';
import { selectAuctionsCount } from 'src/entities/auction/supabase';
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

// 관심 경매와 경매의 사연 갯수를 불러오기 (selectAuctionCardList 참고) - KSH
export const selectFavoriteAuctionCardList = async (
  order: string | undefined,
  page: number | undefined,
  user: string | undefined
) => {
  const auctionsCount = await selectAuctionsCount('');

  if (!order) {
    throw new Error('DB: 관심 경매와 사연 갯수 불러오기 에러(order가 없습니다.)');
  }

  if (!page && page !== 0) {
    throw new Error('DB: 관심 경매와 사연 갯수 불러오기 에러(page가 없습니다.)');
  }

  if (!user) {
    throw new Error('DB: 관심 경매와 사연 갯수 불러오기 에러(user가 없습니다.)');
  }

  const ascending = order === 'favorites' ? false : true;

  const { data, error } = await supabase
    .from('auctions')
    .select(
      `
    *,episodes(count)
  `
    )
    .contains('favorites', [user])
    .eq('status', 'OPEN')
    .order(order, { ascending })
    .range(page, page + ITEM_PER_PAGE - 1);

  if (error) {
    console.error(error);
    throw new Error('DB: 경매와 사연 갯수 불러오기 에러');
  }

  const nextId = page < auctionsCount - ITEM_PER_PAGE ? page + ITEM_PER_PAGE + 1 : null;

  return { data, nextId };
};

// 관심 경매 추가 - KSH
export const updateFavoriteAuction = async ({
  auctionId,
  updatedFavorites
}: {
  auctionId: string;
  updatedFavorites: string[];
}) => {
  if (!auctionId && !updatedFavorites) {
    throw new Error('DB: 관심 경매 추가 에러(auctionId와 updatedFavorites가 없습니다.)');
  }

  const { data, error } = await supabase
    .from('auctions')
    .update({ favorites: updatedFavorites })
    .eq('auction_id', auctionId)
    .select('favorites')
    .single();

  if (error) {
    console.error('updateAuction', error);
    throw new Error('DB: 관심 경매 추가 에러');
  }
  return data;
};
