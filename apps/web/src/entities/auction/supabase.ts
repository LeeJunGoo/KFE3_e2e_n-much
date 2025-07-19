import { decode } from 'base64-arraybuffer';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '../../shared/supabase/client/client';
import type { AuctionInsert, AuctionRow, AuctionUpdate, UserRow } from '../../shared/supabase/types';

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
export const selectAuctionInfo = async (auction_id: string): Promise<AuctionRow> => {
  const { data, error } = await supabase.from('auctions').select(`*`).eq('auction_id', auction_id).maybeSingle();

  if (error) {
    console.error('🚀 ~ getAuction ~ getAuction:', error.message);
    throw new Error('DB: 특정 경매 불러오기 에러');
  }

  return data;
};

//NOTE - 특정 상품의 기본 주소 정보
export const selectAuctionDefaultAddress = async (userId: string): Promise<UserRow> => {
  const { data, error } = await supabase.from('users').select(`*`).eq('id', userId).maybeSingle();

  if (error) {
    console.error('🚀 ~ selectAuctionDefaultAddress:', error.message);
    throw new Error('DB: 특정 상품 주소 정보 불러오기 에러');
  }

  return data;
};

//NOTE - 에피소드 등록 페이지: 특정 상품 정보 및 판매자 정보
export const selectAuctionInfoForEpisode = async (auctionId: string) => {
  const { data, error } = await supabase
    .from('auctions')
    .select(
      `
      *,
    users:user_id (
        id,       
        nick_name,
        address_id
      )
    `
    )
    .eq('auction_id', auctionId)
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ getAuctionWithSellerInfo:', error.message);
    throw new Error('DB: 에피소드에 대한 특정 경매 정보 불러오기 에러');
  }

  return data;
};

//NOTE - 걍메 싱세 페이지: 특정 상품 정보 및 판매자 정보
export const selectAuctionWithSellerInfo = async (auctionId: string) => {
  const { data, error } = await supabase
    .from('auctions')
    .select(
      `
      *,
    users:user_id (
        id,       
        nick_name,
        address_id
      )
    `
    )
    .eq('auction_id', auctionId)
    .maybeSingle();

  if (error) {
    console.error('🚀 ~ getAuctionWithSellerInfo:', error);
    throw new Error();
  }

//   return data;
// };

//NOTE - 경매 물품 추가
export const addAuction = async (auctionData: AuctionInsert) => {
  const { data, error } = await supabase.from('auctions').insert([auctionData]).select().single();

  if (error) {
    console.error('addAuction', error);
    throw new Error('DB: 경매 추가 에러');
  }

  return data;
};

//NOTE -  경매 물품 수정
export const updateAuction = async (auctionId: string | undefined, editData: AuctionUpdate) => {
  if (!auctionId) {
    throw new Error('DB: 경매 수정 에러(auctionId가 없습니다.)');
  }
  const { data, error } = await supabase
    .from('auctions')
    .update({ ...editData })
    .eq('auction_id', auctionId)
    .select()
    .single();

  if (error) {
    console.error('updateAuction', error);
    throw new Error('DB: 경매 수정 에러');
  }
  return data;
};

//NOTE - 경매 물품 삭제
export const deleteAuction = async (auctionId: string) => {
  const { data, error } = await supabase.from('auctions').delete().eq('auction_id', auctionId).select().single();

  if (error) {
    console.error('deleteAuction', error);
    throw new Error('DB: 경매 삭제 에러');
  }
  return data;
};

//NOTE - 판매자의 총 경매 수 및 현재 진행 중인 갱며 수
export const selectSellerAuctionCount = async (sellerId: string) => {
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

export const getAllAuctionsCount = async () => {
  const { data, error } = await supabase.from('auctions').select('count').eq('status', 'OPEN').maybeSingle();

  if (error) {
    console.error(error);
    throw new Error('DB: 경매의 총 갯수 가져오기 에러');
  }

  if (!data) return 0;

  return data.count;
};

//ANCHOR - 경매 데이터 마감 임박, 인기순, 최신순(메인 페이지)
export const selectAuctionsByMainPageCategory = async (orderParam: string, isAscending: boolean, count: number) => {
  const { data, error } = await supabase
    .from('auctions')
    .select(`* ,episodes(count)`)
    .order(orderParam, { ascending: isAscending })
    .eq('status', 'OPEN')
    .limit(count);

  if (error) {
    console.error(error);
    throw new Error();
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
  const auctionsCount = await getAllAuctionsCount();

  if (!orderParam) {
    throw new Error('DB: 경매와 사연 갯수 불러오기 에러(순서 파라미터가 없습니다.)');
  }

  if (!pageParam && pageParam !== 0) {
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

  const nextId = pageParam < auctionsCount - itemsPerPage ? pageParam + itemsPerPage + 1 : null;

  return { data, nextId };
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

//TODO - 테스트 해보기 (KMH)
//FIXME - webp로 최적화하기 (KMH)
export const uploadImage = async (imageData: string) => {
  const base64 = imageData.split(',')[1];

  if (!base64) {
    throw new Error('업로드할 이미지를 잘못 선택하였습니다.');
  }

  const { data, error } = await supabase.storage
    .from('auction-images')
    .upload(`images/${uuidv4()}.png`, decode(base64), {
      contentType: 'image/png'
    });

  if (error) {
    console.error('uploadImage', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  return data;
};

export const selectAuction = async (auctionId: string) => {
  const { data, error } = await supabase
    .from('auctions')
    .select('user_id, title, description, end_date, starting_point, max_point, image_urls')
    .eq('auction_id', auctionId)
    .maybeSingle();

  if (error) {
    console.error('selectAuction', error);
    throw new Error('DB: auction 불러오기 실패');
  }
  return data;
};

//FIXME - address 도메인으로 옮기기 (KMH)
export const selectAddressId = async (userId: string) => {
  const { data, error } = await supabase
    .from('addresses')
    .select('address_id')
    .eq('user_id', userId)
    .eq('is_default', true)
    .maybeSingle();

  if (error) {
    console.error('selectAddressId', error);
    throw new Error('DB: addressId 불러오기 실패');
  }
  return data;
};
