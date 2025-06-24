import { notFound } from 'next/navigation';
import type { MyCreatedAuctions, MyBidAuctions } from '../../types/mypage/index';
import { AuctionInfoType } from 'src/types/auctions/detail';

// 전체 경매 데이터 불러오기
export const fetchAllAuctions = async () => {
  const res = await fetch(`/api/auctions`);
  const json = await res.json();
  if (!res.ok || json.status !== 'success') throw new Error(json.error || res.statusText);
  return json.data;
};

//NOTE - 경매 상품 및 경매 업체 정보
export const fetchAuctionById = async (auctionId: string) => {
  const res = await fetch(`http://localhost:3001/api/auctions/${auctionId}?type=auction`);

  if (!res.ok) {
    if (res.status === 404) return notFound();
    throw new Error(`경매 상품에 대한 정보를 불러오지 못했습니다.: ${res.status}`);
  }
  const result: AuctionInfoType = await res.json();

  return result.data;
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
