//TODO - 준구님 컨벤션에 맞추기 (KMH)

import type {
  // AuctionHighestBidder,
  AuctionInfoForEpisodeType,
  AuctionInfoType,
  SellerAuctionCountType
} from 'src/entities/auction/types';

//ANCHOR - 에피소드 등록: 경매 상품 및 경매 업체 정보
export const getAuctionInfoForEpisode = async (auctionId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=episode_form`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }
  const data: AuctionInfoForEpisodeType = await res.json();
  return data;
};

//NOTE - 경매자의 총 경매 수 및 현재 진행중인 경매 수
export const fetchSellerAuctionCount = async (seller_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${seller_id}?type=seller`);

  if (!res.ok) {
    throw new Error(`경매 상품에 대한 정보를 불러오지 못했습니다.: ${res.status}`);
  }

  const result: SellerAuctionCountType = await res.json();

  return result.data;
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
  const data: AuctionInfoType = await res.json();

  return data.status;
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

//NOTE - 경매 등록/수정 페이지에서 경매 정보와 주소 정보 가져오기 (KMH)
//FIXME - 매개 변수 undefined 제거하기 (KMH)
export const getAuction = async (auctionId: string | undefined) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=auction_form`;
  const result = await fetch(fetchUrl);

  if (result.ok) {
    const data = await result.json();

    return data;
  } else {
    throw new Error('auction_id로 경매 fetch 실패');
  }
};

//TODO - address 도메인으로 이동 (KMH)
export const getAddressId = async (userId: string) => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses/?user_id=${userId}`;
  const result = await fetch(fetchUrl);

  if (result.ok) {
    const data = await result.json();

    return data;
  } else {
    throw new Error('auction_id로 경매 fetch 실패');
  }
};
