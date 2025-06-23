import type { MyCreatedAuctions, MyBidAuctions } from '../../types/mypage/index';

// 전체 경매 데이터 불러오기
export const fetchAllAuctions = async () => {
  const res = await fetch(`/api/auctions`);
  const json = await res.json();
  if (!res.ok || json.status !== 'success') throw new Error(json.error || res.statusText);
  return json.data;
};

// 특정 경매 데이터 불러오기
export const fetchAuctionById = async (auctionId: string) => {
  const res = await fetch(`/api/auctions?auction_id=${auctionId}`);
  const json = await res.json();
  if (!res.ok || json.status !== 'success') throw new Error(json.error || res.statusText);
  return json.data;
};

// 내가 올린 경매 데이터 불러오기 (경매자)
export const fetchMyCreatedAuctions = async (seller_id: string): Promise<MyCreatedAuctions> => {
  const res = await fetch(`/api/auctions?seller_id=${seller_id}`);
  const json = await res.json();
  if (!res.ok || json.status !== 'success') throw new Error(json.error || res.statusText);
  return json.data;
};

// 내가 입찰한 경매 데이터 불러오기 (입찰자)
export const fetchMyBidAuctions = async (buyer_id: string): Promise<MyBidAuctions> => {
  const res = await fetch(`/api/auctions?buyer_id=${buyer_id}`);
  const json = await res.json();
  if (!res.ok || json.status !== 'success') throw new Error(json.error || res.statusText);
  return json.data;
};
