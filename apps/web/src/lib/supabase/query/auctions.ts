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
export const updateAuction = async (auction_id: string, editData: AuctionUpdate) => {
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

//FIXME - 내가 올린 경매 데이터 불러오기 (경매자)
export const getMyCreatedAuctions = async (seller_id: string) => {
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
    .eq('seller_id', seller_id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('DB: 내가 올린 경매 불러오기 에러');
  }

  return data;
};

//FIXME - 내가 입찰한 경매 데이터 불러오기 (입찰자)
export const getMyBidAuctions = async (buyer_id: string) => {
  const { data, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      auction:auction_id (
        *,
        seller:seller_id (
          seller_id,
          nickname,
          avatar
        )
      )
    `
    )
    .eq('buyer_id', buyer_id)
    .order('bid_time', { ascending: false });

  if (error) {
    console.error(error);
    throw new Error('DB: 내가 입찰한 경매 불러오기 에러');
  }

  return data;
};
