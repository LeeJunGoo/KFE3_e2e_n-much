//TODO - 준구님 컨벤션에 맞추기 (KMH)

import type {
  AuctionInfoWithAddressType,
  AuctionSummaryInfoWithAddressType,
  SellerAuctionCountType
} from 'src/entities/auction/types';
import type { AuctionInsert, AuctionRow, AuctionUpdate } from 'src/shared/supabase/types';

//ANCHOR - 경매 상세 페이지: 경매 상풍 및 업체 정보
export const getAuctionInfoWithAddress = async (auctionId: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=auction`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: AuctionInfoWithAddressType = await res.json();
  return data;
};

//ANCHOR - 에피소드 등록 페이지: 경매 상품 및 업체 정보
export const getAuctionSummaryInfoWithAddress = async (auctionId: AuctionRow['auction_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=episode_form`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const data: AuctionSummaryInfoWithAddressType = await res.json();
  return data;
};

//ANCHOR - 경매자의 총 경매 수 및 현재 진행중인 경매 수
export const getSellerAuctionCount = async (seller_id: AuctionRow['user_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/seller?id=${seller_id}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: SellerAuctionCountType = await res.json();

  return data;
};

// NOTE - 최고 입찰자의 정보
export const fetchHighestBidder = async (auction_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auction_id}?type=buyer`);

  if (!res.ok) {
    throw new Error(`입찰자에 대한 정보를 불러오지 못했습니다.: ${res.status}`);
  }

  // const result: AuctionHighestBidder = await res.json();
  const result = await res.json(); //FIXME - 타입 에러가 발생해서 기존 내용 주석처리해서 임시 조치함 (KMH)

  return result.data;
};

//NOTE - 경매 데이터 삭제
export const fetchDeleteAuction = async (auction_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      auction_id
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (res.status === 400) {
      console.error(errorData.message);
      return;
    }
    throw new Error('경매 데이터를 삭제하는 과정에서 네트워크 에러가 발생했습니다.');
  }
  // const data: AuctionInfoType = await res.json();
  // return data.status;
};

//NOTE - 셀러가 등록한 경매 목록 조회
export const fetchSellerAuctions = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions?type=sellerAuctions`);
  if (!res.ok) {
    throw new Error('셀러 경매 목록을 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};

// 모든 경매와 해당 경매의 사연 갯수 가져오기
export async function fetchAllAuctionWithEpisodeCount({ order, pageParam }: { order: string; pageParam: number }) {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions_with_episode_count?order=${order}&page=${pageParam}`;
  const data = await fetch(fetchUrl);
  const result = await data.json();

  if (result.status === 'success') {
    return result.data;
  } else {
    throw new Error('모든 경매와 해당 경매의 사연 갯수 fetch 실패');
  }
}

export const getAuction = async (auctionId: string | undefined) => {
  if (!auctionId) {
    throw new Error('selectAuction: auctionId가 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=auction_form`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();

  if (!data) {
    throw new Error('getAuction: 가져올 경매가 없습니다.');
  }

  return data;
};

export const getAddressId = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error('getAddressId: userId가 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses/?user_id=${userId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();

  if (!data) {
    throw new Error('getAddressId: 가져올 addressId가 없습니다.');
  }

  return data;
};

export const postAuction = async (auction: AuctionInsert | undefined): Promise<AuctionRow> => {
  if (!auction) {
    throw new Error('postAuction: auction이 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(auction)
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};

export const patchAuction = async (
  auctionId: string | undefined,
  auction: AuctionUpdate | undefined
): Promise<AuctionRow> => {
  if (!auctionId && !auction) {
    throw new Error('patchAuction: auctionId와 auction이 없습니다.');
  }

  if (!auctionId) {
    throw new Error('patchAuction: auctionId이 없습니다.');
  }

  if (!auction) {
    throw new Error('patchAuction: auction이 없습니다.');
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(auction)
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data = await res.json();
  return data;
};
