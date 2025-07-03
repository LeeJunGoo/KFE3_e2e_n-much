import {
  AuctionHighestBidder,
  AuctionInfoType,
  AuctionWithSellerInfo,
  SellerAuctionCountType
} from 'src/types/auctions/detail';

// NOTE - 경매 상품 및 경매 업체 정보
export const fetchAuctionWithSellerInfo = async (auctionId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions/${auctionId}?type=auction`);

  if (!res.ok) {
    throw new Error(`경매 상품에 대한 정보를 불러오지 못했습니다.: ${res.status}`);
  }
  const result: AuctionWithSellerInfo = await res.json();

  return result.data;
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

  const result: AuctionHighestBidder = await res.json();

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
  const fetchUrl = `http://localhost:3001/api/auctions_with_episode_count?order=${order}&page=${pageParam}`;
  const data = await fetch(fetchUrl);
  const result = await data.json();

  if (result.status === 'success') {
    return result.data;
  } else {
    throw new Error('모든 경매와 해당 경매의 사연 갯수 fetch 실패');
  }
}

export async function fetchAuctionById(auctionId: string | undefined) {
  const fetchUrl = `http://localhost:3001/api/auctions?auction_id=${auctionId}`;
  const data = await fetch(fetchUrl);
  const result = await data.json();

  if (result.status === 'success') {
    return result.data;
  } else {
    throw new Error('auction_id로 경매 fetch 실패');
  }
}
