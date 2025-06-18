import { notFound } from 'next/navigation';
import type { MyCreatedAuctions, MyBidAuctions } from '@repo/ui/types/mypage/index';

// 전체 경매 데이터 불러오기
export const fetchAllAuctions = async () => {
  try {
    const response = await fetch(`/api/auctions`);

    if (!response.ok) {
      throw new Error(`경매 리스트 데이터 불러오기 실패: ${response.statusText}`);
    }

    if (response.status === 404) {
      notFound();
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 특정 경매 데이터 불러오기
export const fetchAuctionById = async (auctionId: string) => {
  try {
    const response = await fetch(`/api/auctions?auction_id=${auctionId}`);

    if (!response.ok) {
      throw new Error(`경매 상세 데이터 불러오기 실패: ${response.statusText}`);
    }

    if (response.status === 404) {
      notFound();
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 내가 올린 경매 데이터 불러오기 (경매자)
export const fetchMyCreatedAuctions = async (creator_id: string): Promise<MyCreatedAuctions> => {
  try {
    const response = await fetch(`/api/auctions?creator_id=${creator_id}`);

    if (!response.ok) {
      throw new Error(`내가 올린 경매 데이터 불러오기 실패: ${response.statusText}`);
    }

    if (response.status === 404) {
      notFound();
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('내가 올린 경매 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

// 내가 입찰한 경매 데이터 불러오기 (입찰자)
export const fetchMyBidAuctions = async (bidder_id: string): Promise<MyBidAuctions> => {
  try {
    const response = await fetch(`/api/auctions?bidder_id=${bidder_id}`);

    if (!response.ok) {
      throw new Error(`내가 입찰한 경매 데이터 불러오기 실패: ${response.statusText}`);
    }

    if (response.status === 404) {
      notFound();
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('내가 입찰한 경매 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};
