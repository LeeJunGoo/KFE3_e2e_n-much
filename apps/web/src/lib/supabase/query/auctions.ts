import { createClient } from '../client/client';
import { AuctionInsert, AuctionUpdate } from '../type';

const supabase = createClient();

//NOTE - 전체 경매 상품 정보
export const getAllAuctions = async () => {
  const { data, error } = await supabase.from('auctions').select(`*`);

  if (error) {
    console.error('🚀 ~ getAllAuctions:', error.message);
    throw new Error('DB : 모든 경매 불러오기 에러');
  }

  return data;
};

//NOTE - 특정 상품 정보
export const getAuction = async (auction_id: string) => {
  const { data, error } = await supabase.from('auctions').select(`*`).eq('auction_id', auction_id).maybeSingle();

  if (error) {
    console.log('🚀 ~ getAuction ~ getAuction:', error.message);
    throw new Error('DB: 특정 경매 불러오기 에러');
  }

  return data;
};

//NOTE - 특정 상품 정보 및 판매자 정보
export const getAuctionWithSellerInfo = async (auction_id: string) => {
  const { data, error } = await supabase
    .from('auctions')
    .select(
      `
      *,
      seller:seller_id (
        seller_id,
        nickname,
        avatar
      )
    `
    )
    .eq('auction_id', auction_id)
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ getAuctionWithSellerInfo:', error.message);
    throw new Error('DB: 특정 경매 정보 불러오기 에러');
  }

  return data;
};

//NOTE - 경매 물품 추가
export const addAuction = async (auctionData: AuctionInsert) => {
  const { data, error } = await supabase.from('auctions').insert([auctionData]).select().single();

  if (error) {
    console.log('🚀 ~ addAuction ~ error:', error.message);
    throw new Error('DB: 경매 추가 에러');
  }

  return data;
};

//NOTE -  경매 물품 수정
export const updateAuction = async (auction_id: string | undefined, editData: AuctionUpdate) => {
  if (!auction_id) {
    throw new Error('DB: 경매 수정 에러(auctionId가 없습니다.)');
  }
  const { data, error } = await supabase
    .from('auctions')
    .update({ ...editData })
    .eq('auction_id', auction_id)
    .select();

  if (error) {
    console.log('🚀 ~ updateAuction ~ updateAuction:', error.message);
    throw new Error('DB: 경매 수정 에러');
  }
  return data;
};

//NOTE - 경매 물품 삭제
export const deleteAuction = async (auction_id: string) => {
  const { data, error } = await supabase.from('auctions').delete().eq('auction_id', auction_id).select();

  if (error) {
    console.log('🚀 ~ deleteAuction ~ deleteAuction:', error.message);
    throw new Error('DB: 경매 삭제 에러');
  }
  return data;
};

//NOTE - 판매자의 총 경매 수 및 현재 진행 중인 갱며 수
export const getSellerAuctionCount = async (sellerId: string) => {
  const { count: totalCount, error: totalError } = await supabase
    .from('auctions')
    .select('*', { count: 'exact', head: true })
    .eq('seller_id', sellerId);

  const { count: activeCount, error: activeError } = await supabase
    .from('auctions')
    .select('*', { count: 'exact', head: true })
    .eq('seller_id', sellerId)
    .eq('status', 'OPEN');

  if (totalError) {
    console.log('🚀 ~ getSellerAuctionCount ~ totalError:', totalError.message);
    throw new Error('DB: 경매자의 총 경매 수를 불러오는 과정에서 Error 발생');
  }
  if (activeError) {
    console.log('🚀 ~ getSellerAuctionCount ~ activeError:', activeError.message);
    throw new Error('DB: 경매자의 현재 진행중인 경매 수를 불러오는 과정에서 Error 발생');
  }

  return {
    totalAuctions: totalCount || 0,
    activeAuctions: activeCount || 0
  };
};

// 모든 경매와 경매의 사연 갯수를 불러오기
export const getAllAuctionsWithEpisodeCount = async () => {
  const { data, error } = await supabase
    .from('auctions')
    .select(
      `
    *,episodes(count)
  `
    )
    .eq('status', 'OPEN');

  if (error) {
    console.error(error);
    throw new Error('DB: 경매와 사연 갯수 불러오기 에러');
  }

  return data;
};

// 모든 경매와 경매의 사연 갯수를 불러오기
export const getAllAuctionsWithEpisodeCountByOrder = async (
  orderParam: string | null,
  isAscending: boolean,
  pageParam: number | null
) => {
  const itemsPerPage = 5;
  if (!orderParam) {
    throw new Error('DB: 경매와 사연 갯수 불러오기 에러(순서 파라미터가 없습니다.)');
  }

  if (!pageParam) {
    throw new Error('DB: 경매와 사연 갯수 불러오기 에러(페이지 파라미터가 없습니다.)');
  }

  const { data, error } = await supabase
    .from('auctions')
    .select(
      `
    *,episodes(count)
  `
    )
    .order(orderParam, { ascending: isAscending })
    .eq('status', 'OPEN')
    .range(pageParam, pageParam + itemsPerPage);

  if (error) {
    console.error(error);
    throw new Error('DB: 경매와 사연 갯수 불러오기 에러');
  }
  return data;
};

// 키워드가 타이틀에 포함되는 경매리스트를 불러오기
export const getAuctionsByKeyword = async (keyword: string) => {
  const { data, error } = await supabase.from('auctions').select('*').ilike('title', `%${keyword}%`);

  if (error) {
    throw new Error('DB: 경매 검색 에러');
  }
  return data;
};

// NOTE - 셀러가 등록한 경매 목록 조회
export async function getSellerAuctions(seller_id: string) {
  const { data, error } = await supabase
    .from('auctions')
    .select('*')
    .eq('seller_id', seller_id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('DB: 셀러 경매 목록 조회 에러');
  }

  return data;
}
